import React from 'react';
import { Environment, asset, staticAssetURL } from 'react-360';
import VideoModule from 'VideoModule';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  VideoPano
} from 'react-360';


export default class react_360_demo extends React.Component {
  backgroundImages = ['./360_world.jpg', './react_360_back.jpg'];
  newScreen = false;
  nextImage = 0;
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      playOnScreen: false
    };
  }

  componentDidMount() {
    console.log('Mount called');
    // setTimeout(() => this.setVideoBackground(), 2000);
  }

  setVideoBackground() {
    console.log('Video player called');
    const myPlayer = VideoModule.createPlayer('myplayer');
    myPlayer.play({ source: { url: staticAssetURL('video_player_demo.mp4') }, stereo: '2D' });
    myPlayer.setMuted(false); // false mutaed
    console.log(myPlayer);
    Environment.setBackgroundVideo('myplayer', { volume: 0.8 });
    console.log('Video player called');
  }

  screenVideo() {
    const myPlayer = VideoModule.createPlayer('myplayer');
    myPlayer.play({ source: { url: staticAssetURL('video_player_demo.mp4') }, stereo: '2D' });
    myPlayer.setMuted(false); // false mutaed
    Environment.setScreen('default', /* screen name */
      'myplayer', /* player unique id */
      'default', /* surface name */
      0, 0, 600, 400 /* relative position on the surface */
    )
  }

  updateCounter = () => {
    this.setState({ counter: this.state.counter + 1 })
  }

  changeBacground() {
    this.nextImage += 1;
    Environment.setBackgroundImage(asset(this.backgroundImages[this.nextImage % 2]), { formt: '2D' }); // accept image from static_asset
  }

  playVideoInSeperateScreen() {
    this.setState({}, this.state, {playOnScreen: true});
    console.log('This. state: ', this.state);
  }

  render() {
    return (
      <View style={styles.panel}>
        {!this.state.playOnScreen ?
          (<View style={styles.greetingBox}>
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
            <VrButton onClick={() => this.setVideoBackground()} style={styles.greetingBox}>
              <Text style={styles.greeting}>
                Set video Background
             </Text>
            </VrButton>
            <VrButton onClick={() => this.screenVideo()} style={styles.greetingBox}>
              <Text style={styles.greeting}>
                Play video
             </Text>
            </VrButton>
            <VrButton onClick={() => this.playVideoInSeperateScreen()} style={styles.greetingBox}>
              <Text style={styles.greeting}>
                Play In screen
             </Text>
            </VrButton>
          </View>) : (<View>
            <VideoPano
              source={{ uri: staticAssetURL('video_player_demo.mp4'),stereo: '2D' }}
              style={{
                width: 600,
                height: 400,
              }}>
            </VideoPano>
          </View>)}
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
