import OlStroke from "ol/style/stroke";
import OlFill from "ol/style/fill";
import OlStyle from "ol/style/style";
import OlText from "ol/style/text";

var colorSueloAfectado = {
  I: "#ee9144",
  II: "#9ba011",
  III: "#1fb07b",
  IV: "#a840b3"
};

const categoryToRoman = cat => {
  var categoryToNumber = parseFloat(cat);
  if (categoryToNumber < 2) return "I";
  else if (categoryToNumber < 3) return "II";
  else if (categoryToNumber < 3.7) return "III";
  return "IV";
};

var style = new OlStyle({
  fill: new OlFill({
    color: "rgba(255, 255, 255, 0.6)"
  }),
  stroke: new OlStroke({
    color: "#319FD3",
    width: 1
  }),
  text: new OlText({
    font: "12px Calibri,sans-serif",
    fill: new OlFill({
      color: "#000"
    }),
    stroke: new OlStroke({
      color: "#fff",
      width: 3
    })
  })
});
export default [
  {
    name: "Polígonos de suelo afectado",
    nomenclature: null,
    style: function(feature) {
      var color =
        colorSueloAfectado[categoryToRoman(feature.get("cat_gral10_cult"))];

      style.getFill().setColor(color);
      style.getStroke().setColor("#777777");
      style.getText().setText(feature.get("tipos"));

      if (feature.get("hoverStyle")) {
        style.getStroke().setWidth(2);
        style.getStroke().setColor("#000000");
      }

      return style;
    },
    json:
      "http://geoservicios.enpa.vcl.minag.cu/geoserver/dbtarea_vida/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dbtarea_vida:suelo_afectado_inap&outputFormat=application%2Fjson"
  },
  {
    name: "Parcelas agrícolas afectadas",
    nomenclature: "nomenclatureMicropresas",
    json:
      "http://geoservicios.enpa.vcl.minag.cu/geoserver/dbtarea_vida/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dbtarea_vida:parcela_agricola_afectada_inap&outputFormat=application%2Fjson"
  },
  {
    name: "Ascenso del nivel medio del mar",
    nomenclature: "nomenclatureMicropresas",
    json:
      "http://geoservicios.enpa.vcl.minag.cu/geoserver/dbtarea_vida/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dbtarea_vida:ascenso_nmm_inap&outputFormat=application%2Fjson"
  },
  {
    name: "Área de intrusión marina",
    nomenclature: "nomenclatureMicropresas",
    json:
      "http://geoservicios.enpa.vcl.minag.cu/geoserver/dbtarea_vida/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dbtarea_vida:area_intrusion_marina_inap&maxFeatures=50&outputFormat=application%2Fjson"
  }
];

/*
dbtarea_vida
user: root
password: root 
[10:41 AM] GEOMATICA-1:
host: 192.168.0.11
*/
