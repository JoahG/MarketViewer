import React from 'react';
import MarketViewer from './MarketViewerComponent.jsx';

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <h1> Market List </h1>
        <MarketViewer />
      </div>
    );
  }
}

export default AppComponent;
