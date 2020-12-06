import React from "react";

const Menu: React.FC = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<span className="navbar-brand">
				Covid checker
      		</span>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav">
					<li className="nav-item active">
						<span className="nav-link disabled">
							Home <span className="sr-only">(current)</span>
						</span>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Menu;
