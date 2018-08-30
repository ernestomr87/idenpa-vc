import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectSider from './../Sider/selectors';
import Map from './../../components/Map.js';
import React, { Component } from 'react';
import Sider from './../Sider';

class Visor extends Component {
	state = {
		visible: true
	};

	showDrawer = () => {
		this.setState({
			visible: true
		});
	};

	onClose = () => {
		this.setState({
			visible: false
		});
	};

	render() {
		const { sider: { layers } } = this.props;
		return (
			<div>
				<Map layers={layers} drawer={this.state.visible} />
				<Sider visible={this.state.visible} showDrawer={this.showDrawer} onClose={this.onClose} />
			</div>
		);
	}
}

Visor.defaultProps = {
	sider: {
		item: null,
		layers: []
	}
};

Visor.propTypes = {};

const mapStateToProps = createStructuredSelector({
	sider: makeSelectSider()
});

const withConnect = connect(mapStateToProps, {});

export default compose(withConnect)(Visor);
