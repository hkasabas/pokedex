import {IPokemonMove} from "./IPokemonMove";
import {IPokemonStat} from "./IPokemonStat";
import {IPokemonType} from "./IPokemonType";
import {IPokemonAbility} from "./IPokemonAbility";

export interface IPokemon {
	id : string;
	name : string;
	weight : number;
	height : number;
	base_experience : number;

	stats : Array<IPokemonStat>;
	moves : Array<IPokemonMove>;
	types : Array<IPokemonType>;
	abilities : Array<IPokemonAbility>;
}
