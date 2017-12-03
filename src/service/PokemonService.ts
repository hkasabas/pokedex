import {PokeApiClient} from "./PokeApiClient";
import {IPokemonReference} from "../model/IPokemonReference";
import {AppConfig} from "./appConfig";
import {IPokemon} from "../model/IPokemon";
import {CachingService} from "./CachingService";


export class PokemonService {
	private static CACHE_KEY_POKEMON_INDEX = "POKEMON_INDEX";
	private static CACHE_KEY_POKEMON = "POKEMON";

	private pokeApiClient : PokeApiClient;

	constructor() {
		this.pokeApiClient = new PokeApiClient();
	}

	fetchPokemonIndex() : Promise<Array<IPokemonReference>> {
		let cachedIndex = CachingService.readKey<Array<IPokemonReference>>(PokemonService.CACHE_KEY_POKEMON_INDEX);
		
		let pokemonIndexPromise;
		// value is already cached
		if (cachedIndex != null) {
			console.log("Resolving pokemon index from cache");
			pokemonIndexPromise = Promise.resolve(cachedIndex);
		}
		// must fetch form API
		else {
			pokemonIndexPromise = this.pokeApiClient.fetchPokemonIndex(0, AppConfig.pokeapi.indexLimit)
				.then((pokemonIndex) => {
					// cache new value
					CachingService.setKey(PokemonService.CACHE_KEY_POKEMON_INDEX, pokemonIndex);

					return pokemonIndex;
				});
		}
		
		return pokemonIndexPromise;
	}

	fetchPokemon(reference : IPokemonReference) : Promise<IPokemon> {
		let pokemonCacheMap = CachingService.readKey<{[name : string] : IPokemon}>(PokemonService.CACHE_KEY_POKEMON) || {};
		let cachedPokemon = pokemonCacheMap != null && pokemonCacheMap[reference.name];

		let pokemonPromise;
		// value is already cached
		if (cachedPokemon != null) {
			console.log(`Resolving pokemon ${reference.name} from cache`);
			pokemonPromise = Promise.resolve(cachedPokemon);
		}
		// must fetch form API
		else {
			pokemonPromise = this.pokeApiClient.fetchPokemon(reference)
				.then((pokemon) => {
					// add fetched pokemon to cache
					pokemonCacheMap = {
						...pokemonCacheMap,
						[pokemon.name] : pokemon
					};
					CachingService.setKey(PokemonService.CACHE_KEY_POKEMON, pokemonCacheMap);

					return pokemon;
				});
		}
		
		return pokemonPromise;
	}

}
