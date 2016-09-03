import React from 'react';
import MarketList from './MarketListComponent.jsx';

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <h1> Market List </h1>
        <MarketList />
      </div>
    );
  }
}

export default AppComponent;
