import * as React from 'react';
import * as PropTypes from 'prop-types';


interface IProps {
	showMenuToggler? : boolean;
}

export class AppLayoutPageHeader extends React.Component<IProps> {
	static contextTypes = {
		sidebarContext: PropTypes.object
	};

	render() {
		return (
			<header className="pokedex-layoutPage__header">
				{(this.props.showMenuToggler == null || this.props.showMenuToggler) && !this.isSidebarDocked() &&
					<span>
						<a
							href="#"
							onClick={this.onMenuTogglerClick.bind(this)}
						    className="pokedex-layoutPage__menuToggler">&#x2630;</a>
					</span>
				}

				{this.props.children}
			</header>
		);
	}


	isSidebarDocked() : boolean {
		return this.context.sidebarContext.isSidebarDocked();
	}

	isSidebarOpen() : boolean {
		return this.context.sidebarContext.isSidebarOpen();
	}

	onMenuTogglerClick(event : MouseEvent) {
		event.preventDefault();

		let newSidebarOpen = !this.context.sidebarContext.isSidebarOpen();
		this.context.sidebarContext.toggleSidebar(newSidebarOpen)
	}
}
