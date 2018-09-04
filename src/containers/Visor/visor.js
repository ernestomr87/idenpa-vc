import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectSider from './../Sider/selectors';
import Map from './../../components/Map.js';
import React, { Component } from 'react';

import Sider from './../Sider';

import { Layout } from 'antd';
const { Content } = Layout;

class Visor extends Component {
	state = {
		collapsed: false
	};

	onCollapse = (collapsed) => {
		console.log(collapsed);
		this.setState({ collapsed });
	};

	render() {
		const { sider: { layers } } = this.props;
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sider collapsed={this.state.collapsed} onCollapse={this.onCollapse} />
				<Layout>
					<Content>
						<Map layers={layers} drawer={this.state.collapsed} />
					</Content>
				</Layout>
			</Layout>
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
