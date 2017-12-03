import {IListResource} from "../model/IListResource";
import {IPokemonReference} from "../model/IPokemonReference";
import {AppConfig} from "./appConfig";

/** Client for fething data from pokeapi. */
export class PokeApiClient {

	/** Fetch list of all pokemon references. */
	fetchPokemonIndex(offset : number, limit : number) : Promise<Array<IPokemonReference>> {
		return fetch(`${AppConfig.pokeapi.baseUrl}${AppConfig.pokeapi.endpoints.pokemon}?offset=${offset}&limit=${limit}`)
			.then((response) => {
				return response.json()
			})
			.then((response : IListResource) => {
				return response.results
			});
	}

	/** Fetch instance of specific pokemon. */
	fetchPokemon(reference : IPokemonReference) {
		return fetch(reference.url)
			.then((response) => {
				return response.json()
			});
	}
}
