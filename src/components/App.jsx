'use strict';

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import View from './View.jsx';

class AppComponent extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <View />
      </MuiThemeProvider>
    );
  }
}

export default AppComponent;
