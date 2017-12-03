import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as promise from 'redux-promise';
import {createLogger} from 'redux-logger';

import {persistStore, autoRehydrate} from 'redux-persist';

import {persistConfig} from './persistStore';

// reducers
import {PokemonStore} from './pokemonStore';


// Combine Reducers
const rootReducer = combineReducers({
	...(PokemonStore.reducers)
});

const logger = createLogger();

export const appStore = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk, promise, logger),
		autoRehydrate()
	)
);



// begin periodically persisting the store
const persistor = persistStore(
	appStore,
	persistConfig
);
