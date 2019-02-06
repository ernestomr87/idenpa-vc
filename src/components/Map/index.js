import React from "react";
import { Drawer, Table, Card } from "antd";
import styled from "styled-components";
import OlStyle from "ol/style/style";
import OlStyleText from "ol/style/text";
import OlStyleFill from "ol/style/fill";
import OlStyleStroke from "ol/style/stroke";

import OlInteractionSelect from "ol/interaction/select";
import {
  IrrigationImg,
  MoneyBagImg,
  TractorImg,
  CoastImg,
  CareImg,
} from "./../Icons";

import { MapComponent } from "@terrestris/react-geo";

import map, {
  addLayer,
  addLayerFromNode,
  listLayerByNode,
  changeMap,
  removeLayer,
  showLayerByCategory
} from "./utils";

import "ol/ol.css";
import Tools from "./../Tools/";
import Legend from "./../Legend";
import EntitiesInv from "./../EntitiesInv";
import CSSInfo from "./../Productive/CSSInfo";

import Modules, { getModelByJson } from "./../../data";
import SateliteImg from "./../Images/satelite.png";
import MapaImg from "./../Images/mapa.png";

import "./../../react-geo.css";

const Div = styled.div`
  height: 100vh;
`;

const MapWrapper = styled(MapComponent)`
  height: 100vh;
`;

const ImgInversion = styled.img`
  width: 25px;
  height: 25px;
  margin-top: -7px;
  margin-right: 10px;
`;

const TableWrapper = styled(Table)`
  tr > td {
    padding: 0px 0px !important;
  }
`;
const CardWrapper = styled(Card)`
  &.ant-card {
    position: absolute;
    bottom: 10px;
    right: 8px;
    width: 74px;
    height: 74px;
    padding: 0;
    margin: 0;
    cursor: pointer;
    background-image: ${props =>
      props.map !== 0 ? `url(${SateliteImg})` : `url(${MapaImg})`};
  }
`;

const pStyle = {
  fontWeight: 500,
  fontSize: 16,
  color: "rgba(0,0,0,0.85)",
  display: "block",
  fontFamily: `"Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
	"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif`
};

/* eslint-disable react/prefer-stateless-function */
class MapContainer extends React.Component {
  state = {
    test: "",
    layers: [],
    importants: [],
    model: {},
    module: null,
    visible: false,
    properties: null,
    interaction: null,
    typeMap: 0 //		0->normal map 1->satelite map
  };

  componentWillReceiveProps = nextProps => {
    const { layers, nodes, interaction } = nextProps;

    if (layers !== this.props.layers) {
      let array = [];
      let arrayN = [];
      Object.keys(layers).forEach(function(key) {
        if (Modules[key]) {
          layers[key].map(item => {
            const aux = Modules[key].filter(mitem => {
              if (mitem.name === item) return mitem;
            });
            array.push(aux[0]);
          });
        } else {
          layers[key].map(item => {
            nodes.map(node => {
              let nodelayers = listLayerByNode(node);
              const aux = nodelayers.filter(mitem => {
                if (!mitem.children && mitem.key === item) {
                  return mitem.layer;
                }
              });
              if (aux[0]) arrayN.push(aux[0]);
            });
          });
        }
      });

      if (array.length + arrayN.length > this.state.layers.length) {
        if (array.length) this.addLayer(array);
        if (arrayN.length) this.addLayerFromNode(arrayN);
      }
      if (array.length + arrayN.length < this.state.layers.length) {
        this.removeLayer(array, arrayN);
      }
    }

    if (interaction.data) {
      this.doAction(interaction);
    }
  };

  doAction = interaction => {
    if (interaction.name === "Polígonos de suelo afectado") {
      const important = this.state.importants.filter(
        item => item.name === interaction.name
      );
      let ol_uid = null;
      if (important.length && important[0].ol_uid) {
        ol_uid = important[0].ol_uid;
      }
      showLayerByCategory(ol_uid, interaction);
    }
  };

  changeState = (feature, model, select) => {
    const { interaction } = this.state;

    if (interaction) {
      interaction.clear();
    }
    this.setState({
      visible: true,
      properties: feature,
      model: model.nomenclature,
      dataLayer: { module: model.data.mod, layer: model.data.layer },
      interaction: select
    });
  };

  changeMap = () => {
    this.setState({ typeMap: changeMap() });
  };

  //oldLayers, importants
  addLayer = async array => {
    let result = await addLayer(array, this.state.layers);
    let importants = this.state.importants;
    if (result.important) {
      importants.push(result.important);
    }
    this.setState({ layers: result.oldLayers, importants: importants });
  };

  addLayerFromNode = array => {
    let result = addLayerFromNode(array, this.state.layers);
    this.setState({ layers: result });
  };

  removeLayer = (array, arrayN) => {
    this.setState({ layers: removeLayer(array, arrayN, this.state.layers) });
  };

