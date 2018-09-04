import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectSider from './../Sider/selectors';
import Map from './../../components/Map.js';
import React, { Component } from 'react';
import Sider from './../Sider';
import { Layout, Modal } from 'antd';
import { CapabilitiesUtil } from '@terrestris/react-geo';
import { nodes, node_services, getLayersFromWmsCapabilties } from './../../data/index';

const { Content } = Layout;

class Visor extends Component {
	state = {
		collapsed: false,
		visible: false
	};

	onCollapse = (collapsed) => {
		console.log(collapsed);
		this.setState({ collapsed });
	};

	showModal = () => {
		this.setState({
			visible: true
		});
	};

	handleOk = (e) => {
		console.log(e);
		this.setState({
			visible: false
		});
	};

	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false
		});
	};

	addNodo = () => {
		const _this = this;
		const { nodo } = this.state;
		let nodoUrl = `${nodo}${nodes.node_services}`;
		CapabilitiesUtil.parseWmsCapabilities(nodoUrl)
			.then((response) => {
				let nlayers = getLayersFromWmsCapabilties(response);
				_this.setState({
					layers: nlayers
				});
			})
			.catch(() => alert('Could not parse capabilities document.'));
	};

	render() {
		const { sider: { layers } } = this.props;
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sider collapsed={this.state.collapsed} onCollapse={this.onCollapse} showModal={this.showModal} />
				<Layout>
					<Content>
						<Map layers={layers} drawer={this.state.collapsed} />
					</Content>
				</Layout>
				<Modal
					title="Basic Modal"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
				</Modal>
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
