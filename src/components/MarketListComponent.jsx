'use strict';

import React from 'react';
import ApiRequest from '../helpers/ApiHelper';

class MarketViewerComponent extends React.Component {
  componentWillMount() {
    new ApiRequest('exchanges', function(d, e) {
      console.log(d, e);
    });
  }

  render() {
    return (
      <div className="MarketViewer-component">
        {}
      </div>
    );
  }
}

MarketViewerComponent.displayName = 'MarketViewerComponent';

// Uncomment properties you need
// MarketViewerComponent.propTypes = {};
// MarketViewerComponent.defaultProps = {};

export default MarketViewerComponent;
