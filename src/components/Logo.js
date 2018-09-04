import React, { Component } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import Logo from './Icons';

const LogoImg = styled.img`
	width: 38px;
	height: 38px;
	filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.8));
`;

const Span = styled.div`
	width: 90px;
	margin-top: 7px;
	font-weight: 500;
	font-size: 20px;
	font-family: Consolas, Menlo, Courier, monospace;
	color: #fff;
	filter: drop-shadow(0 0 2px #5b784d);
`;

export default class LogoComponent extends Component {
	render() {
		return (
			<div>
				<Row style={{ paddingLeft: 15 }}>
					<Col xs={4}>
						<LogoImg src={Logo} alt="" />
					</Col>
					<Col xs={20}>
						<Span>
							IDENPA <small style={{ color: '#5b784d', margin: '0px 0px 0px -10px' }}>vc</small>
						</Span>
					</Col>
				</Row>
			</div>
		);
	}
}
