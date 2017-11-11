import MapView from 'esri/views/MapView';
import EsriMap from 'esri/Map';
import FeatureLayer from 'esri/layers/FeatureLayer';
import Legend from 'esri/widgets/Legend';
import LayerList from 'esri/widgets/LayerList';

const map = (state = { }, action) => {

  switch (action.type) {

    case 'CREATE_MAP':

      // Create templates for popups for each map layer
      const ageTemplate = {
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

      const centerTemplate = {
          title: "<p>{NAME}</p>",
          content: "<p>{ADDRESS}</p>" +
            "<p>{CITY}, {STATE}, {ZIP}</p>"
      };


      // Define specific styles for the veteranCenters layer
      let centersRenderer = {
        type: "simple",
        symbol: {
          type: "simple-marker",
          size: 8,
          color: [ 19, 199, 255, 0.5 ],
          outline: {
            width: 0.5,
            color: "grey"
          }
        }
      };

      const featureLayerArray = [0, 1, 2, 3, 4, 5, 6, 7].map( (id) => {
        return new FeatureLayer({
          url: "http://maps7.arcgisonline.com/arcgis/rest/services/Veterans_by_Age/MapServer/",
          layerId: id,
          visible: id === action.filter.layerID,
          outFields: ["*"],
          popupTemplate: ageTemplate
        });
      })

      let veteranCenters = new FeatureLayer({
        url: "https://services2.arcgis.com/1cdV1mIckpAyI7Wo/arcgis/rest/services/Veterans_Health_Administration_Medical_Facilities/FeatureServer/0/query?outFields=*&where=1%3D1",
        outFields: ["*"],
        id: 'veteranCenters',
        renderer: centersRenderer,
        popupTemplate: centerTemplate
      });

      featureLayerArray.push(veteranCenters)

      // Create map and map view
      const map = new EsriMap({
        basemap: 'gray-vector',
        layers: featureLayerArray
      });


      let view = new MapView({
        container: action.domNode,
        map,
        zoom: 4,
        center: [265, 38]
      })

      // Add legend and layers list wigets to map
      let legend = new Legend({
        view: view,
      });
      view.ui.add(legend, "bottom-right");

      return {
        mapCtrl: map,
      };

    default:
      return state
  }
}

export default map;
