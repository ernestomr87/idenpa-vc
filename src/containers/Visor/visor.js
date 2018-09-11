import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Layout, Modal, Form, Input, Select, Tabs, Button, Row, Col, Icon } from 'antd';

import reducer from './reducer';
import saga from './saga';
import withReducer from '../../utils/withReducer';
import withSaga from '../../utils/withSaga';

import makeSelectSider from './../Sider/selectors';
import makeSelectVisor from './selectors';
import { addNodeRequest, addNodeResponse } from './actions';

import Map from './../../components/Map.js';
import Sider from './../Sider';
import { nodes, node_services } from './../../data/index';

const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { TabPane } = Tabs;

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

	componentWillReceiveProps = (nextProps) => {
		if (!nextProps.visor.loading && this.props.visor.loading) {
			this.hideModal();
		}
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

	hideModal = () => {
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
		this.setState({
			node: value
		});
	};

	addNodo = () => {
		const { node } = this.state;

		let nodeUrl = `${nodes[node].url}${node_services}`;
		this.props.addNodeReq({ nodeUrl });
	};

	render() {
		const { sider: { layers }, visor: { loading } } = this.props;
		const { getFieldDecorator } = this.props.form;

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
									<Button icon="plus" type="primary" loading={loading} onClick={this.addNodo} />
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
	visor: {
		nodes: [],
		loading: false,
		error: false
	}
};

Visor.propTypes = {};

const mapStateToProps = createStructuredSelector({
	sider: makeSelectSider(),
	visor: makeSelectVisor()
});

const withConnect = connect(mapStateToProps, {
	addNodeReq: addNodeRequest,
	addNodeRes: addNodeResponse
});

export default compose(withConnect, withSaga({ key: 'visor', saga }), withReducer({ key: 'visor', reducer }))(
	Form.create()(Visor)
);
