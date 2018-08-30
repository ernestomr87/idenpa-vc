import React, { Component } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import Logo from './Icons';

const LogoImg = styled.img`
	width: 50px;
	height: 50px;
	filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.8));
`;

const Span = styled.span`
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
					<Col xs={14}>
						<LogoImg src={Logo} alt="" />
						<Span>
							IDENPA <small style={{ color: '#5b784d', margin: '0px 0px 0px -10px' }}>vc</small>
						</Span>
					</Col>
				</Row>
			</div>
		);
	}
}
