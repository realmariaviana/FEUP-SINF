import React from 'react';
import TabPanelAuthentication from './TabPanel';
//import '../../../../css/Authentication.css';

class Authentication extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="content-container">
        <TabPanelAuthentication />
      </div>
    );
  }
}

export default Authentication;
