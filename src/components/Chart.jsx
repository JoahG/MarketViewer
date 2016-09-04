'use strict';

import React from 'react';
import Chart from 'react-highcharts/bundle/ReactHighstock';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class MarketChartComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isEmpty: true,
      viewBy: 'hour',
      chartData: {
        ohlc: [],
        volume: []
      }
    }

    this.handleViewByChange = (e, i, v) => {
      this.setState({
        viewBy: v
      }, () => this.processData());
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isEmpty: false,
      isLoading: !nextProps.selectedMarket.dataIsLoaded
    });

    if (nextProps.selectedMarket.dataIsLoaded) {
      this.processData(nextProps.selectedMarket.data);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.viewBy !== nextState.viewBy) return true;
    if (JSON.stringify(this.state.chartData) !== JSON.stringify(nextState.chartData)) return true;
    if (!this.state.isLoading && this.props.selectedMarket.mkt_name == nextProps.selectedMarket.mkt_name) return false;
    if (!nextProps.selectedMarket.hasOwnProperty('mkt_name')) return false;
    return true;
  }

  processData(curData = this.props.selectedMarket.data) {
    let parent = this;

    let data = curData.reduce(function(u, n) {
      let date = new Date(n.time_local);

      if (parent.state.viewBy == 'hour') date.setMinutes(0);
      if (parent.state.viewBy == 'hour' || parent.state.viewBy == 'minute') date.setSeconds(0);
      
      date = (+date).toString();

      if (!u.hasOwnProperty(date)) u[date] = [];
      u[date].push(n);

      return u;
    }, {});

    let ohlc = Object.keys(data).map(function(key) {
      return [
        parseInt(key),
        parseFloat(data[key][0].price),
        (() => {
          return parseFloat(data[key].sort(function(a, b) {
            return parseFloat(b.price) - parseFloat(a.price);
          })[0].price);
        })(), 
        (() => {
          return parseFloat(data[key].sort(function(a, b) {
            return parseFloat(a.price) - parseFloat(b.price);
          })[0].price);
        })(), 
        parseFloat(data[key][data[key].length - 1].price)
      ];
    }).sort(function(a, b) {
      let _a = new Date(a[0]);
      let _b = new Date(b[0]);

      if (_a > _b) return 1;
      if (_a < _b) return -1;
      return 0;
    });;

    let volume = Object.keys(data).map(function(key) {
      return [
        parseInt(key),
        (() => {
          return data[key].reduce(function(i, b) {
            i += parseFloat(b.quantity);
            return i;
          }, 0);
        })()
      ];
    }).sort(function(a, b) {
      let _a = new Date(a[0]);
      let _b = new Date(b[0]);

      if (_a > _b) return 1;
      if (_a < _b) return -1;
      return 0;
    });

    this.setState({
      chartData: {
        ohlc: ohlc,
        volume: volume
      }
    });
  }

  render() {
    const chartConfig = {
      rangeSelector: {
        enabled: false
      },
      title: {
        text: ''
      },
      yAxis: [{
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'OHLC'
        },
        height: '60%',
        lineWidth: 2
      }, {
        labels: {
          align: 'right',
          x: -3
        }, 
        title: {
          text: 'Volume'
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
      }],

      series: [{
        type: 'candlestick',
        name: this.props.selectedMarket.mkt_name,
        data: this.state.chartData.ohlc,
        dataGrouping: {
          units: [[
            'hour',
            [1]
          ], [
            'month',
            [1, 2, 3, 4, 5, 6]
          ]]
        }
      }, {
        type: 'column',
        name: 'Volume',
        data: this.state.chartData.volume,
        yAxis: 1,
        dataGrouping: {
          units: [[
            'hour',
            [1]
          ], [
            'month',
            [1, 2, 3, 4, 5, 6]
          ]]
        }
      }]
    }

    return (
      <section className={ 'MarketChart' + (this.state.isLoading ? ' loading' : '') + (this.state.isEmpty ? ' empty' : '')}>
        <h2>{ this.props.selectedMarket.mkt_name }</h2>
        <SelectField value={ this.state.viewBy } onChange={ this.handleViewByChange } floatingLabelText="View By">
          <MenuItem value="hour" primaryText="Hours" />
          <MenuItem value="minute" primaryText="Minutes" />
          <MenuItem value="second" primaryText="Seconds" />
        </SelectField>
        <div className="chart-wrapper">
          <Chart config={ chartConfig } />
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