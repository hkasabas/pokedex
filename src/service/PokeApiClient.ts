import {IListResource} from "../model/IListResource";
import {IPokemonReference} from "../model/IPokemonReference";
import {AppConfig} from "./appConfig";

export class PokeApiClient {

	fetchPokemonIndex(offset : number, limit : number) : Promise<Array<IPokemonReference>> {
		return fetch(`${AppConfig.pokeapi.baseUrl}${AppConfig.pokeapi.endpoints.pokemon}?offset=${offset}&limit=${limit}`)
			.then((response) => {
				return response.json()
			})
			.then((response : IListResource) => {
				return response.results
			});
	}

	fetchPokemon(reference : IPokemonReference) {
		return fetch(reference.url)
			.then((response) => {
				return response.json()
			});
	}
}