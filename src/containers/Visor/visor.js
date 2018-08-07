import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import Map from './../../components/Map';
import Sider from './../Sider';
import { Layout, Icon } from 'antd';
import makeSelectSider from './../Sider/selectors';
const { Content } = Layout;

const LayoutWrapper = styled(Layout)`
	min-height: 100vh;
	.ant-layout-header {
		height: 60px;
		line-height: 60px;
	}
`;

const MenuUnfold = styled(Icon)`
	&.anticon{
		font-size: 40px;
		color: rgb(0, 136, 204);
		position: absolute;
		z-index: 1000;
		left: 10px;
		top: 10px;
		cursor: pointer;
	}	
`;

class Visor extends Component {
	state = {
		visible: false
	};

	showDrawer = () => {
		this.setState({
			visible: true
		});
	};

	render() {
		const { sider: { layers } } = this.props;
		return (
			<LayoutWrapper>
				<Layout>
					<Content>
						<Map layers={layers} />
					</Content>
				</Layout>
				<Sider />
			</LayoutWrapper>
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
