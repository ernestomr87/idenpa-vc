import {BombeoImg} from './../components/Icons'
import OlStyle from "ol/style/style";
import OlStyleText from "ol/style/text";
import OlStyleFill from "ol/style/fill";
import OlStyleIcon from "ol/style/icon";

const globalStyles = {
    bombeo: function (feature) {
        feature.setStyle(
            new OlStyle({
                image: new OlStyleIcon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: BombeoImg
                }),
                text: new OlStyleText({
                    text: feature.get('nombre'),
                    font: 'bold 11px Arial',
                    fill: new OlStyleFill({
                        color: '000000'
                    }),
                    offsetX: 25,
                    offsetY: 4,
                    maxAngle: 90,
                    placement: 400
                })
            })
        );
    }
}
export default globalStyles;