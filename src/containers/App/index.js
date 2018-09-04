import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Switch, Route } from 'react-router-dom';

import Visor from '../Visor';
import Dashboard from '../Dashboard';

class App extends Component {
	state = {
		collapsed: false
	};

	onCollapse = (collapsed) => {
		console.log(collapsed);
		this.setState({ collapsed });
	};

	render() {
		return (
			<Switch>
				<Route path="/" component={Visor} />
				<Route path="/dashboard" component={Dashboard} />
			</Switch>
		);
	}
}

const mapStateToProps = (state) => ({
	route: state.route
});

const WrappedApp = connect(mapStateToProps, {})(App);

export default WrappedApp;
