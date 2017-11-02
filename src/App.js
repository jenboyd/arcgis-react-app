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
        {label: '20s', layerID: 7},
        {label: '30s', layerID: 6},
        {label: '40s', layerID: 5},
        {label: '50s', layerID: 4},
        {label: '60s', layerID: 3},
        {label: '70s', layerID: 2},
        {label: '80s', layerID: 1},
        {label: 'Average Age', layerID: 0}
      ]
    };
  }

  componentDidMount() {
    if (!this.props.mapCtrl) {
      this.props.createMap(this.refs.mapView, 0);
    }
  }

  render() {

    const filters = this.state.filters.map((filter) => {
      return(<button onClick={() => this.props.createMap(this.refs.mapView, filter.layerID)}>{filter.label}</button>)
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
    createMap: (domNode, layerID) => {
      dispatch(createMap(domNode, layerID))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
