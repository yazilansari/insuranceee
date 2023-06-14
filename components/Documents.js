import React, { Component } from "react";
import { TouchableOpacity, View, ImageBackground, ActivityIndicator, StyleSheet } from "react-native";
import { RNCamera as Camera } from "react-native-camera";
// import RNTextDetector from "react-native-text-detector";
import { Container, Header, Content, List, ListItem, Text, Card, CardItem, Footer, FooterTab, Button, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import StepIndicator from 'react-native-step-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from 'react-native-i18n';

import style, { screenHeight, screenWidth } from "./styles";
// import DocumentDetails from "./DocumentDetails";

const PICTURE_OPTIONS = {
  quality: 0.5,
  // fixOrientation: true,
  // forceUpOrientation: true
  base64: true
};

/*const labels = ["Mulkiya", "Emirates Id", "License", "Car Photos"];
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}*/

 I18n.fallbacks = true;
  I18n.translations = {
    'en': require('./translations/en'),
    'ar': require('./translations/ar'),
  }

export default class Documents extends React.Component {
  state = {
    loading: false,
    image: null,
    error: null,
    // visionResp: [],
    // currentPosition: 3
  };

  /**
   * reset
   *
   * Handles error situation at any stage of the process
   *
   * @param {string} [error="OTHER"]
   * @memberof App
   */
  reset(error = "OTHER") {
    this.setState(
      {
        loading: false,
        image: null,
        error,
        // currentPosition: 3
      },
      () => {
        // setTimeout(() => this.camera.startPreview(), 500);
      }
    );
  }

  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener('focus', () => {
      this.setState({ value: true });
    });
  }

  /**
   * takePicture
   *
   * Responsible for getting image from react native camera and
   * starting image processing.
   *
   * @param {*} camera
   * @author Zain Sajjad
   */
  takePicture = async camera => {
    // this.setState({
    //   ...this.state,
    //   loading: true
    // });
    try {
      const data = await camera.takePictureAsync(PICTURE_OPTIONS);
      if (!data.uri) {
        throw "OTHER";
      }
      this.setState(
        {
          ...this.state,
          image: data.uri,
          image_base64: data.base64
        },
        () => {
          // console.log('Car Photos===', data);
          this.props.navigation.navigate('Document Details', {
            image: this.state.image,
            image_base64: this.state.image_base64
          });
          // this.processImage(data.uri, {
          //   height: data.height,
          //   width: data.width
          // });
          // this.setState({
          //   loading: false
          // });
        }
      );
        /*const car_photo1 = await AsyncStorage.getItem('car_photo1');
        const car_photo2 = await AsyncStorage.getItem('car_photo2');
        const car_photo3 = await AsyncStorage.getItem('car_photo3');
        const car_photo4 = await AsyncStorage.getItem('car_photo4');*/
        /*if(car_photo1 == null) {
          await AsyncStorage.setItem(
              'car_photo1',
              JSON.stringify(data.uri)
          );
        } else if(car_photo2 == null) {
           await AsyncStorage.setItem(
              'car_photo2',
              JSON.stringify(data.uri)
          );
        } else if(car_photo3 == null) {
           await AsyncStorage.setItem(
              'car_photo3',
              JSON.stringify(data.uri)
          );
        }  else if(car_photo4 == null) {
           await AsyncStorage.setItem(
              'car_photo4',
              JSON.stringify(data.uri)
          );
        }*/
      // this.setState({
      //   ...this.state,
      //   loading: false
      // });

    } catch (e) {
      console.warn(e);
      this.reset(e);
    }
  };

 /* componentDidMount = async () => {
    // await AsyncStorage.removeItem('car_photo1');
    // await AsyncStorage.removeItem('car_photo2');/
    // await AsyncStorage.removeItem('car_photo3');
    // await AsyncStorage.removeItem('car_photo4');
    const car_photo1 = await AsyncStorage.getItem('car_photo1');
    const car_photo2 = await AsyncStorage.getItem('car_photo2');
    const car_photo3 = await AsyncStorage.getItem('car_photo3');
    const car_photo4 = await AsyncStorage.getItem('car_photo4');
    console.log('car1', JSON.parse(car_photo1));
    console.log('car2', JSON.parse(car_photo2));
    console.log('car3', JSON.parse(car_photo3));
    console.log('car4', JSON.parse(car_photo4));
    if(car_photo1 != null) {
      this.setState({
        ...this.state,
        image: [...this.state.image, car_photo1]
      });
    }
    if(car_photo2 != null) {
      this.setState({
        ...this.state,
        image: [...this.state.image, car_photo2]
      });
    }
    if(car_photo3 != null) {
      this.setState({
        ...this.state,
        image: [...this.state.image, car_photo3]
      });
    }
    if(car_photo4 != null) {
      this.setState({
        ...this.state,
        image: [...this.state.image, car_photo4]
      });
    }
  }*/

  /**
   * processImage
   *
   * Responsible for getting image from react native camera and
   * starting image processing.
   *
   * @param {string} uri              Path for the image to be processed
   * @param {object} imageProperties  Other properties of image to be processed
   * @memberof App
   * @author Zain Sajjad
   */
  /*processImage = async (uri, imageProperties) => {
    const visionResp = await RNTextDetector.detectFromUri(uri);
    console.log('Vision Res===',visionResp);
    if (!(visionResp && visionResp.length > 0)) {
      throw "UNMATCHED";
    }
    this.setState({
      visionResp: this.mapVisionRespToScreen(visionResp, imageProperties)
    });
      this.setState({
          loading: false
      });
  };*/

  /**
   * mapVisionRespToScreen
   *
   * Converts RNTextDetectors response in representable form for
   * device's screen in accordance with the dimensions of image
   * used to processing.
   *
   * @param {array}  visionResp       Response from RNTextDetector
   * @param {object} imageProperties  Other properties of image to be processed
   * @memberof App
   */
 /* mapVisionRespToScreen = (visionResp, imageProperties) => {
    const IMAGE_TO_SCREEN_Y = screenHeight / imageProperties.height;
    const IMAGE_TO_SCREEN_X = screenWidth / imageProperties.width;

    return visionResp.map(item => {
      return {
        ...item,
        position: {
          width: item.bounding.width * IMAGE_TO_SCREEN_X,
          left: item.bounding.left * IMAGE_TO_SCREEN_X,
          height: item.bounding.height * IMAGE_TO_SCREEN_Y,
          top: item.bounding.top * IMAGE_TO_SCREEN_Y
        }
      };
    });
  };*/

  /**
   * React Native render function
   *
   * @returns ReactNode or null
   * @memberof App
   */
  render() {
    return (
      <>
      <View style={style.screen}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          key="camera"
          style={style.camera}
          notAuthorizedView={null}
          playSoundOnCapture
        >
          {({ camera, status }) => {
            if (status !== "READY") {
              return null;
            }
            return (
              <View style={style.buttonContainer}>
                <TouchableOpacity
                  onPress={() => this.takePicture(camera)}
                  style={style.button}
                />
              </View>
            );
          }}
        </Camera>
      </View>
     <Footer>
          <FooterTab style={{ backgroundColor: '#E86143' }}>
            <Button vertical onPress={()=> { this.props.navigation.navigate('Services', { test: 'Test' }) }}>
              <Icon style={{ color: '#3C2949', fontSize: 25 }} name="home" />
              <Text style={{ color: '#3C2949' }}>{ I18n.t('HOME') }</Text>
            </Button>
            <Button vertical onPress={()=> { this.props.navigation.navigate('Languages', { test: 'Test' }) }}>
              <Icon style={{ color: '#3C2949', fontSize: 25 }} name="globe" />
              <Text style={{ color: '#3C2949' }}>{ I18n.t('LANGUAGES') }</Text>
            </Button>
            <Button vertical onPress={()=> { this.props.navigation.navigate('Account', { test: 'Test' }) }}>
              <Icon style={{ color: '#3C2949', fontSize: 25 }} name="user" />
              <Text style={{ color: '#3C2949' }}>{ I18n.t('SETTINGS') }</Text>
            </Button>
          </FooterTab>
        </Footer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 10,
    backgroundColor: '#3C2949',
    borderRadius: 30,
  },
  fabIcon: {
    fontSize: 18,
    color: 'white'
  },
   maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },
});
