import React, { Component } from "react";
import styled from "styled-components";
import { Divider, Table, Spin, Col, Row, Button,Modal,Tabs, Alert  } from "antd";
import { AgricultureImg } from "./../Icons";
import { Chart, Tooltip, Geom, Axis } from "bizcharts";
import _ from "lodash";
import { addLayer, addLayerByGeom } from "./../Map/utils";

import { fetchFormasProductivasById,fetchTermosByFormasProductiva,fetchUsoTenenciaByFormaProductiva } from "./../../services";
import './index.css';

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
    termos:null,
    termoName:null,
    loading: false,
    loadingT: false
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

  init=()=>{
    this.setState({
      layers: [],
      data: null,
      formasProductivas:null,
      termos:null,
      termoName:null,
      loading: false,
      loadingT: false
    })
    this.props.removeLayerTermo();
  }

  changeData = data => {
    const self = this;
    this.init();
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

  fetchTermos=(gid)=>{

    const self = this;

    self.setState({
      loadingT: true
    })
    fetchTermosByFormasProductiva(gid)
      .then(response => {
        let termos={};
        let flag=false;
        let termoName=null;
        response.data.forEach((element)=>{
          if(!termoName) termoName = element.nombre_termo;
           if(!termos[element.forma_prod_tributa]){
            termos[element.forma_prod_tributa]={}
            termos[element.forma_prod_tributa].total = 0;
          }
          termos[element.forma_prod_tributa][element.mes]=element.cant;
          termos[element.forma_prod_tributa].um = element.um;
          termos[element.forma_prod_tributa].cant_productores = element.cant_productores;
          termos[element.forma_prod_tributa].total += element.cant;
          flag = true;
        });
        self.setState({
          loadingT: false,
          termoName,
          termos:flag ? termos:null
        });
        this.showTermoModal();
      })
      .catch(error => {
        console.log(error);
        self.setState({
          loadingT: false,
        });
      });
  }

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
        name: "Superficie Agrícola",
        value: data.ft_sup_agricola || 0
      },
      {
        name: "Superficie vacía",
        value: data.ft_sup_vacia || 0
      },
      {
        name: "Superficie Ociosa",
        value: data.ft_sup_ociosa || 0
      },
      {
        name: "Cultivos temporales",
        value: data.ft_cult_temp || 0
      },
      {
        name: "Tubérculos y raíces",
        value: data.ft_tub_raices || 0
      },
      {
        name: "Granos",
        value: data.ft_grano || 0
      },
      {
        name: "Tabaco",
        value: data.ft_tabaco || 0
      },
      {
        name: "Hortalizas",
        value: data.ft_hortaliza || 0
      },
      {
        name: "Caña",
        value: data.ft_cana || 0
      },
      {
        name: "Plátano",
        value: data.ft_platano || 0
      },
      {
        name: "Frutales",
        value: data.ft_frutales || 0
      },
      {
        name: "Ganadería",
        value: data.ft_ganaderia || 0
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
          {((data.tl_500 && data.tl_500 > 0) || (data.tl_1000 && data.tl_1000 > 0)) ? 
          <Button
                        loading={this.state.loadingT} 
                        onClick={()=>{this.fetchTermos(data.gid)}}
                        style={{ margin: "0 10px 5px 0px", float: "right" }}
                        type="primary"
                        size="small"
                        shape="circle"
                        icon="bar-chart" >
                 
              </Button>:null}
          {((data.tl_500 && data.tl_500 > 0) || (data.tl_1000 && data.tl_1000 > 0)) ? 
                        <Button
                        onClick={() => {
                          this.addLayer(data);
                        }}
                        style={{ margin: "0 10px 5px 0px", float: "right" }}
                        type="primary"
                        size="small"
                        shape="circle"
                        icon="environment-o"
                      />
          :null}

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
      render: text => <strong>{text}</strong>,
    });  
      return data;
    } 


    const scale = {
      mes: { alias: "Mes" },
      cant: { alias: "Cantidad" }
    };

    Modal.info({
      width: "60%",
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

  showTermoModal = () => {
    let termos = this.state.termos;
    let termoName = this.state.termoName;
    const dataTable =()=>{
      let data=[];
      Object.keys(termos).map((element)=>{
        let aux = {
          "forma_prod_tributa":`${element}`,
          "enero":_.floor(termos[element]["Enero"], 2),
          "febrero":_.floor(termos[element]["Febrero"], 2),
          "marzo":_.floor(termos[element]["Marzo"], 2) ,
          "abril":_.floor(termos[element]["Abril"], 2) ,
          "mayo":_.floor(termos[element]["Mayo"], 2) ,
          "junio":_.floor(termos[element]["Junio"], 2) ,
          "julio":_.floor(termos[element]["Julio"], 2) ,
          "agosto":_.floor(termos[element]["Agosto"], 2) ,
          "septiembre":_.floor(termos[element]["Septiembre"], 2) ,
          "octubre":_.floor(termos[element]["Octubre"], 2) ,
          "noviembre":_.floor(termos[element]["Noviembre"], 2) ,
          "diciembre":_.floor(termos[element]["Diciembre"], 2) ,
          "productores":_.floor(termos[element]["cant_productores"], 2),
          "total":_.floor(termos[element]["total"], 2),
        };
        delete aux.um;
        data.push(aux)
      })
      return data;
    }

    const dataSource=(item) =>{
      let data = [];
      Object.keys(termos[item]).map((element)=>{
        if(element!=="total" && element!=="um"){
          let aux={
            cant: _.floor(termos[item][element], 2),
            mes: element
          }
          data.push(aux);
        }

      })
      return data;
    } 

    const columns=() =>{
      let data = [
      {  title: "Forma Productiva (L)",
        dataIndex: "forma_prod_tributa",
        key:"forma_prod_tributa",
        width: 150,
        fixed: 'left',
        render: text => <strong >{text}</strong>,
      }];    

      let key = Object.keys(termos)[0];
       Object.keys(termos[key]).map((element,index)=>{
         if(element!=="total" && element!=="um" && element!=="cant_productores"){
          let aux={
            title: element,
            dataIndex: element.toLowerCase(),
            key:element.toLowerCase(),
            width: 150
          }
          data.push(aux);
         }
      })
      data.push({  title: "Productores",
      dataIndex: "productores",
      key:"productores",
      width: 100,
      fixed: 'right',
      render: text => <strong>{text}</strong>,
    }); 
      data.push({  title: "Total",
      dataIndex: "total",
      key:"total",
      width: 100,
      fixed: 'right',
      render: text => <strong>{text}</strong>,
    });  
      return data;
    } 


    const scale = {
      mes: { alias: "Mes" },
      cant: { alias: "Cantidad" }
    };


    Modal.info({
      width: "60%",
      title: termoName,
      content: (
        <div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Total" key="1">
              <Table scroll={{ x: 2100, y: 500 }} pagination={false} columns={columns()} dataSource={dataTable()} />
            </TabPane>
            {Object.keys(termos).map((item,index)=>{
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
