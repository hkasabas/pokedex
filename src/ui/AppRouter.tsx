import * as React from 'react';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
import IndexRedirect from "react-router/lib/IndexRedirect";
import {appInit} from "./appInit";
import {AppLayout} from "./common/AppLayout";
import PokemonIndexContainer from "./pokedex/PokemonIndexContainer";
import MyPokemonListContainer from "./pokedex/MyPokemonListContainer";
import PokemonViewContainer from "./pokedex/PokemonViewContainer";

export const AppRouter: React.StatelessComponent<{}> = () => {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={AppLayout} onEnter={appInit}>
				<IndexRedirect to="/pokemons" />

				<Route path="/pokemons"
				       component={PokemonIndexContainer}>
				</Route>

				<Route path="/pokemons/:pokemonName"
				       component={PokemonViewContainer}>
				</Route>

				<Route path="/mypokemons"
				       component={MyPokemonListContainer}>
				</Route>

			</Route>
		</Router>
	);
}