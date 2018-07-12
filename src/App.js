import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import "./style.css";

import Header from "./components/Header";
import Import from "./components/Import";
import Result from "./components/Result";

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Header />
					<Switch>
						<Route exact path="/" component={Result} />
						<Route exact path="/import" component={Import} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
