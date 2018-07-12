import React from "react";
import {Link} from "react-router-dom";

class Header extends React.Component {

	render() {
		return (
			<header>
				<div className="topBar">
					<div className="wrapper">
						<h1>Rabobank Data Dashboard ™</h1>
					</div>
				</div>
				<nav>
					<Link to="/import">Import data</Link>
					<Link to="/">Visualize data</Link>
				</nav>
			</header>
		);
	}

}

export default Header;