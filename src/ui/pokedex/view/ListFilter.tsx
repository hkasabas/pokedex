import * as React from 'react';
import {ChangeEvent} from 'react';

import {IFilterState} from "../../../service/store/storeModel";


export interface FilterChangeEvent {
	customFilter : string;
}

interface IProps {
	filterState : IFilterState | null;

	onFilterChange : (event : FilterChangeEvent) => void
}

export class ListFilter extends React.Component<IProps, any> {
	render() {
		return (
			<div className="pokedex-listFilter__container">
				<input
					type="search"
					name="customFilter"
					placeholder="Search ..."
					value={this.getCustomFilterValue()}
					onChange={this.onCustomFilterChange.bind(this)}
					className="form-control"/>
				<span className="glyphicon glyphicon-search" aria-hidden="true"></span>
			</div>
		);
	}

	getCustomFilterValue() : string {
		return this.props.filterState != null ? this.props.filterState.customFilter : "";
	}

	onCustomFilterChange(event : ChangeEvent<any>) {
		this.props.onFilterChange({
			customFilter : event.target.value
		});
	}
}
