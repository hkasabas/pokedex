import {PokemonService} from "../service/PokemonService";
import {PokemonStore} from "../service/store/pokemonStore";
import {appStore} from "../service/store/appStore";


export function appInit(nextState : any, replace : any, callback : (error? : any) => any) {
	return Promise.resolve(true)

		// ----- initialize menu data
		.then(() => {
			console.info("Initializing pokemon index ...");
			return new PokemonService().fetchPokemonIndex()
				.then((response) => {
					appStore.dispatch(PokemonStore.actions.loadPokemonIndex(response));
				});
		})

		// success
		.then(() => {
			callback();
		})

		// handle errors
		.catch((error) => {
			callback(error);
		});
}