  removeLayerTermo=()=>{
    const { layers, nodes, interaction } = this.props;

    let array = [];
    let arrayN = [];
    Object.keys(layers).forEach(function(key) {
      if (Modules[key]) {
        layers[key].map(item => {
          const aux = Modules[key].filter(mitem => {
            if (mitem.name === item) return mitem;
          });
          array.push(aux[0]);
        });
      } else {
        layers[key].map(item => {
          nodes.map(node => {
            let nodelayers = listLayerByNode(node);
            const aux = nodelayers.filter(mitem => {
              if (!mitem.children && mitem.key === item) {
                return mitem.layer;
              }
            });
            if (aux[0]) arrayN.push(aux[0]);
          });
        });
      }
    });

    if (array.length + arrayN.length > this.state.layers.length) {
      if (array.length) this.addLayer(array);
      if (arrayN.length) this.addLayerFromNode(arrayN);
    }
    if (array.length + arrayN.length < this.state.layers.length) {
      this.removeLayer(array, arrayN);
    }
  }

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    const { interaction } = this.state;
    interaction.clear();
    this.removeLayerTermo();
    this.setState({
      visible: false,
      interaction: null
    });
  };

  renderDataView = () => {
    const { model, properties, dataLayer } = this.state;

    const dataSource = [];
    const columns = [
      {
        dataIndex: "key",
        key: "key",
        render: text => {
          return <span style={{ color: "rgb(19, 116, 205)" }}>{text}</span>;
        }
      },
      {
        dataIndex: "value",
        key: "value"
      }
    ];

    if (model) {
      Object.keys(model).forEach(function(key, index) {
        if (properties[key]) {
          dataSource.push({ key: model[key], value: properties[key] });
        }
      });
    } else {
      Object.keys(properties).forEach(function(key, index) {
        if (properties[key] && !(properties[key] instanceof Object)) {
          dataSource.push({ key: key, value: properties[key] });
        }
      });
    }

    if (dataSource.length > 1) {
      return (
        <div>
          <p style={{ ...pStyle, marginBottom: 24 }}>
            {/* Muestro el Icono del modulo al que pertenece la Feature seleccionada */}
            {dataLayer.module === "irrigation" ? (
              <ImgInversion src={IrrigationImg} alt="" />
            ) : null}
            {dataLayer.module === "investments" ? (
              <ImgInversion src={MoneyBagImg} alt="" />
            ) : null}
            {dataLayer.module === "machinery" ? (
              <ImgInversion src={TractorImg} alt="" />
            ) : null}
            {dataLayer.module === "northCoast" ? (
              <ImgInversion src={CoastImg} alt="" />
            ) : null}
            {dataLayer.module === "lifeTask" ? (
              <ImgInversion src={CareImg} alt="" />
            ) : null}

            {dataLayer.module !== "estructuraAgricola" ? dataLayer.layer : null}
          </p>
          {dataLayer.module !== "estructuraAgricola" ?
          (
            <div>
              <TableWrapper
                pagination={false}
                showHeader={false}
                dataSource={dataSource}
                columns={columns}
              />
              {dataLayer && dataLayer.layer === "Entidades Inversionistas" ? (
                <EntitiesInv
                  model={model}
                  properties={properties}
                  dataLayer={dataLayer}
                />
              ) : null}
            </div>
          ) : <CSSInfo dataSource={dataSource} oldLayers={this.state.layers} removeLayerTermo={this.removeLayerTermo}/>}

        </div>
      );
    }
  };

  render() {
    const _this = this;
    const select = new OlInteractionSelect();
    map.addInteraction(select);
    const selectedfeatures = select.getFeatures();


    selectedfeatures.on(["add", "remove"], evt => {
      selectedfeatures.getArray().map(feature => {
        let selectedLayer = select.getLayer(feature);
        if (selectedLayer && selectedLayer.getSource().url_) {
          const model = getModelByJson(selectedLayer.getSource().url_);
          _this.changeState(feature.getProperties(), model, selectedfeatures);
        }
      });
    });

    return (
      <Div>
        <MapWrapper map={map} />
        <div id="popup" className="ol-popup">
          <a href="#" id="popup-closer" className="ol-popup-closer" />
          <div id="popup-content" />
        </div>
        <Tools map={map} drawer={this.props.drawer.toString()} />
        <Legend layers={this.state.layers} drawer={this.props.drawer} />
        <CardWrapper
          map={this.state.typeMap}
          onClick={this.changeMap}
          style={{ boxShadow: "0 2px 8px #f0f1f2" }}
        />
        {this.state.model || this.state.properties ? (
          <Drawer
            width={350}
            placement="right"
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
            mask={false}
          >
            {this.renderDataView()}
          </Drawer>
        ) : null}
      </Div>
    );
  }
}

MapContainer.defaultProps = {
  layers: [],
  nodes: [],
  drawer: false
};

export default MapContainer;
