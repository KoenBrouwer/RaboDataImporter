import React from "react";
import things from "../things";
import {Redirect} from "react-router-dom";

export default class Import extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			files: [],
			result: null,
			redirectUrl: false,
		};

		this.onSelectFile = this.onSelectFile.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onFormSubmit(e) {
		e.preventDefault();

		/* Take the first file if it exists */
		let file = this.state.files[0] || undefined;

		if(!file){
			throw new Error("No file uploaded");
		}

		let fileReader = new FileReader();
		fileReader.onload = file => {
			console.log(file);

			/* Upload the file to the API for processing */
			fetch(things.API, {
				method: "POST",
				body: file.target.result
			})
				.then(r => r.json())
				.then(responseData => {
					console.log(responseData);

					if(responseData.success){
						this.setState({
							redirectUrl: "/",
						});
					}
				});
		};

		fileReader.readAsText(file);
	}

	onSelectFile(e) {
		e.preventDefault();

		this.setState({
			files: e.target.files,
		});
	}

	render() {
		if(this.state.redirectUrl){
			return (<Redirect to={this.state.redirectUrl} />);
		}

		return (
			<div className="page">
				<div className="wrapper">
					<form onSubmit={this.onFormSubmit}>
						<div className="input">
							<label htmlFor="file">File</label>
							<input type="file" id="file" onChange={this.onSelectFile} />
						</div>

						<div className="input">
							<label htmlFor="submit" />
							<input type="submit" id="submit" value="Import data" />
						</div>

						<p>
							{this.state.result}
						</p>
					</form>
				</div>
			</div>
		)
	}

}