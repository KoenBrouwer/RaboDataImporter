import React from "react";

export default class Filter extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data: props.data
		};

		this.onChangeFilter = this.onChangeFilter.bind(this);
		this.applyFilter = this.applyFilter.bind(this);
	}

	/**
	 * This method is called after the component is updated. In this case when the data prop is changed.
	 * @param oldProps
	 * @param oldState
	 */
	componentDidUpdate(oldProps, oldState) {
		/* Check if "data" was changed, or the state */
		if(oldProps.data !== this.props.data || oldState.data !== this.state.data){
			/* If so, save the changed data in the state */
			this.setState({
				data: this.props.data
			});
		}
	}

	/**
	 * This method is called after the value in the minIssueCount form field is changed
	 * @param e
	 */
	onChangeFilter(e) {
		/* Get the value from the input field */
		let issueCount = e.target.value;

		/* Save it in the state as a filter function */
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

	/**
	 * Method that filters the given data with all the filters that are saved in the state
	 * @param data
	 * @returns {*} The filtered data
	 */
	applyFilter(data) {
		let state = this.state || {};
		state.filter = state.filter || [];

		if(data){
			state.filter.forEach(f => {
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
		/**
		 * Result is the output of json2table as a component, that can be loaded at anytime during rendering
		 * @returns {*}
		 * @constructor
		 */
		let Result = () => {
			/* Get all data from the state */
			let data = this.state.data;

			/* Apply all filters to the data */
			data = this.applyFilter(data);

			/* And return the generated HTML */
			return this.json2table(data);
		};

		return (
			<div>
				<div className="filterOptions">
					<h2>Filter options</h2>
					<label htmlFor="limit">Minimal issue count:</label>
					<input type="number" min="0" id="limit" onChange={this.onChangeFilter} />
				</div>
				<Result />
			</div>
		);
	}
}