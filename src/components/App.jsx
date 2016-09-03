'use strict';

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MarketViewer from './MarketViewerComponent.jsx';

class AppComponent extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <MarketViewer />
      </MuiThemeProvider>
    );
  }
}

export default AppComponent;
