import * as PropTypes from 'prop-types';
import * as React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {IPokemonReference} from "../../model/IPokemonReference";
import {PokemonStore} from "../../service/store/pokemonStore";
import {IFilterState} from "../../service/store/storeModel";
import {AppLayoutPage} from "../common/AppLayoutPage";
import {AppLayoutPageContent} from "../common/AppLayoutPageContent";
import {AppLayoutPageHeader} from "../common/AppLayoutPageHeader";
import {FilterChangeEvent, ListFilter} from "./view/ListFilter";
import {PokemonList, PokemonSelectEvent} from "./view/PokemonList";


const MY_LIST_FILTER_ID = "INDEX_FILTER_ID";

interface IProps {
	pokemonList : Array<IPokemonReference>;
	filterState : IFilterState | null;

	actions: { [key : string] : Function};
}

class MyPokemonListContainer extends React.Component<IProps, any> {
	static contextTypes = {
		router: PropTypes.object
	};

	render() {
		return (
			<AppLayoutPage>
				<AppLayoutPageHeader>
					My Pokemons
				</AppLayoutPageHeader>

				<AppLayoutPageContent>
					<ListFilter filterState={this.props.filterState} onFilterChange={this.onFilterChange.bind(this)}/>

					<PokemonList pokemonList={this.props.pokemonList} onSelected={this.onItemSelect.bind(this)}/>
				</AppLayoutPageContent>
			</AppLayoutPage>
		);
	}

	onItemSelect(event : PokemonSelectEvent) {
		console.log("Selected pokemon ", event.reference.name);

		this.context.router.push("/pokemons/" + event.reference.name);
	}

	onFilterChange(event : FilterChangeEvent) {
		let customFilter = event.customFilter;
		console.log(`Apply pokemon list filter: ${customFilter}`);

		this.props.actions.applyFilterState(MY_LIST_FILTER_ID, { customFilter })
	}

}

function mapStateToProps(store : any) {
	return {
		pokemonList: PokemonStore.selectors.selectFilteredMyPokemonList(MY_LIST_FILTER_ID)(store),
		filterState : PokemonStore.selectors.selectListFilter(store, MY_LIST_FILTER_ID)
	};
}

function mapDispatchToProps(dispatch : any) {
	return {
		actions: bindActionCreators(PokemonStore.actions, dispatch),
	};
}

// TODO: why cannt we send component directly do "connect" function?!
let MyPokemonListContainerCmp : any = MyPokemonListContainer;

export default connect(mapStateToProps, mapDispatchToProps)(MyPokemonListContainerCmp);

