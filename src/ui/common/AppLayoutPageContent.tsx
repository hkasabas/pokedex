import * as React from 'react';
import {AppLayoutSidebar} from "./AppLayoutSidebar";


export class AppLayoutPageContent extends React.Component {

	render() {
		return (
			<main className="pokedex-layoutPage__content">
				{this.props.children}
			</main>
		);
	}
};