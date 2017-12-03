
export interface IStoreAction<T> {
	type : string;
	payload : T;
}


export interface IFilterState {
	customFilter : string
}

export interface IFilterStateActionPayload {
	id : string,
	filterState : IFilterState
}


// ----- Redux store functions

export type GetStateFn = () => any;

export type DispatchFn = <A>(action : IStoreAction<A>) => A;
