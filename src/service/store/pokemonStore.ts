import {createSelector} from "reselect";

import {IPokemon} from "../../model/IPokemon";
import {IPokemonReference} from "../../model/IPokemonReference";
import {PokemonService} from "../PokemonService";
import {DispatchFn, GetStateFn, IFilterState, IFilterStateActionPayload, IStoreAction} from "./storeModel";

const Actions = {
	Pokemon_LoadPokemonIndex : "Pokemon_LoadPokemonIndex",
	Pokemon_LoadCurrentPokemon : "Pokemon_LoadCurrentPokemon",

	Pokemon_MyPokemonListAdd : "Pokemon_MyPokemonListAdd",
	Pokemon_MyPokemonListRemove : "Pokemon_MyPokemonListRemove",

	Pokemon_ListFilter : "Pokemon_ListFilter",
};


// -------------------- Reducers

function currentPokemon(state : IPokemon | null = null, action : IStoreAction<IPokemon>) {
	if (action.type === Actions.Pokemon_LoadCurrentPokemon) {
		return action.payload;
	}

	return state
}

function pokemonIndex(state : IPokemon | null = null, action : IStoreAction<Array<IPokemonReference>>) {
	if (action.type === Actions.Pokemon_LoadPokemonIndex) {
		return action.payload;
	}

	return state
}

function myPokemonList(state : Array<IPokemonReference> = [], action : IStoreAction<IPokemonReference>) {
	if (action.type === Actions.Pokemon_MyPokemonListAdd) {
		return [
			...state,
			action.payload
		];
	}
	else if (action.type === Actions.Pokemon_MyPokemonListRemove) {
		return state.filter((item) => item.name !== action.payload.name)
	}

	return state
}

function listFilters(state = {}, action : IStoreAction<IFilterStateActionPayload>) {
	if (action.type === Actions.Pokemon_ListFilter) {
		return {
			...state,
			[action.payload.id] : action.payload.filterState
		};
	}

	return state
}


// -------------------- Effects

function fetchPokemonIndexEffect(dispatch : DispatchFn, getState : GetStateFn) : Promise<Array<IPokemonReference>> {
	console.log(`Loading pokemon index`);
	return new PokemonService().fetchPokemonIndex()
		.then((pokemonIndex) => {
			console.log(`Loading pokemon index with ${pokemonIndex.length} pokemons`);
			dispatch(loadPokemonIndex(pokemonIndex));

			return pokemonIndex;
		});
}

function fetchPokemonEffect(dispatch : DispatchFn, getState : GetStateFn, reference : IPokemonReference) : Promise<IPokemon> {
	console.log(`Loading pokemon ${reference.name}`);
	return new PokemonService().fetchPokemon(reference)
		.then((pokemon) => {
			console.log(`Loaded pokemon ${reference.name}`);
			dispatch(loadPokemon(pokemon));

			return pokemon;
		});
}


// -------------------- Actions

function fetchPokemonIndex() {
	return (dispatch : DispatchFn, getState : GetStateFn) => {
		return fetchPokemonIndexEffect(dispatch, getState);
	};
}

function loadPokemonIndex(index : Array<IPokemonReference>) : IStoreAction<Array<IPokemonReference>> {
	return {
		type : Actions.Pokemon_LoadPokemonIndex,
		payload : index
	}
}



function fetchPokemon(reference : IPokemonReference) {
	return (dispatch : DispatchFn, getState : GetStateFn) => {
		return fetchPokemonEffect(dispatch, getState, reference);
	};
}

function loadPokemon(pokemon : IPokemon) : IStoreAction<IPokemon> {
	return {
		type : Actions.Pokemon_LoadCurrentPokemon,
		payload : pokemon
	}
}

function applyFilterState(id : string, filterState : IFilterState) : IStoreAction<IFilterStateActionPayload> {
	return {
		type : Actions.Pokemon_ListFilter,
		payload : {
			id, filterState
		}
	}
}


function addToMyPokemonList(reference : IPokemonReference) : IStoreAction<IPokemonReference> {
	return {
		type : Actions.Pokemon_MyPokemonListAdd,
		payload : reference
	}
}
function removeFromMyPokemonList(reference : IPokemonReference) : IStoreAction<IPokemonReference> {
	return {
		type : Actions.Pokemon_MyPokemonListRemove,
		payload : reference
	}
}



// -------------------- Selectors


function selectPokemonIndex(store : any) : Array<IPokemonReference> | null {
	return (store.pokemonIndex || [])
		.sort((i1 : IPokemonReference, i2 : IPokemonReference) => i1.name.localeCompare(i2.name));
}

function selectPokemonReference(store : any, name : string) : IPokemonReference | null {
	return (selectPokemonIndex(store) || [])
		.filter((item : IPokemonReference) => item.name === name)
		.shift() || null;
}

function selectMyPokemonList(store : any) : Array<IPokemonReference> {
	return (store.myPokemonList || [])
		.sort((i1 : IPokemonReference, i2 : IPokemonReference) => i1.name.localeCompare(i2.name));
}

function selectCurrentPokemon(store : any) : IPokemon | null {
	return store.currentPokemon;
}

function selectIsInMyList(store : any, name : string) : boolean {
	return selectMyPokemonList(store)
		.filter(ref => ref.name === name)
		.length > 0
}

function selectListFilters(store : any) : {[id : string] : IFilterState} {
	return store.listFilters;
}

function selectListFilter(store : any, id : string) : IFilterState | null {
	return store.listFilters[id] || null;
}

const selectFilteredPokemonIndex = (filterId : string) => createSelector(
	selectPokemonIndex, selectListFilters,
	(selectPokemonIndex : Array<IPokemonReference>, listFilters : {[id : string] : IFilterState}) : Array<IPokemonReference> => {
		let listFilter = listFilters[filterId] || null;
		return (selectPokemonIndex || [])
			.filter(item => {
				return listFilter == null || item.name.toLowerCase().match("^" + listFilter.customFilter.toLowerCase() + ".+");
			});
});

const selectFilteredMyPokemonList = (filterId : string) => createSelector(
	selectMyPokemonList, selectListFilters,
	(selectMyPokemonList : Array<IPokemonReference>, listFilters : {[id : string] : IFilterState}) : Array<IPokemonReference> => {
		let listFilter = listFilters[filterId] || null;
		return (selectMyPokemonList || [])
			.filter(item => {
				return listFilter == null || item.name.toLowerCase().match("^" + listFilter.customFilter.toLowerCase() + ".+");
			});
	});



// -------------------- Export

export const PokemonStore = {

	reducers : {
		currentPokemon, pokemonIndex, myPokemonList, listFilters
	},

	actions : {
		fetchPokemonIndex, loadPokemonIndex,
		fetchPokemon, loadPokemon,
		addToMyPokemonList, removeFromMyPokemonList,
		applyFilterState
	},

	selectors : {
		selectPokemonIndex, selectPokemonReference, selectMyPokemonList, selectCurrentPokemon, selectIsInMyList,
		selectListFilter, selectFilteredPokemonIndex, selectFilteredMyPokemonList
	}
};
