import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Register from './Register';
import Login from './Login';
import './Authentication.css';

const styles = {
  tabs: {
    marginTop: '120px',
    background: '#82babd',
    marginLeft: '30%',
    marginRight: '30%'
  },
  slide: {
    height: '120vh',
    color: '#000',
  },
};

class TabPanel extends React.Component {
  state = {
    index: 0,
  };

  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  render() {
    const {index} = this.state;

    return (
      <div>
        <Tabs value={index} variant ="fullWidth"  onChange={this.handleChange} style={styles.tabs}>
          <Tab style={{width: '100%', justify: 'center'}} label="Log In"/>
          <Tab style={{width: '100%', justify: 'center'}} label="Register" />
        </Tabs>
        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
          <div style={Object.assign({}, styles.slide, styles.slide1)}>
          <Login></Login>
          </div>

          <div style={Object.assign({}, styles.slide, styles.slide2)}>
           <Register></Register>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default TabPanel;
