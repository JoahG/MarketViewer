'use strict';

import React from 'react';
import Chart from //?;
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

  processData(curData = this.props.selectedMarket.data) {
    let parent = this;

    let data = curData.reduce(function(u, n) {
      let date = new Date(n.time_local);

      if (parent.state.viewBy == 'hour') date.setMinutes(0);

      date.setSeconds(0);
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
            let _a = parseFloat(a.price);
            let _b = parseFloat(b.price);

            if (_a < _b) return 1;
            if (_a > _b) return -1;
            return 0;
          })[0].price);
        })(), 
        (() => {
          return parseFloat(data[key].sort(function(a, b) {
            let _a = parseFloat(a.price);
            let _b = parseFloat(b.price);

            if (_a > _b) return 1;
            if (_a < _b) return -1;
            return 0;
          })[0].price);
        })(), 
        parseFloat(data[key][data[key].length - 1].price)
      ];
    });

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
        selected: 1,
      },
      title: {
        text: this.props.selectedMarket.mkt_name
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
        </SelectField>
        <div>
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