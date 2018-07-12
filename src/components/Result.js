import React from "react";
import things from "../things";

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
						return r;
					});
				}

				let resultElement = this.json2table(result.data);
				this.setState({
					resultElement: resultElement
				});
			});
	}

	/**
	 * Method that converts a JSON object to an HTML table.
	 * @param data
	 * @returns {*}
	 */
	json2table(data) {
		if(data.length > 0){
			let fieldNames = Object.keys(data[0]);

			return (
				<table>
					<thead>
					<tr>
						{fieldNames.map(f => {
							return (
								<td key={f}>{f}</td>
							);
						})}
					</tr>
					</thead>
					<tbody>
					{
						data.map(r => {
							return (
								<tr key={r}>{
									fieldNames.map(f => {
										return (<td key={r[f]}>{r[f]}</td>);
									})
								}</tr>
							);
						})
					}
					</tbody>
				</table>
			);
		}
		else{
			return (<table> </table>);
		}
	}

	render() {
		let Result = () => this.state.resultElement || <p>No results</p>;

		return (
			<div className="page">
				<div className="wrapper">
					<Result />
				</div>
			</div>
		);
	}

}