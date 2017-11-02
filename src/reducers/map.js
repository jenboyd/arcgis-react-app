import MapView from 'esri/views/MapView';
import EsriMap from 'esri/Map';
import FeatureLayer from 'esri/layers/FeatureLayer';
import Legend from 'esri/widgets/Legend';

const map = (state = { }, action) => {

  switch (action.type) {

    case 'CREATE_MAP':
      const map = new EsriMap({
        basemap: 'gray-vector'
      });

      let popupTemplate = {
        title: "<p>{STATE_NAME}</p>",
        content: "<p>Total Veterans: {Grand_Tota}" + "<p>Average Age: {Average_ag}</p>",
        fieldInfos: [
          {
            fieldName: "Grand_Tota",
            format: {
              digitSeparator: true,
              places: 0
            }
          }
        ]
      };

      let featureLayer = new FeatureLayer({
        url: "http://maps7.arcgisonline.com/arcgis/rest/services/Veterans_by_Age/MapServer/",
        layerId: action.layerID,
        outFields: ["*"],
        popupTemplate,
      });
      map.add(featureLayer);


      let view = new MapView({
        container: action.domNode,
        map,
        zoom: 3.5,
        center: [270, 45]
      })

      let legend = new Legend({
        view: view,
        layerInfos: [{
          layer: featureLayer,
          title: "Legend"
        }]
      });

      view.ui.add(legend, "bottom-right");

      return {
        mapCtrl: view,
      };

    default:
      return state
  }
}

export default map;
