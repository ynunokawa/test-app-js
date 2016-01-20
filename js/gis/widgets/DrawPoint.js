define([
	'dojo/_base/declare',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dijit/_WidgetsInTemplateMixin',
	'esri/layers/GraphicsLayer',
	'esri/Graphic',
	'esri/symbols/SimpleMarkerSymbol',
	'esri/symbols/SimpleLineSymbol',
	'dojo/_base/lang',
	'dojo/on',
	'dojo/text!./DrawPoint/templates/DrawPoint.html',
	'dojo/i18n!./DrawPoint/nls/resource',

	'dijit/form/Button',
	'dijit/form/RadioButton',
	'xstyle/css!./DrawPoint/css/DrawPoint.css'
], function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, GraphicsLayer, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, lang, on, drawPointTemplate, i18n) {
	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		widgetsInTemplate: true,
		templateString: drawPointTemplate,
		i18n: i18n,
		mapClickMode: null,

		postCreate: function () {
			this.inherited(arguments);

			this.graphicsLayer = new GraphicsLayer();
			this.map.add(this.graphicsLayer);

			this.markerSymbol = new SimpleMarkerSymbol({
				color: [226, 119, 40],
				outline: new SimpleLineSymbol({
					color: [255, 255, 255],
					width: 2
				}),
				style: 'circle'
			});
		},

		_drawPoint: function() {
			this.handle = on(this.view, 'click', lang.hitch(this, function(e){
				var graphic = new Graphic({
					geometry: e.mapPoint,
					symbol: this.markerSymbol
				});
				this.graphicsLayer.add(graphic);
			}));
		},

		_deletePoint: function() {
			this.handle.remove();
			this.graphicsLayer.clear();
		}
	});
});