import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Link} from "react-router";
import Sidebar from 'react-sidebar';

import {AppLayoutPage} from "./AppLayoutPage";
import {AppLayoutPageContent} from "./AppLayoutPageContent";
import {AppLayoutPageHeader} from "./AppLayoutPageHeader";

const mql = window.matchMedia(`(min-width: 800px)`);


interface IProps {
	docked : boolean;
	open : boolean;
}

interface IState {
	mql : any;
	sidebarDocked : boolean;
	sidebarOpen : boolean;
}

export class AppLayoutSidebar extends React.Component <IProps, IState> {
	static childContextTypes = {
		sidebarContext: PropTypes.object
	};

	constructor(props : any) {
		super(props);

		this.state = {
			mql : mql,
			sidebarDocked : props.docked,
			sidebarOpen : props.open
		};

		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	}

	getChildContext() {
		// create context object to allow child components communication with sidebar
		// this is intended especially for menu toggle button, is there a better way?
		let self = this;
		return {
			sidebarContext : {
				isSidebarDocked: (open : boolean) : boolean => {
					return self.state.sidebarDocked;
				},

				isSidebarOpen: (open : boolean) : boolean => {
					return self.state.sidebarOpen;
				},

				toggleSidebar: (open : boolean) => {
					self.openSidebar(open);
				}
			}
		}
	}


	// ---------- Lifecycle methods

	componentWillMount() {
		mql.addListener(this.mediaQueryChanged.bind(this));
		this.setState({mql : mql, sidebarDocked : mql.matches});
	}

	componentWillUnmount() {
		this.state.mql.removeListener(this.mediaQueryChanged);
	}


	render() {
		var sidebarContent = (
			<AppLayoutPage>
				<AppLayoutPageHeader showMenuToggler={false}>
					Pokedex
				</AppLayoutPageHeader>
				<AppLayoutPageContent>
					<div className="pokedex-navigation__container">
						<ul role="navigation" className="pokedex-common__itemList pokedex-navigation__list">
							<li className="pokedex-navigation__listItem">
								<Link to="/pokemons" onClick={this.onNavigationItemClick.bind(this)}>All pokemons</Link>
							</li>

							<li className="pokedex-navigation__listItem">
								<Link to="/mypokemons" onClick={this.onNavigationItemClick.bind(this)}>My pokemons</Link>
							</li>
						</ul>
					</div>
				</AppLayoutPageContent>
			</AppLayoutPage>
		);

		return (
			<Sidebar
					sidebar={sidebarContent}
					open={this.state.sidebarOpen}
					docked={this.state.sidebarDocked}
					onSetOpen={this.onSetSidebarOpen.bind(this)}
					styles={{ 'sidebar' : { 'backgroundColor' : 'white' }}}>
				{this.props.children}
			</Sidebar>
		);
	}


	// ---------- Event handlers

	onNavigationItemClick(event : MouseEvent) {
		this.openSidebar(false);
	}

	onSetSidebarOpen(/*opened*/) {
		// TODO: sidebar's typing defs prevent argument to this function, yet we need it
		this.openSidebar(arguments[0]);
	}



	// ---------- private

	private mediaQueryChanged() {
		this.setState({sidebarDocked : this.state.mql.matches});
	}


	private openSidebar(opened : boolean) {
		this.setState({sidebarOpen : opened});
	}
};