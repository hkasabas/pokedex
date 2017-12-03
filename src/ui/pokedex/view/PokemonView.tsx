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

	// ---------- Lifecycle methods

	render() {
		return (
			<div>

				{/* ---------- INFO ---------- */}
				<div className="container">
					{/* Add/remove from my list */}
					<div className="row">
						<div className="col-sm text-right">
							{this.props.isInMyList ?
								<button name="removeFromMyList" onClick={this.onRemoveFromMyListButtonClick.bind(this)} className="btn btn-danger">Remove from my list</button>
								:
								<button name="addToMyList" onClick={this.onAddToMyListButtonClick.bind(this)} className="btn btn-success">Add to my list</button>
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
							{this.props.pokemon.name}
						</div>
					</div>

					{/* Types */}
					<div className="row">
						<div className="col-sm col-3">
							<label>Type</label>
						</div>
						<div className="col-sm col-9">
							{this.props.pokemon.types
								.map((type, index) => {
									return (<span key={"type-" + index}><span className="badge badge-secondary">{type.type.name}</span>&nbsp;</span>);
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
								.map((ability, index) => {
									return (
										<div  key={"ability-" + index}>
											{ability.ability.name} {ability.is_hidden ? (<small>[hidden ability]</small>) : ""}
										</div>);
								})
							}
						</div>
					</div>

				</div>

				{/* spacer */}
				<div>&nbsp;</div>


				{/* ---------- STATS ---------- */}
				<div className="container">
					<h5>Stats</h5>

					<table className="table table-sm table-striped">
						<tbody>
						{this.props.pokemon.stats
							.sort((s1, s2) => s1.stat.name.localeCompare(s2.stat.name))
							.map((stat) => {
								return (
									<tr key={"stat-" + stat.stat.name}>
										<td>{stat.stat.name}</td>
										<td>{stat.base_stat}</td>
									</tr>
								);
							})
						}
						{this.props.pokemon.stats
							.reduce((accum, stat) => [accum[0] + stat.base_stat], [0])
							.map((totalCount) => {
								return (
									<tr key={"stat-total"}>
										<td><b>Total</b></td>
										<td><b>{totalCount}</b></td>
									</tr>
								);
							})
						}
						</tbody>
					</table>
				</div>

				{/* spacer */}
				<div>&nbsp;</div>

				{/* ---------- MOVES ---------- */}
				<div className="container">
					<h5>Moves</h5>

					<table className="table table-sm table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Move</th>
							</tr>
						</thead>
						<tbody>
							{this.props.pokemon.moves
								.map((move, index) => {
									return (
										<tr key={"move-" + index}>
											<th scope="row">{index + 1}</th>
											<td>{move.move.name}</td>
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


	// ---------- Event handlers

	onAddToMyListButtonClick(event : MouseEvent) {
		event.preventDefault();

		this.props.onAddToMyList({
			reference : this.props.pokemonReference
		});
	}

	onRemoveFromMyListButtonClick(event : MouseEvent) {
		event.preventDefault();

		this.props.onRemoveFromMyList({
			reference : this.props.pokemonReference
		});
	}
}
