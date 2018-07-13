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

	/**
	 * Method that is called when the form is submitted.
	 * @param e
	 */
	onFormSubmit(e) {
		/* Prevent default browser behaviour */
		e.preventDefault();

		/* Take the first file if it exists */
		let file = this.state.files[0] || undefined;

		/* If there is no file uploaded, show an error */
		if(!file){
			throw new Error("No file uploaded");
		}

		/* Create an instance of FileReader that reads the contents of the uploaded file */
		let fileReader = new FileReader();
		fileReader.onload = file => {
			/* Upload the file to the API for processing */
			fetch(things.API, {
				method: "POST",
				body: file.target.result
			})
				.then(r => r.json())
				.then(responseData => {
					/* And if the response is a success, redirect back to "/", where the data is visualized */
					if(responseData.success){
						this.setState({
							redirectUrl: "/",
						});
					}
				});
		};

		fileReader.readAsText(file);
	}

	/**
	 * Method that is called after files have been selected via the file input
	 * @param e
	 */
	onSelectFile(e) {
		/* Prevent default browser behaviour */
		e.preventDefault();

		/* Just save the uploaded files to the state */
		this.setState({
			files: e.target.files,
		});
	}

	render() {
		/* If there is a redirectUrl in the state, instead render a redirect */
		if(this.state.redirectUrl){
			return (<Redirect to={this.state.redirectUrl} />);
		}

		return (
			<div className="page">
				<div className="wrapper">
					<form onSubmit={this.onFormSubmit} className="fileUpload">
						<div className="input">
							<label htmlFor="file">Click here to select a file</label>
							<input type="file" id="file" onChange={this.onSelectFile} />
						</div>

						<div className="input">
							{this.state.files.length > 0 ? <input type="submit" id="submit" value="Import data" /> : null}
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