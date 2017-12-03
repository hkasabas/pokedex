import * as React from 'react';
import {IPokemonReference} from "../../../model/IPokemonReference";
import {IPokemon} from "../../../model/IPokemon";


export interface AddToMyListEvent {
	reference : IPokemonReference;
}

export interface RemoveFromMyListEvent {
	reference : IPokemonReference;
}

interface IProps {
	pokemon : IPokemon;
	pokemonReference : IPokemonReference;
	isInMyList : boolean;

	onAddToMyList : (event : AddToMyListEvent) => void
	onRemoveFromMyList : (event : RemoveFromMyListEvent) => void
}

export class PokemonView extends React.Component<IProps, any> {
	render() {
		return (
			<div>

				<div className="container">
					{/* Add/remove from my list */}
					<div className="row">
						<div className="col-sm">
							{this.props.isInMyList ?
								<button name="removeFromMyList" onClick={this.onRemoveFromMyListButtonClick.bind(this)} className="btn btn-danger">Remove from my list</button>
								:
								<button name="addToMyList" onClick={this.onAddToMyListButtonClick.bind(this)} className="btn btn-primary">Add to my list</button>
							}
						</div>
					</div>

					{/* Id */}
					<div className="row">
						<div className="col-sm col-3">
							<label>ID</label>
						</div>
						<div className="col-sm col-9">
							#{this.props.pokemon.id}
						</div>
					</div>

					{/* Name */}
					<div className="row">
						<div className="col-sm col-3">
							<label>Name</label>
						</div>
						<div className="col-sm col-9">
							#{this.props.pokemon.name}
						</div>
					</div>

					{/* Types */}
					<div className="row">
						<div className="col-sm col-3">
							<label>Type</label>
						</div>
						<div className="col-sm col-9">
							{this.props.pokemon.types
								.map((type) => {
									return (<span><span className="badge badge-secondary">{type.type.name}</span>&nbsp;</span>);
								})
							}
						</div>
					</div>

					{/* Height */}
					<div className="row">
						<div className="col-sm col-3">
							<label>Height</label>
						</div>
						<div className="col-sm col-9">
							{this.props.pokemon.height}
						</div>
					</div>

					{/* Weight */}
					<div className="row">
						<div className="col-sm col-3">
							<label>Weight</label>
						</div>
						<div className="col-sm col-9">
							{this.props.pokemon.weight}
						</div>
					</div>

					{/* Abilites */}
					<div className="row">
						<div className="col-sm col-3">
							<label>Abilities</label>
						</div>
						<div className="col-sm col-9">
							{this.props.pokemon.abilities
								.map((ability) => {
									return (
										<div>
											{ability.ability.name} {(ability.is_hidden ? " (hidden ability)" : "")}
										</div>);
								})
							}
						</div>
					</div>

				</div>

				<div>
					<h5>Moves</h5>

					<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Move</th>
								<th scope="col">Username</th>
							</tr>
						</thead>
						<tbody>
							{this.props.pokemon.moves
								.map((move, index) => {
									return (
										<tr>
											<th scope="row">{index + 1}</th>
											<td>{move.move.name}</td>
											<td>TODO</td>
										</tr>
									);
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		);
	}

	private onAddToMyListButtonClick(event : MouseEvent) {
		event.preventDefault();

		this.props.onAddToMyList({
			reference : this.props.pokemonReference
		});
	}

	private onRemoveFromMyListButtonClick(event : MouseEvent) {
		event.preventDefault();

		this.props.onRemoveFromMyList({
			reference : this.props.pokemonReference
		});
	}
}
