import * as React from 'react';
import {AppLayoutSidebar} from "./AppLayoutSidebar";


export class AppLayoutPage extends React.Component {

	render() {
		return (
			<div className="pokedex-layoutPage">
				{this.props.children}
			</div>
		);
	}
};