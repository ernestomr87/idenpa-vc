import React, { Component } from "react";
import styled from "styled-components";
import { Divider, Table, Spin, Col, Row, Button,Modal,Tabs, Alert  } from "antd";
import { AgricultureImg } from "./../Icons";
import { Chart, Tooltip, Geom, Axis } from "bizcharts";
import _ from "lodash";
import { addLayer } from "./../Map/utils";

import { fetchFormasProductivasById } from "./../../services";

const TabPane = Tabs.TabPane;

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

const Span = styled.span`
  color: #096dd9;
  font-weight: 500;
  font-size: 15;
`;

const TableWrapper = styled(Table)`
  margin-bottom: 15px;
`;

const transform = dataSource => {
  let data = {};
  dataSource.forEach(element => {
    data[element.key] = element.value;
  });
  return data;
};

const numberToLetter = number => {
  const letters = {
    10: "a",
    11: "b",
    12: "c",
    13: "d",
    14: "e",
    15: "f"
  };

  for (var j = 0; j < 6; j++) {
    if (number === Object.keys(letters)[j]) {
      number = Object.values(letters)[j];
      break;
    }
  }

  return number;
};

const getRandomColor = () => {
  let number;
  let color = "#";

  for (let i = 0; i < 6; i++) {
    number = Math.round(Math.random() * 15);

    // Change the number to the letter
    if (number > 9) {
      number = numberToLetter(number);
    }

    color += number;
  }

  return color;
};

export default class CSSInfo extends Component {
  state = {
    layers: [],
    data: null,
    formasProductivas:null,
    loading: false
  };

  componentWillMount = () => {
    const { dataSource } = this.props;

    this.changeData(transform(dataSource));
  };

  componentWillReceiveProps = nextProps => {
    const nData = transform(nextProps.dataSource);
    if (transform(this.props.dataSource).gid != nData.gid) {
      this.changeData(nData);
    }
  };


  changeData = data => {
    const self = this;

    this.setState({
      layers: [],
      data: null,
      formasProductivas:null,
    })
    if(data.tipo ==="UBPC" || data.tipo ==="CCS"){
      self.setState({
        loading: true
      })
      fetchFormasProductivasById(data.gid)
      .then(response => {
        let formasProductivas={};
        let flag=false;
        response.data.forEach((element)=>{
           if(!formasProductivas[element.indicador]){
            formasProductivas[element.indicador]={}
            formasProductivas[element.indicador].total = 0;
          }
          formasProductivas[element.indicador][element.mes]=element.cant;
          formasProductivas[element.indicador].um = element.um;
          formasProductivas[element.indicador].total += element.cant;
          flag = true;
        });
              
        self.setState({
          data,
          loading: false,
          formasProductivas:flag?formasProductivas:null
        });
      })
      .catch(error => {
        console.log(error);
        self.setState({
          loading: false
        })
      });
    }else{
      self.setState({
        data
      });
    }
    
  };

  addLayer = async data => {
    const { oldLayers } = this.props;
    let array = [
      {
        color: "#f5222d",
        json: `http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:termo_leche&CQL_FILTER=id_fp=${
          data.gid
        }&outputFormat=application%2Fjson`,
        name: data.nombre,
        nomenclature: null
      }
    ];
    let result = await addLayer(array, oldLayers);
    let layers = Object.assign(this.state.layers, result[result.length - 1]);
    this.setState({ layers });
  };

  renderData = data => {
    const fTierra = [
      {
        name: "Cultivos Varios",
        value: data.ft_cv || 0
      },
      {
        name: "Caña",
        value: data.ft_cana || 0
      },
      {
        name: "Cultivos Varios y Ganadería",
        value: data.ft_cv_gan || 0
      },
      {
        name: "Ganado Menor",
        value: data.ft_gmenor || 0
      },
      {
        name: "Ganadeía",
        value: data.ft_gan || 0
      }
    ];
    const productores = [
      {
        name: "Propietarios",
        value: data.p_prop || 0
      },
      {
        name: "Usufructuarios",
        value: data.p_usuf || 0
      }
    ];
    const comercializacion = [
      {
        name: "Puntos de Venta",
        value: data.cant_ptoventa || 0
      },
      {
        name: "Puntos de Compra",
        value: data.cant_ptocompra || 0
      }
    ];
    const termos = [
      {
        name: "500L",
        value: data.tl_500 || 0
      },
      {
        name: "1000L",
        value: `${data.tl_1000 || 0}`
      }
    ];
    const columns = [
      {
        dataIndex: "name",
        key: "name"
      },
      {
        dataIndex: "value",
        key: "value",
        align: "right"
      }
    ];


    return (
      <div>
        <Row>
          <Col style={{ marginBottom:20}}>
            <Span>Plan de Producción</Span>
            <Button
                        onClick={this.showModal}
                        style={{ margin: "0 10px 5px 0px", float: "right" }}
                        type="primary"
                        size="small"
                        shape="circle"
                        icon="bar-chart" >
                 
              </Button>
          </Col>
          <Col>
            <Span>Fondo de Tierra (ha)</Span>
            <TableWrapper
              size="small"
              showHeader={false}
              pagination={false}
              dataSource={fTierra}
              columns={columns}
            />
          </Col>
        </Row>
        <Span>Productores</Span>
        <TableWrapper
          size="small"
          showHeader={false}
          pagination={false}
          dataSource={productores}
          columns={columns}
        />

        <Span>Comercialización</Span>
        <TableWrapper
          size="small"
          showHeader={false}
          pagination={false}
          dataSource={comercializacion}
          columns={columns}
        />

        <Span>
          Termos de Leche{" "}
          <Button
            onClick={() => {
              this.addLayer(data);
            }}
            style={{ margin: "0 10px 5px 0px", float: "right" }}
            type="primary"
            size="small"
            shape="circle"
            icon="environment-o"
          />{" "}
        </Span>
        <TableWrapper
          size="small"
          showHeader={false}
          pagination={false}
          dataSource={termos}
          columns={columns}
        />
      </div>
    );
  };

