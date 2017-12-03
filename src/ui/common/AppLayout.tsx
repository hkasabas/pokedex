import * as React from 'react';
import {AppLayoutSidebar} from "./AppLayoutSidebar";


export class AppLayout extends React.Component {

	render() {
		return (
			<AppLayoutSidebar docked={false} open={false}>

				<main className="pokedex-layoutMain">
					{this.props.children}
				</main>

			</AppLayoutSidebar>
		);
	}

}
