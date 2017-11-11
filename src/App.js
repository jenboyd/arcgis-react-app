import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { createMap } from './actions/map';
import { Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [
        {label: '20s', layerID: 7, key: 's'},
        {label: '30s', layerID: 6, key: 's_1'},
        {label: '40s', layerID: 5, key: 's_12'},
        {label: '50s', layerID: 4, key: 's_12_13'},
        {label: '60s', layerID: 3, key: 's_12_13_14'},
        {label: '70s', layerID: 2, key: 's_12_13_14_15'},
        {label: '80s', layerID: 1, key: 's_12_13_14_15_16'},
        {label: 'Average Age', layerID: 0, key: 'Average_ag', checked: true}
      ]
    };
  }

  componentDidMount() {
    if (!this.props.mapCtrl) {
      this.props.createMap(this.refs.mapView, this.state.filters[this.state.filters.length - 1]);
    }
  }

  updateFilter(selFilter) {
    if (selFilter.checked) { return }

     // Update state to reflect filter selection
    const filters = this.state.filters
    filters.forEach((f) => {
      f.checked = selFilter.layerID === f.layerID
    })
    this.setState({ filters })

    this.props.mapCtrl.allLayers.forEach(function(layer) {
      if(layer.type !== 'vector-tile' && layer.id !== 'veteranCenters' && layer.visible) {
        layer.visible = false;
      } else if (layer.layerId === selFilter.layerID) {
        layer.visible = true;
      }
    });
  }

  render() {

    const filters = this.state.filters.map((filter) => {
      return(<button className={filter.checked ? 'checked' : ''} onClick={() => this.updateFilter(filter)}>{filter.label}</button>)
    })

    return (
      <div className="App">
        <div className='filters'>{filters}</div>
        <div ref='mapView' className='map-view'></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mapCtrl: state.map.mapCtrl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMap: (domNode, filter) => {
      dispatch(createMap(domNode, filter))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
