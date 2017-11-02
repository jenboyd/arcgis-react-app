import MapView from 'esri/views/MapView';
import EsriMap from 'esri/Map';
import FeatureLayer from 'esri/layers/FeatureLayer';

const map = (state = { }, action) => {

  switch (action.type) {
    case 'CREATE_MAP':

      const map = new EsriMap({
        basemap: 'gray-vector'
      });

      let popupTemplate = {
        title: "<p>{STATE_NAME}</p>",
        content: "<p>Total Veterans: {Grand_Tota}" + "<p>Average Age: {Average_ag}</p>"
       };

      let fl = new FeatureLayer({
        url: "http://maps7.arcgisonline.com/arcgis/rest/services/Veterans_by_Age/MapServer/",
        layerId: 6,
        outFields: ["*"],
        popupTemplate: popupTemplate
      });

      map.add(fl);

      return {
        mapCtrl: new MapView({
          container: action.domNode,
          map,
          zoom: 3.5,
          center: [270, 45]
        })
      }

    default:
      return state
  }
}

export default map;
