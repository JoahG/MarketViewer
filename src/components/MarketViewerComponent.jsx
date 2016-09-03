'use strict';

import React from 'react';
import Divider from 'material-ui/Divider';
import MarketList from './MarketListComponent.jsx';
import MarketChart from './MarketChartComponent.jsx';
import RaisedButton from 'material-ui/RaisedButton';

class MarketViewerComponent extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedMarket: {
        data: []
      }
    };
  }

  updateMarket(market) {
    this.setState({
      selectedMarket: market
    });
  }

  render() {
    return (
      <div>
        <header><h1> Market Viewer </h1></header>
        <Divider />
        <main>
          <MarketList onMarketChange={ (market) => this.updateMarket(market) } />
          <MarketChart selectedMarket={ this.state.selectedMarket } />
        </main>
      </div>
    );
  }
}

export default MarketViewerComponent;