import React, { Component } from 'react'
import styled from "styled-components";
import {Divider,Table} from 'antd'
import {
    AgricultureImg
    } from "./../Icons";

const pStyle = {
    fontWeight: 500,
    fontSize: 16,
    color: "rgba(0,0,0,0.85)",
    display: "block",
    fontFamily: `"Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif`
  };

const ImgInversion = styled.img`
  width: 25px;
  height: 25px;
  margin-top: -7px;
  margin-right: 10px;
`;

export default class CSSInfo extends Component {
  render() {
    const {dataSource}=this.props;
    let data={};
    dataSource.forEach(element => {
      data[element.key]=element.value;
    });

    const fTierra = [{
        name: 'Cultivos Varios',
        value: data.ft_cv,
      },
      {
        name: 'Caña',
        value: data.ft_cana,
      },
      {
        name: 'Cultivos Varios y Ganadería',
        value: data.ft_cv_gan,
      },
      {
        name: 'Ganado Menor',
        value: data.ft_gmenor,
      },
      {
        name: 'Ganadeía',
        value: data.ft_gan,
      },
    ];
    const pProduction = [{
        name: 'Cultivos Varios',
        value: data.pp_cv,
      },
      {
        name: 'Frutales',
        value: data.pp_frut,
      },
      {
        name: 'Ganadeía',
        value: data.pp_gan,
      },
    ];
    const productores = [{
        name: 'Propietarios',
        value: data.p_prop,
      },
      {
        name: 'Usufructuarios',
        value: data.p_usuf,
      },
    ];
    const comercializacion = [{
        name: 'Puntos de Venta',
        value: data.cant_ptoventa||0,
      },
      {
        name: 'Puntos de Compra',
        value: data.cant_ptocompra||0,
      },
    ];
    
    const columns = [{
      dataIndex: 'name',
      key: 'name',
    }, {
      dataIndex: 'value',
      key: 'value',
    }];

    return (
      <div>
         <p style={{ ...pStyle, marginBottom: 24 }}> <ImgInversion src={AgricultureImg} alt="" /> {data.nombre}</p>
         <Divider/>
         
         <span style={{color: '#000000',fontWeight: 500, fontSize: 15}}>Fondo de Tierra (ha)</span>
         <Table size="small" showHeader={false} pagination={false} dataSource={fTierra} columns={columns} />

         <span style={{color: '#000000',fontWeight: 500, fontSize: 15}}>Plan de Producción (t/ha)</span>
         <Table size="small" showHeader={false} pagination={false} dataSource={pProduction} columns={columns} />

         <span style={{color: '#000000',fontWeight: 500, fontSize: 15}}>Productores</span>
         <Table size="small" showHeader={false} pagination={false} dataSource={productores} columns={columns} />

         <span style={{color: '#000000',fontWeight: 500, fontSize: 15}}>Comercialización</span>
         <Table size="small" showHeader={false} pagination={false} dataSource={comercializacion} columns={columns} />

      </div>
    )
  }
}
