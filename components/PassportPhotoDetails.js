import React, { Component } from "react";
import { TouchableOpacity, View, ImageBackground, ActivityIndicator, StyleSheet, Modal } from "react-native";
import { RNCamera as Camera } from "react-native-camera";
// import RNTextDetector from "react-native-text-detector";
import { Container, Header, Content, List, ListItem, Text, Card, CardItem, Footer, FooterTab, Button, Thumbnail, Item, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import StepIndicator from 'react-native-step-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageViewer from 'react-native-image-zoom-viewer';
import I18n from 'react-native-i18n';

import style, { screenHeight, screenWidth } from "./styles";

const PICTURE_OPTIONS = {
  quality: 1,
  fixOrientation: true,
  forceUpOrientation: true
};

const labels = ["Passport Photos", "Emirates Id"];
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
}


  I18n.fallbacks = true;
  I18n.translations = {
    'en': require('./translations/en'),
    'ar': require('./translations/ar'),
  }


export default class PassportPhotoDetails extends React.Component {
  constructor(props) {
    super(props);
    // console.log('Cons',  this.props.route.params.image);
  }
  state = {
    // loading: false,
    image1: null,
    image1_date: null,
    image2: null,
    image2_date: null,
    // image3: null,
    // image3_date: null,
    // image4: null,
    // image4_date: null,
    selected: undefined,
    images: [],
    showModal: false,
    index: 0,
    // error: null,
    // visionResp: [],
    currentPosition: 0
  };

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  removeImage1 = async () => {
    console.log('1');
    const passport_photo1 = await AsyncStorage.getItem('passport_photo1');
    if(passport_photo1 != null) {
        let images = [...this.state.images]; // make a separate copy of the array
        let index = JSON.parse(passport_photo1);
        this.setState({images: images.filter(val => val.url != index)});
    }
    await AsyncStorage.removeItem('passport_photo1');
    await AsyncStorage.removeItem('passport_photo1_base64');
    await AsyncStorage.removeItem('passport_photo1_date');
    this.setState({
      ...this.state,
      image1: null
    });
  }

  removeImage2 = async () => {
    console.log('2')
    const passport_photo2 = await AsyncStorage.getItem('passport_photo2');
    if(passport_photo2 != null) {
        let images = [...this.state.images]; // make a separate copy of the array
        let index = JSON.parse(passport_photo2);
        this.setState({images: images.filter(val => val.url != index)});
    }
    await AsyncStorage.removeItem('passport_photo2');
    await AsyncStorage.removeItem('passport_photo2_base64');
    await AsyncStorage.removeItem('passport_photo2_date');
    this.setState({
      ...this.state,
      image2: null
    });
  }

  // removeImage3 = async () => {
  //   console.log('3')
  //   const car_photo3 = await AsyncStorage.getItem('car_photo3');
  //   if(car_photo3 != null) {
  //       let images = [...this.state.images]; // make a separate copy of the array
  //       let index = JSON.parse(car_photo3);
  //       this.setState({images: images.filter(val => val.url != index)});
  //   }
  //   await AsyncStorage.removeItem('car_photo3');
  //   this.setState({
  //     ...this.state,
  //     image3: null
  //   });
  // }

  // removeImage4 = async () => {
  //   console.log('4')
  //   const car_photo4 = await AsyncStorage.getItem('car_photo4');
  //   if(car_photo4 != null) {
  //       let images = [...this.state.images]; // make a separate copy of the array
  //       let index = JSON.parse(car_photo4);
  //       this.setState({images: images.filter(val => val.url != index)});
  //   }
  //   await AsyncStorage.removeItem('car_photo4');
  //   this.setState({
  //     ...this.state,
  //     image4: null
  //   });
  // }