  showModal = () => {
    let formasProductivas = this.state.formasProductivas;
    const dataTable =()=>{
      let data=[];
      Object.keys(formasProductivas).map((element)=>{
        let aux = {
          "indicador":`${element} (${formasProductivas[element].um})`,
          "enero":_.floor(formasProductivas[element]["Enero"], 2),
          "febrero":_.floor(formasProductivas[element]["Febrero"], 2),
          "marzo":_.floor(formasProductivas[element]["Marzo"], 2) ,
          "abril":_.floor(formasProductivas[element]["Abril"], 2) ,
          "mayo":_.floor(formasProductivas[element]["Mayo"], 2) ,
          "junio":_.floor(formasProductivas[element]["Junio"], 2) ,
          "julio":_.floor(formasProductivas[element]["Julio"], 2) ,
          "agosto":_.floor(formasProductivas[element]["Agosto"], 2) ,
          "septiembre":_.floor(formasProductivas[element]["Septiembre"], 2) ,
          "octubre":_.floor(formasProductivas[element]["Octubre"], 2) ,
          "noviembre":_.floor(formasProductivas[element]["Noviembre"], 2) ,
          "diciembre":_.floor(formasProductivas[element]["Diciembre"], 2) ,
          "total":_.floor(formasProductivas[element]["total"], 2),
        };
        delete aux.um;
        data.push(aux)
      })
      return data;
    }

    const dataSource=(item) =>{
      let data = [];
      Object.keys(formasProductivas[item]).map((element)=>{
        if(element!=="total" && element!=="um"){
          let aux={
            cant: _.floor(formasProductivas[item][element], 2),
            mes: element
          }
          data.push(aux);
        }

      })
      return data;
    } 

    const columns=() =>{
      let data = [
      {  title: "Indicador",
        dataIndex: "indicador",
        key:"indicador",
        width: 150,
        fixed: 'left',
        render: text => <strong >{text}</strong>,
      }];    

      let key = Object.keys(formasProductivas)[0];
       Object.keys(formasProductivas[key]).map((element,index)=>{
         if(element!=="total" && element!=="um"){
          let aux={
            title: element,
            dataIndex: element.toLowerCase(),
            key:element.toLowerCase(),
            width: 150
          }
          data.push(aux);
         }
      })
      data.push({  title: "Total",
      dataIndex: "total",
      key:"total",
      width: 100,
      fixed: 'right',
      render: text => <strong style={{float:"right"}}>{text}</strong>,
    });  
      return data;
    } 


    const scale = {
      mes: { alias: "Mes" },
      cant: { alias: "Cantidad" }
    };

    Modal.info({
      width: "50%",
      title: "Plan de Producción ",
      content: (
        <div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Total" key="1">
              <Table scroll={{ x: 2100, y: 0 }} pagination={false} columns={columns()} dataSource={dataTable()} />
            </TabPane>
            {Object.keys(formasProductivas).map((item,index)=>{
              return (<TabPane tab={item} key={index+2}>
              <Chart data={dataSource(item)} scale={scale}  forceFit>
                <Axis title name="mes" />
                <Axis title name="cant" />
                <Tooltip crosshairs={{ type: 'rect' }} />
                <Geom type="interval" position="mes*cant" color="mes" />
              </Chart>
              </TabPane>)
            })}
          </Tabs>

        </div>
      ),
      onOk() {}
    });
  };

  render() {
    const { data, formasProductivas } = this.state;
    return (<div>
              <p style={{ ...pStyle, marginBottom: 24 }}>
                {" "}
                <ImgInversion src={AgricultureImg} alt="" /> {data ? data.nombre: null}
              </p>
              <Divider />
              <Spin spinning={this.state.loading} tip="Cargando...">{data && formasProductivas ? this.renderData(data) : <Alert message="No hay datos para mostrar" type="info" showIcon />}</Spin>
          </div>
          
          )


   
  }
}
