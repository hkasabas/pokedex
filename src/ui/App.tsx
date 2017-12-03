import * as React from 'react';
import {Provider} from "react-redux";
import {appStore} from "../service/store/appStore";
import './App.css';
import {AppRouter} from "./AppRouter";


export class App extends React.Component {
	render() {
		return (
			<Provider store={appStore}>
				<AppRouter />
			</Provider>
		);
	}
}
