import React from "react";
import {Link} from "react-router-dom";

import things from "../things";
import Filter from "./Filter";

export default class Result extends React.Component {

	constructor(props) {
		super(props);

		/* Initial state is that data is null */
		this.state = {
			data: null,
		};
	}

	/**
	 * This method is called after the component is mounted.
	 */
	componentDidMount() {
		/* Ask the API for data */
		fetch(things.API, {
			method: "GET"
		})
			.then(result => result.json())
			.then(result => {
				result.data = result.data || {};

				/* If there's any data */
				if(result.data.length > 0){
					/* Map the data to add a field called "Age" based on the "Date of birth" field. */
					result.data.map(r => {
						r["Date of birth"] = r["Date of birth"] || null;

						if(r["Date of birth"]){
							r.Age = (new Date() - new Date(r["Date of birth"]));
							r.Age = Math.floor(r.Age / (1000 * 60 * 60 * 24 * 7 * 52));
						}
						else{
							r.Age = "?";
						}

						return r;
					});
				}

				/* And save the data in the state */
				this.setState({
					data: result.data
				});
			});
	}

	render() {
		if(this.state.data){
			return (
				<div className="page">
					<div className="wrapper">
						<Filter data={this.state.data} />
					</div>
				</div>
			);
		}
		else{
			return (
				<div className="page">
					<div className="wrapper">
						<p>No data. Why not <Link to="/import">import some data</Link>?</p>
					</div>
				</div>
			);
		}
	}

}