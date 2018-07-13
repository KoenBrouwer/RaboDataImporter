import React from "react";
import things from "../things";

import Filter from "./Filter";

export default class Result extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data: null,
		};
	}

	componentDidMount() {
		fetch(things.API, {
			method: "GET"
		})
			.then(result => result.json())
			.then(result => {
				result.data = result.data || {};

				if(result.data.length > 0){
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

				this.setState({
					data: result.data
				});
			});
	}

	render() {
		return (
			<div className="page">
				<div className="wrapper">
					<Filter data={this.state.data} />
				</div>
			</div>
		);
	}

}