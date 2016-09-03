'use strict';

import React from 'react';
import ReactHighcharts from 'react-highcharts';

const hcConfig = {
  /* highcharts config */
};

class MarketChartComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isEmpty: true
    }
  }

  componentWillUpdate() {

  }

  render() {
    return (
      <section className={ 'MarketChart' + (this.state.isLoading ? ' loading' : '') + (this.state.isEmpty ? ' empty' : '')}>
        <ReactHighcharts config={ hcConfig } ref="chart" />
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