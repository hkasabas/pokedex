import * as React from 'react';
import {IPokemonReference} from "../../../model/IPokemonReference";


export interface PokemonSelectEvent {
	reference : IPokemonReference;
}

interface IProps {
	pokemonList : Array<IPokemonReference>;

	onSelected : (event : PokemonSelectEvent) => void
}

export class PokemonList extends React.Component<IProps, any> {
	render() {
		return (
			<div className="pokedex-pokemonList__container list-group">
				<ul className="pokedex-common__itemList">
				{(this.props.pokemonList || [])
					.map((item) => {
						return (
							<li
								key={item.name}
								onClick={(event) => this.onItemClick(item)}
								className="list-group-item">
								{item.name}
							</li>
						)
					})}
				</ul>
			</div>
		);
	}

	onItemClick(item : IPokemonReference) {
		this.props.onSelected({
			reference : item
		});
	}
}
