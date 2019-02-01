import React, { Component } from 'react'
import styled from "styled-components";
import { Divider,Table, Icon, Button } from 'antd'
import {
    AgricultureImg
    } from "./../Icons";

import map, {
  addLayer,
  removeLayer,
} from './../Map/utils'  

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

const Span= styled.span`
  color: #096dd9;
  font-weight: 500; 
  font-size: 15;
`

const TableWrapper= styled(Table)`
  margin-bottom: 15px;
`


export default class CSSInfo extends Component {
  state={
    layers:[]
  }

  addLayer = async (data) => {
    const { oldLayers }=this.props;
    let array=[{
        color: "#f5222d",
        json: `http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:termo_leche&CQL_FILTER=id_fp=${data.gid}&outputFormat=application%2Fjson`,
        name: data.nombre,
        nomenclature: null,
    }]
    let result = await addLayer(array, oldLayers);
    let layers = Object.assign(this.state.layers, result[result.length-1]);
    this.setState({ layers });
  };

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
    const termos = [{
        name: '500L',
        value: data.tl_500||0,
      },
      {
        name: '1000L',
        value: `${data.tl_1000 || 0}`,
      },
    ];
    
    const columns = [{
      dataIndex: 'name',
      key: 'name',
    }, {
      dataIndex: 'value',
      key: 'value',
      align:'right'
    }];

    return (
      <div>
         <p style={{ ...pStyle, marginBottom: 24 }}> <ImgInversion src={AgricultureImg} alt="" /> {data.nombre}</p>
         <Divider/>
         
         <Span>Fondo de Tierra (ha)</Span>
         <TableWrapper size="small" showHeader={false} pagination={false} dataSource={fTierra} columns={columns} />

         <Span>Plan de Producción (t/ha)</Span>
         <TableWrapper size="small" showHeader={false} pagination={false} dataSource={pProduction} columns={columns} />

         <Span>Productores</Span>
         <TableWrapper size="small" showHeader={false} pagination={false} dataSource={productores} columns={columns} />

         <Span>Comercialización</Span>
         <TableWrapper size="small" showHeader={false} pagination={false} dataSource={comercializacion} columns={columns} />

         <Span>Termos de Leche <Button onClick={()=>{this.addLayer(data)}} style={{ margin: '0 10px 5px 0px', float:"right"}} type="primary" size="small" shape="circle" icon="environment-o" /> </Span>
         <TableWrapper size="small" showHeader={false} pagination={false} dataSource={termos} columns={columns} />

      </div>
    )
  }
}
