import { BombeoImg } from './../components/Icons';
import OlStyle from 'ol/style/style';
import OlStyleText from 'ol/style/text';
import OlStyleFill from 'ol/style/fill';
import OlStyleIcon from 'ol/style/icon';
import OlStyleStroke from 'ol/style/stroke';

var style = new OlStyle({
	fill: new OlStyleFill({
		color: '',
		opacity: null,
		width: ''
	}),
	stroke: new OlStyleStroke({
		color: '',
		width: null,
		lineJoin: '',
		lineCap: '',
		stroke: new OlStyleStroke({
			color: '',
			width: null,
			lineJoin: '',
			lineCap: ''
		})
	}),
	text: new OlStyleText({
		font: '',
		fill: new OlStyleFill({
			color: ''
		}),
		text: '',
		maxAngle: null,
		placement: null,
		textBaseline: '',
		overflow: null
	})
});

const globalStyles = {
	micropresas: function(feature) {
		style.getFill().setColor('#11f5f5');

		style.getText().setText(feature.get('nombre'));
		style.getText().getFill().setColor('#000000');
		style.getText().setFont('bold 11px Arial');

		style.getStroke().setColor('#000001');
		style.getStroke().setWidth(1);
		style.getStroke().setLineJoin('bevel');
		style.getStroke().setLineCap('square');

		return style;
	},
	enrolladores: function(feature) {
		style.getFill().setColor('#4d9e68');

		style.getText().setText(feature.get('nombre'));
		style.getText().getFill().setColor('#000000');
		style.getText().setFont('bold 11px Arial');

		style.getStroke().setColor('#000001');
		style.getStroke().setWidth(1);
		style.getStroke().setLineJoin('bevel');
		style.getStroke().setLineCap('square');

		return style;
	},
	canalesvertedores: function(feature) {
		style.getText().setText(feature.get('nombre'));

		style.getText().getFill().setColor('#000000');

		style.getText().setFont('bold 11px Arial');

		style.getStroke().setColor('#06c5a5');
		style.getStroke().setWidth(1);
		style.getStroke().setLineJoin('bevel');
		style.getStroke().setLineCap('square');

		return style;
	},
	canalessecundariosderiego: function(feature) {
		style.getText().setText(feature.get('nombre'));

		style.getText().getFill().setColor('#000000');

		style.getText().setFont('bold 11px Arial');

		style.getStroke().setColor('#618dfb');
		style.getStroke().setWidth(1);
		style.getStroke().setLineJoin('bevel');
		style.getStroke().setLineCap('square');

		return style;
	},
	canalescolectores: function(feature) {
		style.getText().setText(feature.get('nombre'));

		style.getText().getFill().setColor('#000000');

		style.getText().setMaxAngle(90);
		style.getText().setPlacement(400);
		style.getText().setFont('bold 11px Arial');

		style.getStroke().setColor('#06c5a5');
		style.getStroke().setWidth(2);
		style.getStroke().setLineJoin('bevel');
		style.getStroke().setLineCap('square');

		return style;
	},
	canalesmagistrales: function(feature) {
		style.getFill().setColor('#d40909');

		style.getText().setText(feature.get('nombre'));
		style.getText().getFill().setColor('#000000');
		style.getText().setMaxAngle(90);
		style.getText().setPlacement(400);
		style.getText().setFont('bold 11px Arial');

		style.getStroke().setColor('#6699FF');
		style.getStroke().setWidth(5);
		style.getStroke().setLineJoin('bevel');
		style.getStroke().setLineCap('round');

		return style;
	},
	riegoporgoteo: function(feature) {
		style.getText().setText(feature.get('nombre'));
		style.getText().getFill().setColor('#000000');
		style.getText().setMaxAngle(90);
		style.getText().setPlacement(400);
		style.getText().setFont('bold 11px Arial');

		style.getStroke().setColor('#black');
		style.getStroke().setWidth(2);
		style.getStroke().setLineJoin('bevel');
		style.getStroke().setLineCap('round');

		if (feature.get('actual') === 'si') {
			style.getFill().setColor('#aa0041');
		} else {
			if (feature.get('actual') === 'no') {
				style.getFill().setColor('#f800a65');
			}
		}

		return style;
	},
	estacionesdebombeo: function(feature) {
		feature.setStyle(
			new OlStyle({
				image: new OlStyleIcon({
					anchor: [ 0.5, 46 ],
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
	},
	maquinaspivot: function(feature) {
		if (feature.get('exist') === 'actual') {
			style.getFill().setColor('#FFEB00');
		} else {
			style.getFill().setColor('#F5A00C');
		}
		style.getStroke().setColor('black');
		style.getStroke().setWidth(2);

		return style;
	},
	canalesprimariosderiego: function(feature) {
		style.getText().setText(feature.get('nombre'));
		style.getText().getFill().setColor('#000000');
		style.getText().setFont('bold 11px Arial');

		style.getStroke().setColor('#618dfb');
		style.getStroke().setWidth(2);
		style.getStroke().setLineJoin('round');
		style.getStroke().setLineCap('round');

		style.getFill().setColor('#333333');

		return style;
	}
};
export default globalStyles;
