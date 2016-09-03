'use strict';

import React from 'react';
import { ScatterChart } from 'rd3';

class MarketChartComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isEmpty: true,
      chartConfig: {
        title: this.props.selectedMarket.mkt_name
      }
    }
  }

  componentWillUpdate(nextProps) {
    this.setState({
      isEmpty: false,
      isLoading: !nextProps.selectedMarket.dataIsLoaded,
      chartConfig: {
        title: nextProps.selectedMarket.mkt_name
      }
    });
  }

  render() {
    return (
      <section className={ 'MarketChart' + (this.state.isLoading ? ' loading' : '') + (this.state.isEmpty ? ' empty' : '')}>
        
      </section>
    );
  }
}

MarketChartComponent.propTypes = {
  selectedMarket: React.PropTypes.shape({
    exch_id: React.PropTypes.string,
    exch_name: React.PropTypes.string,
    exch_code: React.PropTypes.string,
    mkt_id: React.PropTypes.string,
    mkt_name: React.PropTypes.string,
    exchmkt_id: React.PropTypes.string,
    data: React.PropTypes.array
  })
};

export default MarketChartComponent;