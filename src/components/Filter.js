import React from "react";

export default class Filter extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data: null
		};

		this.onChangeFilter = this.onChangeFilter.bind(this);
		this.applyFilter = this.applyFilter.bind(this);
	}

	componentDidUpdate(oldProps, oldState) {
		if(oldProps.data !== this.props.data || oldState.data !== this.state.data){
			this.setState({
				data: this.props.data
			});
		}
	}

	onChangeFilter(e) {
		let issueCount = e.target.value;

		this.setState({
			filter: [
				(data => {
					return data.filter(f => {
						return f["Issue count"] >= issueCount;
					});
				}),
			]
		});
	}

	applyFilter(data) {
		console.log("applyFilter:", [data, this.state.filter]);

		this.state = this.state || {};
		this.state.filter = this.state.filter || [];

		if(data){
			this.state.filter.forEach(f => {
				data = f(data);
			});
		}

		return data;
	}

	/**
	 * Method that converts a JSON object to an HTML table.
	 * @param data
	 * @returns {*}
	 */
	json2table(data) {
		if(data && data.length > 0){
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
								<tr key={r["First name"]}>{
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
			return (
				<table>
					<tbody>
					<tr>
						<td>No data</td>
					</tr>
					</tbody>
				</table>
			);
		}
	}

	render() {
		let Result = () => {
			let data = this.state.data;
			data = this.applyFilter(data);
			return this.json2table(data);
		};

		return (
			<div>
				<div className="filterOptions">
					<label htmlFor="limit">Minimal issue count:</label>
					<input type="number" min="0" id="limit" onChange={this.onChangeFilter} />
				</div>
				<Result />
			</div>
		);
	}
}