  componentDidUpdate = async (prevProps, prevState) => {
    console.log('upd');
    if(prevProps.route.params.image != this.props.route.params.image) {
      if(this.state.image1 == null) {
        await AsyncStorage.setItem('passport_photo1', JSON.stringify(this.props.route.params.image));
        await AsyncStorage.setItem('passport_photo1_base64', JSON.stringify(this.props.route.params.image_base64));
        let d = new Date();
        await AsyncStorage.setItem('passport_photo1_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

        const passport_photo1 = await AsyncStorage.getItem('passport_photo1');
        const passport_photo1_date = await AsyncStorage.getItem('passport_photo1_date');

        if(passport_photo1 != null) {
          let images = [...this.state.images];
          images.push({ url: JSON.parse(passport_photo1) });
          this.setState({
            ...this.state,
            image1: JSON.parse(passport_photo1),
            image1_date: JSON.parse(passport_photo1_date),
            images
          });
        }
      }

      else if(this.state.image2 == null) {
        await AsyncStorage.setItem('passport_photo2', JSON.stringify(this.props.route.params.image));
        await AsyncStorage.setItem('passport_photo2_base64', JSON.stringify(this.props.route.params.image_base64));
         let d = new Date();
         await AsyncStorage.setItem('passport_photo2_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

        const passport_photo2 = await AsyncStorage.getItem('passport_photo2');
        const passport_photo2_date = await AsyncStorage.getItem('passport_photo2_date');

        if(passport_photo2 != null) {
          let images = [...this.state.images];
          images.push({ url: JSON.parse(passport_photo2) });
          this.setState({
            ...this.state,
            image2: JSON.parse(passport_photo2),
            image2_date: JSON.parse(passport_photo2_date),
            images
          });
        }
      }

      // else if(this.state.image3 == null) {
      //   await AsyncStorage.setItem('car_photo3', JSON.stringify(this.props.route.params.image));
      //    let d = new Date();
      //    await AsyncStorage.setItem('car_photo3_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

      //   const car_photo3 = await AsyncStorage.getItem('car_photo3');
      //   const car_photo3_date = await AsyncStorage.getItem('car_photo3_date');

      //   if(car_photo3 != null) {
      //     let images = [...this.state.images];
      //     images.push({ url: JSON.parse(car_photo3) });
      //     this.setState({
      //       ...this.state,
      //       image3: JSON.parse(car_photo3),
      //       image3_date: JSON.parse(car_photo3_date),
      //       images
      //     });
      //   }
      // }

     // else if(this.state.image4 == null) {
     //    await AsyncStorage.setItem('car_photo4', JSON.stringify(this.props.route.params.image));
     //    let d = new Date();
     //     await AsyncStorage.setItem('car_photo4_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

     //    const car_photo4 = await AsyncStorage.getItem('car_photo4');
     //    const car_photo4_date = await AsyncStorage.getItem('car_photo4_date');

     //    if(car_photo4 != null) {
     //      let images = [...this.state.images];
     //      images.push({ url: JSON.parse(car_photo4) });
     //      this.setState({
     //        ...this.state,
     //        image4: JSON.parse(car_photo4),
     //        image4_date: JSON.parse(car_photo4_date),
     //        images
     //      });
     //    }
     //  }
    }
    // console.log('1as', await AsyncStorage.getItem('car_photo1'));
    // console.log('2as', await AsyncStorage.getItem('car_photo2'));
    // console.log('3as', await AsyncStorage.getItem('car_photo3'));
    // console.log('4as', await AsyncStorage.getItem('car_photo4'));
  }

  componentDidMount = async () => {
    this._navListener = this.props.navigation.addListener('focus', () => {
      this.setState({ value: true });
    });

    console.log('did',  this.props.route.params.image_base64);
    await AsyncStorage.setItem('passport_photo1', JSON.stringify(this.props.route.params.image));
    await AsyncStorage.setItem('passport_photo1_base64', JSON.stringify(this.props.route.params.image_base64));
    let d = new Date();
    await AsyncStorage.setItem('passport_photo1_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

    const passport_photo1 = await AsyncStorage.getItem('passport_photo1');
    const passport_photo1_date = await AsyncStorage.getItem('passport_photo1_date');

    console.log('date', passport_photo1_date)

    if(passport_photo1 != null) {
      let images = [...this.state.images];
      images.push({ url: JSON.parse(passport_photo1) });

      this.setState({
        ...this.state,
        image1: JSON.parse(passport_photo1),
        image1_date: JSON.parse(passport_photo1_date),
        images
      });
    }
  }

  changeIndex = (name) => {
    let index = this.state.images.findIndex(val => val.url == name);
    this.setState({ showModal: true, index: index })
  }

  close = () => {
    this.setState({ showModal: false })
  }

  render() {
    // console.log('1',this.state.image1);
    // console.log('2',this.state.image2);
    // console.log('3',this.state.image3);
    // console.log('4',this.state.image4);
    let car_photo_render;
    if(this.state.image1 != null && this.state.image2 != null) {
        car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.navigate('Emirates Id Photos', { test: 'Test' }) }} style={{...styles.fab, width: 200}}>
                            <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('EMIRATES ID FRONT') }</Text>
                          </TouchableOpacity>;
    } else {
      if(this.state.image1 == null) {
          car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.push('Passport Photos', { test: 'Test' }) }} style={{...styles.fab, width: 220}}>
                                <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('PASSPORT FIRST PAGE') }</Text>
                              </TouchableOpacity>;
      } else if (this.state.image2 == null) {
          car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.push('Passport Photos', { test: 'Test' }) }} style={{...styles.fab, width: 240}}>
                                <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('PASSPORT SECOND PAGE') }</Text>
                              </TouchableOpacity>;
      }
    //   else if(this.state.image3 == null) {
    //       car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.push('Car Photos', { test: 'Test' }) }} style={{...styles.fab, width: 90}}>
    //                             <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('LEFT') }</Text>
    //                           </TouchableOpacity>;
    //   } else if(this.state.image4 == null) {
    //       car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.push('Car Photos', { test: 'Test' }) }} style={{...styles.fab, width: 90}}>
    //                             <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('RIGHT') }</Text>
    //                           </TouchableOpacity>;
    // }
  }
    return (
      <>
        <Modal visible={this.state.showModal} transparent={true} onRequestClose={() => { this.setState({ showModal: false }) }}>
          <ImageViewer imageUrls={this.state.images} enableSwipeDown={true} index={this.state.index} onSwipeDown={ this.close }/>
        </Modal>
        <Container>
          <ImageBackground source={require('../assets/medical.jpg')} style = {{ height: 150, marginBottom: 20 }}>
            <Text style={{ marginTop: 100, textAlign: 'center' }}><Text style={{ color: '#fff', fontSize: I18n.t('PASSPORT FONT SIZE') }}>{ I18n.t('THIS IS HOW WE') }</Text><Text style={{ fontSize: I18n.t('PASSPORT FONT SIZE'), color: '#E86143', fontWeight: 'bold' }}> { I18n.t('TAKE CARE OF YOU') }</Text></Text>
          </ImageBackground>
          <StepIndicator
               customStyles={customStyles}
               currentPosition={this.state.currentPosition}
               labels={labels}
               stepCount= {2}
          />
          <Content padder>
          <View style={{ marginTop: 20, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          { this.state.image1 ?
          (
            <TouchableOpacity onPress= { () => {this.changeIndex(this.state.image1)} }>
              <Text style={{ fontSize: 9, textAlign: 'center' }}>{ this.state.image1_date }</Text>
              <Thumbnail large source={{uri: this.state.image1}}/>
              <Text onPress={ this.removeImage1 } style={{ color: '#fc0303', fontSize: 13, textAlign: 'center' }}><Icon  size={ 18 } name='times'/> { I18n.t('REMOVE') }</Text>
            </TouchableOpacity>
          ) : null
          }

          { this.state.image2 ?
          (
            <TouchableOpacity onPress={ () => {this.changeIndex(this.state.image2)} }>
              <Text style={{ fontSize: 9, textAlign: 'center' }}>{ this.state.image2_date }</Text>
              <Thumbnail large source={{uri: this.state.image2}}/>
              <Text onPress={ this.removeImage2 } style={{ color: '#fc0303', fontSize: 13, textAlign: 'center' }}><Icon  size={ 18 } name='times'/> { I18n.t('REMOVE') }</Text>
            </TouchableOpacity>
          ) : null
          }

          </View>
        </Content>
          <View>{ car_photo_render }</View>
      </Container>
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
    width: 110,
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
  }
});
