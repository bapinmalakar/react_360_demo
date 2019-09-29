import React from 'react';
import { Environment, asset } from 'react-360';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton
} from 'react-360';

export default class react_360_demo extends React.Component {
  backgroundImages = ['./360_world.jpg', './react_360_back.jpg']; 
  nextImage = 0;
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  componentDidMount() {
    console.log('Mount called');
  }

  updateCounter = () => {
    this.setState({ counter: this.state.counter + 1 })
  }

  changeBacground() {
    this.nextImage += 1;
    Environment.setBackgroundImage(asset(this.backgroundImages[this.nextImage % 2]), { formt: '2D' }); // accept image from static_asset
  }

  render() {
    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <VrButton onClick={() => this.updateCounter()} style={styles.greetingBox}>
            <Text style={styles.greeting}>
              {'Counter Value is: ' + this.state.counter}
            </Text>
          </VrButton>
          <VrButton onClick={() => this.changeBacground()} style={styles.greetingBox}>
            <Text style={styles.greeting}>
              Next Backgroun
            </Text>
          </VrButton>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('react_360_demo', () => react_360_demo);
