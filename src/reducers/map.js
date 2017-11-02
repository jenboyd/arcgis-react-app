import MapView from 'esri/views/MapView';
import EsriMap from 'esri/Map';
import FeatureLayer from 'esri/layers/FeatureLayer';
import Legend from 'esri/widgets/Legend';
import LayerList from 'esri/widgets/LayerList';

const map = (state = { }, action) => {

  switch (action.type) {

    case 'CREATE_MAP':
      const popupTemplate = {
          title: "<p>{STATE_NAME}</p>",
          content: "<p>Total Veterans: {Grand_Tota}" +
          `<p>${action.filter.label === 'Average Age' ?
            'Average Age' : 'Total Veterans in their' + action.filter.label}: {${action.filter.key}}`,
          fieldInfos: [
            {
              fieldName: "Grand_Tota",
              format: {
                digitSeparator: true,
                places: 0
              }
            },
            {
              fieldName: action.filter.key,
              format: {
                digitSeparator: true,
                places: 0
              }
            }
          ]
      };

      let featureLayer = new FeatureLayer({
        url: "http://maps7.arcgisonline.com/arcgis/rest/services/Veterans_by_Age/MapServer/",
        layerId: action.filter.layerID,
        outFields: ["*"],
        popupTemplate: popupTemplate
      });

      const map = new EsriMap({
        basemap: 'gray-vector',
        layers: [ featureLayer ]
      });


      let view = new MapView({
        container: action.domNode,
        map,
        zoom: 4,
        center: [265, 38]
      })

      let legend = new Legend({
        view: view,
        layerInfos: [
          {
            layer: featureLayer,
            title: "Legend"
          }
        ]
      });

      view.ui.add(legend, "bottom-right");

      let layerList = new LayerList({
        view: view
      });
      view.ui.add(layerList, { position: "top-right" });

      return {
        mapCtrl: view,
      };

    default:
      return state
  }
}

export default map;
