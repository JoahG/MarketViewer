'use strict';

import React from 'react';
import { LineChart } from 'rd3';

class MarketChartComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isEmpty: true,
      chartConfig: {
        title: this.props.selectedMarket.mkt_name,
        width: 800,
        height: 500,
        data: [{
          name: 'series 1',
          values: [{x: 0, y: 0}]
        }]
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isEmpty: false,
      isLoading: !nextProps.selectedMarket.dataIsLoaded,
      chartConfig: {
        title: nextProps.selectedMarket.mkt_name,
        width: this.refs["chart-wrapper"].offsetWidth,
        height: this.refs["chart-wrapper"].offsetHeight,
        data: [{
          name: 'series 1',
          values: nextProps.selectedMarket.data.map(function(dataPoint) {
            return {
              y: parseFloat(dataPoint.price),
              x: dataPoint.time_local
            };
          })
        }]
      }
    });
  }

  render() {
    return (
      <section className={ 'MarketChart' + (this.state.isLoading ? ' loading' : '') + (this.state.isEmpty ? ' empty' : '')}>
        <div ref="chart-wrapper" className="chart-wrapper">
          <LineChart 
            width={ this.state.chartConfig.width }
            height={ this.state.chartConfig.height }
            data={ this.state.chartConfig.data } 
            xAxisTickInterval={ { unit: 'hour', interval: 1 } } 
            xAccessor={ (d) => {
              return new Date(d.x);
            }}
            yAccessor={ (d) => d.y}
            margins={ {
              top: 20,
              right: 30,
              bottom: 50,
              left: 75
            } }
          />
        </div>
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