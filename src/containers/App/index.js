import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';

import Visor from '../Visor';
import Landing from '../Landing';
import Dashboard from '../Dashboard';

const { Content } = Layout;

class App extends Component {
	render() {
		return (
			<Layout style={{ height: '100vh' }}>
				<Helmet titleTemplate="%s | Fetch-Api-News" />
				<Content>
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/visor" component={Visor} />
					</Switch>
				</Content>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => ({
	route: state.route
});

const WrappedApp = connect(mapStateToProps, {})(App);

export default WrappedApp;
