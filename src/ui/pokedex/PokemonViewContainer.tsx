import * as PropTypes from 'prop-types';
import * as React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {IPokemon} from "../../model/IPokemon";
import {IPokemonReference} from "../../model/IPokemonReference";
import {PokemonStore} from "../../service/store/pokemonStore";
import {AppLayoutPage} from "../common/AppLayoutPage";
import {AppLayoutPageContent} from "../common/AppLayoutPageContent";
import {AppLayoutPageHeader} from "../common/AppLayoutPageHeader";
import {AddToMyListEvent, PokemonView, RemoveFromMyListEvent} from "./view/PokemonView";


interface IProps {
	pokemon : IPokemon;
	pokemonReference: IPokemonReference;
	isInMyList : boolean;

	params : {[key : string] : string};
	actions: {[key : string] : (_ : any) => void};
}

class PokemonIndexContainer extends React.Component<IProps, any> {
	static contextTypes = {
		router: PropTypes.object
	};


	// ---------- Lifecycle methods

	componentDidMount() {
		// fetch current pokemon
		this.props.actions.fetchPokemon(this.props.pokemonReference);
	}

	componentWillUnmount() {
		// clear current pokemon from store
		this.props.actions.loadPokemon(null);
	}

	render() {
		return (
			<AppLayoutPage>
				<AppLayoutPageHeader>
					{this.props.pokemon &&
						<span>{this.props.params.pokemonName} #{this.props.pokemon.id}</span>}
				</AppLayoutPageHeader>

				<AppLayoutPageContent>
					{this.props.pokemon != null &&
					<div>
						<PokemonView
							pokemon={this.props.pokemon}
							pokemonReference={this.props.pokemonReference}
							isInMyList={this.props.isInMyList}
							onAddToMyList={this.onAddToMyList.bind(this)}
							onRemoveFromMyList={this.onRemoveFromMyList.bind(this)}/>
					</div>
					}
				</AppLayoutPageContent>
			</AppLayoutPage>
		);
	}


	// ---------- Event handlers

	onAddToMyList(event : AddToMyListEvent) {
		let pokemonReference = event.reference;

		console.log(`Adding pokemon "${pokemonReference.name}" to my list`);
		this.props.actions.addToMyPokemonList(pokemonReference);
	}

	onRemoveFromMyList(event : RemoveFromMyListEvent) {
		let pokemonReference = event.reference;

		console.log(`Removing pokemon "${pokemonReference.name}" from my list`);
		this.props.actions.removeFromMyPokemonList(pokemonReference);
	}
}

function mapStateToProps(store : any, props : IProps) {
	return {
		pokemonReference: PokemonStore.selectors.selectPokemonReference(store, props.params.pokemonName),
		pokemon: PokemonStore.selectors.selectCurrentPokemon(store),
		isInMyList: PokemonStore.selectors.selectIsInMyList(store, props.params.pokemonName),
	};
}

function mapDispatchToProps(dispatch : any) {
	return {
		actions: bindActionCreators(PokemonStore.actions, dispatch),
	};
}

// TODO: why cannt we send component directly do "connect" function?!
let PokemonIndexContainerCmp : any = PokemonIndexContainer;

export default connect(mapStateToProps, mapDispatchToProps)(PokemonIndexContainerCmp);

