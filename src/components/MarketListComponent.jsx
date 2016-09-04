'use strict';

import React from 'react';
import ApiRequest from '../helpers/ApiHelper';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import InputIcon from 'material-ui/svg-icons/action/input'

class MarketListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exchanges: []
    };
  }

  componentWillMount() {
    let parent = this;

    new ApiRequest('exchanges', function() {
      parent.setState({
        exchanges: JSON.parse(this.responseText).data.map(function(exchange) {
          exchange.markets = [];
          exchange.isOpen = false;
          exchange.marketsLoaded = false;
          return exchange;
        })
      });
    });
  }

  loadMarkets(exchange) {
    let temp_exchanges = this.state.exchanges;

    let exch = temp_exchanges.find(function(exch) {
      return exchange.exch_code == exch.exch_code;
    });

    exch.isOpen = !exch.isOpen;

    this.setState({
      exchanges: temp_exchanges
    });

    if (exch.isOpen && !exch.marketsLoaded) {
      let parent = this;

      new ApiRequest('markets', function() {
        exch.markets = JSON.parse(this.responseText).data.map(function(market) {
          market.dataIsLoaded = false;
          market.data = [];
          return market;
        });
        exch.marketsLoaded = true;

        parent.setState({
          exchanges: temp_exchanges
        });
      }, {
        exchange_code: exch.exch_code
      });
    }
  }

  updateActiveMarket(market, exchange) {
    this.props.onMarketChange(market);

    if (!market.dataIsLoaded) {
      let parent = this;

      let temp_exchanges = this.state.exchanges;

      let exch = temp_exchanges.find(function(exch) {
        return exchange.exch_code == exch.exch_code;
      });

      let mkt = exch.markets.find(function(mkt) {
        return market.mkt_id == mkt.mkt_id
      });

      new ApiRequest('data', function() {
        mkt.data = JSON.parse(this.responseText).data.history;
        mkt.dataIsLoaded = true;

        parent.props.onMarketChange(mkt);

        parent.setState({
          exchanges: temp_exchanges
        });
      }, {
        exchange_code: market.exch_code,
        exchange_market: market.mkt_name,
        type: 'history'
      });
    }
  }

  render() {
    let parent = this;

    return (
      <aside className="MarketList">
        <List>
          {
            this.state.exchanges.map(function(exchange, i) {
              let markets = exchange.markets.map(function(market, i) {
                return <ListItem key={ 'market' + i } primaryText={ market.mkt_name } rightIcon={ <InputIcon /> } onTouchTap={ () => parent.updateActiveMarket(market, exchange) } />
              });

              if (markets.length == 0) {
                markets.push(
                  <ListItem key={ 'loading...' } primaryText="Loading..." />
                );
              }

              return (
                <ListItem key={ i } open={ exchange.isOpen } onNestedListToggle={ () => parent.loadMarkets(exchange) } primaryText={ exchange.exch_name } primaryTogglesNestedList={ true } nestedItems={ markets }/>
              );
            })
          }
        </List>
      </aside>
    );
  }
}

MarketListComponent.displayName = 'MarketListComponent';

export default MarketListComponent;
