'use strict';

import React from 'react';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MarketList from './List.jsx';
import MarketChart from './Chart.jsx';
import AppBar from 'material-ui/AppBar';

class MarketViewerComponent extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedMarket: {
        data: []
      },
      drawerOpen: true
    };
  }

  updateMarket(market) {
    this.setState({
      selectedMarket: market,
      drawerOpen: false
    });
  }

  toggleDrawerOpen() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  }

  render() {
    return (
      <div>
        <AppBar title="Market Viewer" onLeftIconButtonTouchTap={ () => this.toggleDrawerOpen() } />
        <Divider />
        <main>
          <Drawer className="drawer-wrapper" open={ this.state.drawerOpen } docked={ true }>
            <MarketList onMarketChange={ (market) => this.updateMarket(market) } />
          </Drawer>
          <MarketChart selectedMarket={ this.state.selectedMarket } />
        </main>
      </div>
    );
  }
}

export default MarketViewerComponent;