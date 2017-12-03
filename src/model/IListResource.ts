
import {IPokemonReference} from "./IPokemonReference";

export interface IListResource {
	count : number;
	next : string;
	previous : string;
	results : Array<IPokemonReference>;
}