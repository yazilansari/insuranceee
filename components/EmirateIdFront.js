import React, { Component } from "react";
import { TouchableOpacity, View, ImageBackground, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { RNCamera as Camera } from "react-native-camera";
// import RNTextDetector from "react-native-text-detector";
import { Container, Header, Content, List, ListItem, Text, Card, CardItem, Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import StepIndicator from 'react-native-step-indicator';
import I18n from 'react-native-i18n';

import style, { screenHeight, screenWidth } from "./styles";
import ScanDetails from "./ScanDetails";

const PICTURE_OPTIONS = {
  quality: 1,
  fixOrientation: true,
  // forceUpOrientation: true
};

const labels = ["Registration Card", "Emirates Id", "Driving License", "Passing Certificate", "Vehicle Photos"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:25,
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
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 12,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 12,
  currentStepLabelColor: '#fe7013'
}

  I18n.fallbacks = true;
  I18n.translations = {
    'en': require('./translations/en'),
    'ar': require('./translations/ar'),
  }

export default class EmirateIdFront extends React.Component {
  state = {
    loading: false,
    image: null,
    error: null,
    visionResp: [],
    currentPosition: 1
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
        error
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
    this.setState({
      loading: true
    });
    try {
      const data = await camera.takePictureAsync(PICTURE_OPTIONS);
      if (!data.uri) {
        throw "OTHER";
      }
      this.setState(
        {
          image: data.uri
        },
        () => {
          console.log('Image===',data.uri);
          this.processImage(data.uri, {
            height: data.height,
            width: data.width
          });
          // this.setState({
          //   loading: false
          // });
        }
      );
    } catch (e) {
      console.warn(e);
      this.reset(e);
    }
  };

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
  processImage = async (uri, imageProperties) => {
    // const visionResp = await RNTextDetector.detectFromUri(uri);
    // console.log('Vision Res===',visionResp);
    // if (!(visionResp && visionResp.length > 0)) {
    //   throw "UNMATCHED";
    // }
    // this.setState({
    //   visionResp: this.mapVisionRespToScreen(visionResp, imageProperties)
    // });
    //   this.setState({
    //       loading: false
    //   });
  };

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
  mapVisionRespToScreen = (visionResp, imageProperties) => {
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
  };

  /**
   * React Native render function
   *
   * @returns ReactNode or null
   * @memberof App
   */
  render() {
    const { height, width } = Dimensions.get('window');
    const maskRowHeight = Math.round((height - 300) / 20);
    const maskColWidth = (width - 300) / 2;
    return (
      <>
      <View style={style.screen}>
        {!this.state.image ? (
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
                <>
                <View style={styles.maskOutter}>
                <View style={[{ flex: maskRowHeight  }, styles.maskRow, styles.maskFrame]} />
                  <View style={[{ flex: 70 }, styles.maskCenter]}>
                  <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                  <View style={styles.maskInner} />
                  <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                  </View>
                  <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
                </View>
                <View style={style.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => this.takePicture(camera)}
                    style={style.button}
                  />
                </View>
                </>
              );
            }}
          </Camera>
        ) : null}
            {(this.state.loading) ? <ActivityIndicator style={{ marginTop: 20, textAlign: 'center' }} size="large" color="tomato" /> :
            <>{ (this.state.visionResp != '') ? (<Container>
              <ImageBackground source={require('../assets/take_care.jpeg')} style = {{ height: 150, marginBottom: 20 }}>
                <Text style={{ marginTop: 100, textAlign: 'center' }}><Text style={{ color: '#fff', fontSize: 18 }}>{ I18n.t('THIS IS HOW WE') }</Text><Text style={{ fontSize: 18, color: '#E86143', fontWeight: 'bold' }}> { I18n.t('TAKE CARE OF YOU') }</Text></Text>
              </ImageBackground>
              <StepIndicator
                   customStyles={customStyles}
                   currentPosition={this.state.currentPosition}
                   labels={labels}
                   stepCount= {5}
              />
              <Content padder>
              <Card>
              { this.state.visionResp.map((item, ind) => {
              return (
                  <ScanDetails scanDetails={ item } position={ ind } />
                );
              })}
              </Card>
            </Content>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Emirates Id Back', { test: "Test" }) }} style={styles.fab}>
                  <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('EMIRATES ID BACK') }</Text>
                </TouchableOpacity>
          </Container>) : (this.state.loading) ? <ActivityIndicator style={{ marginTop: 20, textAlign: 'center' }} size="large" color="tomato" /> : <></> }
          </>
            }
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
    width: 180,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 40,
    backgroundColor: '#3C2949',
    borderRadius: 30,
  },
  fabIcon: {
    fontSize: 16,
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
