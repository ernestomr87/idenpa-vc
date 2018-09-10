import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Layout, Modal, Form, Input, Select, Tabs, Button, Row, Col, Icon } from 'antd';
import { CapabilitiesUtil } from '@terrestris/react-geo';

import reducer from './reducer';
import saga from './saga';
import withReducer from '../../utils/withReducer';
import withSaga from '../../utils/withSaga';

import makeSelectSider from './../Sider/selectors';
import makeSelectVisor from './selectors';
import { addNodeAction } from './actions';

import Map from './../../components/Map.js';
import Sider from './../Sider';
import { nodes, node_services, getLayersFromWmsCapabilties } from './../../data/index';

const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { TabPane } = Tabs;

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

const FormItemWrapper = styled(FormItem)`
	width: 100%;
	.ant-form-item-control-wrapper{
		width: 100%;
	}
	.ant-form-item-control-wrapper .has-error,.ant-form-item-control-wrapper .has-success{
		width: 100%;
	}
`;

class Visor extends Component {
	state = {
		collapsed: false,
		visible: false,
		node: 0
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

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};

	handleChange = (value) => {
		console.log(value);
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
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

		// Only show error after a field is touched.
		const nodeUrlError = isFieldTouched('nodeUrl') && getFieldError('nodeUrl');

		const nodesOptions = nodes.map((item, index) => (
			<Option key={item.name} value={index}>
				{item.name}
			</Option>
		));

		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sider collapsed={this.state.collapsed} onCollapse={this.onCollapse} showModal={this.showModal} />
				<Layout>
					<Content>
						<Map layers={layers} drawer={this.state.collapsed} />
					</Content>
				</Layout>
				<Modal
					width={370}
					footer={null}
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<Tabs defaultActiveKey="1">
						<TabPane tab="Seleccionar Nodo" key="1">
							<Row>
								<Col xs={24} sm={20}>
									<Select
										style={{ width: '98%' }}
										defaultValue={this.state.node}
										onChange={this.handleChange}
									>
										{nodesOptions}
									</Select>
								</Col>
								<Col xs={24} sm={4}>
									<Button icon="plus" type="primary" onClick={this.addNodo} />
								</Col>
							</Row>
						</TabPane>
						<TabPane tab="Entrar la dirección" key="2">
							<Form layout="inline" onSubmit={this.handleSubmit}>
								<Row>
									<Col xs={24} sm={20}>
										<FormItemWrapper style={{ width: '100%' }} hasFeedback>
											{getFieldDecorator('nodeUrl', {
												rules: [ { required: true, message: 'Por favor entre la dirección!' } ]
											})(
												<Input
													style={{ width: '98%' }}
													prefix={<Icon type="text" style={{ color: 'rgba(0,0,0,.25)' }} />}
													placeholder="Direccón del Nodo"
												/>
											)}
										</FormItemWrapper>
									</Col>
									<Col xs={24} sm={4}>
										<FormItem>
											<Button icon="plus" type="primary" htmlType="submit" />
										</FormItem>
									</Col>
								</Row>
							</Form>
						</TabPane>
					</Tabs>
				</Modal>
			</Layout>
		);
	}
}

Visor.defaultProps = {
	sider: {
		item: null,
		layers: []
	},
	sider: {
		nodes: []
	}
};

Visor.propTypes = {};

const mapStateToProps = createStructuredSelector({
	sider: makeSelectSider(),
	visor: makeSelectVisor()
});

const withConnect = connect(mapStateToProps, {
	addNode: addNodeAction
});

export default compose(withConnect, withSaga({ key: 'visor', saga }), withReducer({ key: 'visor', reducer }))(
	Form.create()(Visor)
);

// export default compose(Form.create()(Visor));
