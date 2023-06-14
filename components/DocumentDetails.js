import React, { Component } from "react";
import { TouchableOpacity, View, ImageBackground, ActivityIndicator, StyleSheet, Modal, Platform, PermissionsAndroid } from "react-native";
import { RNCamera as Camera } from "react-native-camera";
// import RNTextDetector from "react-native-text-detector";
import { Container, Header, Content, List, ListItem, Text, Card, CardItem, Footer, FooterTab, Button, Thumbnail, Item, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import StepIndicator from 'react-native-step-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageViewer from 'react-native-image-zoom-viewer';
import I18n from 'react-native-i18n';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';

// import style, { screenHeight, screenWidth } from "./styles";

// const PICTURE_OPTIONS = {
//   quality: 1,
//   fixOrientation: true,
//   forceUpOrientation: true
// };

// const labels = ["Registration Card", "Emirates Id", "Driving License", "Passing Certificate", "Vehicle Photos"];
// const customStyles = {
//   stepIndicatorSize: 25,
//   currentStepIndicatorSize:25,
//   separatorStrokeWidth: 2,
//   currentStepStrokeWidth: 3,
//   stepStrokeCurrentColor: '#fe7013',
//   stepStrokeWidth: 3,
//   stepStrokeFinishedColor: '#fe7013',
//   stepStrokeUnFinishedColor: '#aaaaaa',
//   separatorFinishedColor: '#fe7013',
//   separatorUnFinishedColor: '#aaaaaa',
//   stepIndicatorFinishedColor: '#fe7013',
//   stepIndicatorUnFinishedColor: '#ffffff',
//   stepIndicatorCurrentColor: '#ffffff',
//   stepIndicatorLabelFontSize: 12,
//   currentStepIndicatorLabelFontSize: 12,
//   stepIndicatorLabelCurrentColor: '#fe7013',
//   stepIndicatorLabelFinishedColor: '#ffffff',
//   stepIndicatorLabelUnFinishedColor: '#aaaaaa',
//   labelColor: '#999999',
//   labelSize: 12,
//   currentStepLabelColor: '#fe7013'
// }


  I18n.fallbacks = true;
  I18n.translations = {
    'en': require('./translations/en'),
    'ar': require('./translations/ar'),
  }


export default class DocumentDetails extends React.Component {
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
    image3: null,
    image3_date: null,
    image4: null,
    image4_date: null,
    image5: null,
    image5_date: null,
    image6: null,
    image6_date: null,
    image7: null,
    image7_date: null,
    // typeSelected: undefined,
    // partyCategorySelected: undefined,
    // compCategorySelected: 'saloon_gcc',
    // cylinderSelected: undefined,
    // ageSelected: 'above_23_years',
    // categoryShow: 1,
    // cylinderShow: 0,
    images: [],
    showModal: false,
    index: 0,
    // error: null,
    // visionResp: [],
    currentPosition: 4,
    show_options: 0
  };

  onTypeChange(value: string) {
    if(value == 'comprehensive') {
      this.setState({
        typeSelected: value,
        categoryShow: 1,
        cylinderShow: 0,
        partyCategorySelected: undefined,
        compCategorySelected: 'saloon_gcc',
        cylinderSelected: undefined,
        ageSelected: 'above_23_years',

      });
    } else {
      this.setState({
        typeSelected: value,
        categoryShow: 0,
        cylinderShow: 1,
        partyCategorySelected: 'saloon',
        compCategorySelected: undefined,
        cylinderSelected: '4',
        ageSelected: '25_years',
      });
    }
  }

  onCompCategoryChange(value: string) {
    this.setState({
      compCategorySelected: value,
      partyCategorySelected: undefined
    });
  }

  onPartyCategoryChange(value: string) {
    this.setState({
      partyCategorySelected: value,
      compCategorySelected: undefined,
      cylinderSelected: '4',
      ageSelected: '25_years',
    });
  }

  onCylinderChange(value: string) {
    this.setState({
      cylinderSelected: value,
      ageSelected: '25_years',
    });
  }

  onAgeChange(value: string) {
    this.setState({
      ageSelected: value
    });
  }

  removeImage1 = async () => {
    // console.log('1');
    const car_photo1 = await AsyncStorage.getItem('registration_card1');
    if(car_photo1 != null) {
        let images = [...this.state.images]; // make a separate copy of the array
        let index = JSON.parse(car_photo1);
        this.setState({images: images.filter(val => val.url != index)});
    }
    await AsyncStorage.removeItem('registration_card1');
    await AsyncStorage.removeItem('registration_card1_base64');
    await AsyncStorage.removeItem('registration_card1_date');
    this.setState({
      ...this.state,
      image1: null
    });
  }

  removeImage2 = async () => {
    // console.log('2')
    const car_photo2 = await AsyncStorage.getItem('registration_card2');
    if(car_photo2 != null) {
        let images = [...this.state.images]; // make a separate copy of the array
        let index = JSON.parse(car_photo2);
        this.setState({images: images.filter(val => val.url != index)});
    }
    await AsyncStorage.removeItem('registration_card2');
    await AsyncStorage.removeItem('registration_card2_base64');
    await AsyncStorage.removeItem('registration_card2_date');
    this.setState({
      ...this.state,
      image2: null
    });
  }

  removeImage3 = async () => {
    // console.log('3')
    const car_photo3 = await AsyncStorage.getItem('emirates_id1');
    if(car_photo3 != null) {
        let images = [...this.state.images]; // make a separate copy of the array
        let index = JSON.parse(car_photo3);
        this.setState({images: images.filter(val => val.url != index)});
    }
    await AsyncStorage.removeItem('emirates_id1');
    await AsyncStorage.removeItem('emirates_id1_base64');
    await AsyncStorage.removeItem('emirates_id1_date');
    this.setState({
      ...this.state,
      image3: null
    });
  }

  removeImage4 = async () => {
    // console.log('4')
    const car_photo4 = await AsyncStorage.getItem('emirates_id2');
    if(car_photo4 != null) {
        let images = [...this.state.images]; // make a separate copy of the array
        let index = JSON.parse(car_photo4);
        this.setState({images: images.filter(val => val.url != index)});
    }
    await AsyncStorage.removeItem('emirates_id2');
    await AsyncStorage.removeItem('emirates_id2_base64');
    await AsyncStorage.removeItem('emirates_id2_date');
    this.setState({
      ...this.state,
      image4: null
    });
  }

  removeImage5 = async () => {
    // console.log('4')
    const car_photo5 = await AsyncStorage.getItem('driving_license1');
    if(car_photo5 != null) {
        let images = [...this.state.images]; // make a separate copy of the array
        let index = JSON.parse(car_photo5);
        this.setState({images: images.filter(val => val.url != index)});
    }
    await AsyncStorage.removeItem('driving_license1');
    await AsyncStorage.removeItem('driving_license1_base64');
    await AsyncStorage.removeItem('driving_license1_date');
    this.setState({
      ...this.state,
      image5: null
    });
  }

  removeImage6 = async () => {
    // console.log('4')
    const car_photo6 = await AsyncStorage.getItem('driving_license2');
    if(car_photo6 != null) {
        let images = [...this.state.images]; // make a separate copy of the array
        let index = JSON.parse(car_photo6);
        this.setState({images: images.filter(val => val.url != index)});
    }
    await AsyncStorage.removeItem('driving_license2');
    await AsyncStorage.removeItem('driving_license2_base64');
    await AsyncStorage.removeItem('driving_license2_date');
    this.setState({
      ...this.state,
      image6: null
    });
  }

  removeImage7 = async () => {
    // console.log('4')
    const car_photo7 = await AsyncStorage.getItem('passing_certificate');
    if(car_photo7 != null) {
        let images = [...this.state.images]; // make a separate copy of the array
        let index = JSON.parse(car_photo7);
        this.setState({images: images.filter(val => val.url != index)});
    }
    await AsyncStorage.removeItem('passing_certificate');
    await AsyncStorage.removeItem('passing_certificate_base64');
    await AsyncStorage.removeItem('passing_certificate_date');
    this.setState({
      ...this.state,
      image7: null
    });
  }

  componentDidUpdate = async (prevProps, prevState) => {
    // console.log('upd');
    if(prevProps.route.params.image != this.props.route.params.image) {
      if(this.state.image1 == null) {
        await AsyncStorage.setItem('registration_card1', JSON.stringify(this.props.route.params.image));
        await AsyncStorage.setItem('registration_card1_base64', JSON.stringify(this.props.route.params.image_base64));
        let d = new Date();
        await AsyncStorage.setItem('registration_card1_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

        const car_photo1 = await AsyncStorage.getItem('registration_card1');
        const car_photo1_date = await AsyncStorage.getItem('registration_card1_date');

        if(car_photo1 != null) {
          let images = [...this.state.images];
          images.push({ url: JSON.parse(car_photo1) });
          this.setState({
            ...this.state,
            image1: JSON.parse(car_photo1),
            image1_date: JSON.parse(car_photo1_date),
            images
          });
        }
      }

      else if(this.state.image2 == null) {
        await AsyncStorage.setItem('registration_card2', JSON.stringify(this.props.route.params.image));
        await AsyncStorage.setItem('registration_card2_base64', JSON.stringify(this.props.route.params.image_base64));
         let d = new Date();
         await AsyncStorage.setItem('registration_card2_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

        const car_photo2 = await AsyncStorage.getItem('registration_card2');
        const car_photo2_date = await AsyncStorage.getItem('registration_card2_date');

        if(car_photo2 != null) {
          let images = [...this.state.images];
          images.push({ url: JSON.parse(car_photo2) });
          this.setState({
            ...this.state,
            image2: JSON.parse(car_photo2),
            image2_date: JSON.parse(car_photo2_date),
            images
          });
        }
      }

      else if(this.state.image3 == null) {
        await AsyncStorage.setItem('emirates_id1', JSON.stringify(this.props.route.params.image));
        await AsyncStorage.setItem('emirates_id1_base64', JSON.stringify(this.props.route.params.image_base64));
         let d = new Date();
         await AsyncStorage.setItem('emirates_id1_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

        const car_photo3 = await AsyncStorage.getItem('emirates_id1');
        const car_photo3_date = await AsyncStorage.getItem('emirates_id1_date');

        if(car_photo3 != null) {
          let images = [...this.state.images];
          images.push({ url: JSON.parse(car_photo3) });
          this.setState({
            ...this.state,
            image3: JSON.parse(car_photo3),
            image3_date: JSON.parse(car_photo3_date),
            images
          });
        }
      }

     else if(this.state.image4 == null) {
        await AsyncStorage.setItem('emirates_id2', JSON.stringify(this.props.route.params.image));
        await AsyncStorage.setItem('emirates_id2_base64', JSON.stringify(this.props.route.params.image_base64));
        let d = new Date();
         await AsyncStorage.setItem('emirates_id2_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

        const car_photo4 = await AsyncStorage.getItem('emirates_id2');
        const car_photo4_date = await AsyncStorage.getItem('emirates_id2_date');

        if(car_photo4 != null) {
          let images = [...this.state.images];
          images.push({ url: JSON.parse(car_photo4) });
          this.setState({
            ...this.state,
            image4: JSON.parse(car_photo4),
            image4_date: JSON.parse(car_photo4_date),
            images
          });
        }
      }

      else if(this.state.image5 == null) {
        await AsyncStorage.setItem('driving_license1', JSON.stringify(this.props.route.params.image));
        await AsyncStorage.setItem('driving_license1_base64', JSON.stringify(this.props.route.params.image_base64));
        let d = new Date();
         await AsyncStorage.setItem('driving_license1_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

        const car_photo5 = await AsyncStorage.getItem('driving_license1');
        const car_photo5_date = await AsyncStorage.getItem('driving_license1_date');

        if(car_photo5 != null) {
          let images = [...this.state.images];
          images.push({ url: JSON.parse(car_photo5) });
          this.setState({
            ...this.state,
            image5: JSON.parse(car_photo5),
            image5_date: JSON.parse(car_photo5_date),
            images
          });
        }
      }

      else if(this.state.image6 == null) {
        await AsyncStorage.setItem('driving_license2', JSON.stringify(this.props.route.params.image));
        await AsyncStorage.setItem('driving_license2_base64', JSON.stringify(this.props.route.params.image_base64));
        let d = new Date();
         await AsyncStorage.setItem('driving_license2_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

        const car_photo6 = await AsyncStorage.getItem('driving_license2');
        const car_photo6_date = await AsyncStorage.getItem('driving_license2_date');

        if(car_photo6 != null) {
          let images = [...this.state.images];
          images.push({ url: JSON.parse(car_photo6) });
          this.setState({
            ...this.state,
            image6: JSON.parse(car_photo6),
            image6_date: JSON.parse(car_photo6_date),
            images
          });
        }
      }

      else if(this.state.image7 == null) {
        await AsyncStorage.setItem('passing_certificate', JSON.stringify(this.props.route.params.image));
        await AsyncStorage.setItem('passing_certificate_base64', JSON.stringify(this.props.route.params.image_base64));
        let d = new Date();
         await AsyncStorage.setItem('passing_certificate_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

        const car_photo7 = await AsyncStorage.getItem('passing_certificate');
        const car_photo7_date = await AsyncStorage.getItem('passing_certificate_date');

        if(car_photo7 != null) {
          let images = [...this.state.images];
          images.push({ url: JSON.parse(car_photo7) });
          this.setState({
            ...this.state,
            image7: JSON.parse(car_photo7),
            image7_date: JSON.parse(car_photo7_date),
            images
          });
        }
      }
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

    // console.log('did',  this.props.route.params.image);
    await AsyncStorage.setItem('registration_card1', JSON.stringify(this.props.route.params.image));
    await AsyncStorage.setItem('registration_card1_base64', JSON.stringify(this.props.route.params.image_base64));
    let d = new Date();
    await AsyncStorage.setItem('registration_card1_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

    const car_photo1 = await AsyncStorage.getItem('registration_card1');
    const car_photo1_date = await AsyncStorage.getItem('registration_card1_date');
    // const registration_card_base64 = await AsyncStorage.getItem('registration_card_base64');

    // console.log('registration_card_base64', registration_card_base64);

    if(car_photo1 != null) {
      let images = [...this.state.images];
      images.push({ url: JSON.parse(car_photo1) });

      this.setState({
        ...this.state,
        image1: JSON.parse(car_photo1),
        image1_date: JSON.parse(car_photo1_date),
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

  showOptions = () => {
    // console.log('cliekd')
    this.setState({ show_options: 1 })
  }

   /*captureImage = async (type) => {
    let options = {
      mediaType: type,
      // maxWidth: 300,
      // maxHeight: 550,
      quality: 0.5,
      // videoQuality: 'low',
      // durationLimit: 30, //Video max duration in seconds
      // saveToPhotos: true,
      includeBase64: true
    };
    // let isCameraPermitted = await requestCameraPermission();
    // let isStoragePermitted = await requestExternalWritePermission();
    // if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          console.log('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          console.log('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.assets.base64);
        console.log('uri -> ', response.assets.uri);
        console.log('width -> ', response.assets.width);
        console.log('height -> ', response.assets.height);
        console.log('fileSize -> ', response.assets.fileSize);
        console.log('type -> ', response.assets.type);
        console.log('fileName -> ', response.assets.fileName);
        // setFilePath(response);
      });
    // }
  };*/

   requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Permission',
            message: 'App needs permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  chooseFile = async (type) => {
    console.log('0000000', type);
    let options = {
      mediaType: type,
      // maxWidth: 300,
      // maxHeight: 550,
      quality: 0.5,
      includeBase64: true
    };
    let isStoragePermitted = await this.requestExternalWritePermission();
    if (isStoragePermitted) {
      launchImageLibrary(options, async (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          console.log('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          console.log('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
          return;
        }
        // console.log('base64 -> ', response.assets[0].base64);
        // console.log('uri -> ', response.assets[0].uri);
        // console.log('width -> ', response.assets[0].width);
        // console.log('height -> ', response.assets[0].height);
        // console.log('fileSize -> ', response.assets[0].fileSize);
        // console.log('type -> ', response.assets[0].type);
        // console.log('fileName -> ', response.assets[0].fileName);
        // setFilePath(response);

        if(this.state.image7 == null) {
          await AsyncStorage.setItem('passing_certificate', JSON.stringify(response.assets[0].uri));
          await AsyncStorage.setItem('passing_certificate_base64', JSON.stringify(response.assets[0].base64));
          let d = new Date();
           await AsyncStorage.setItem('passing_certificate_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

          const car_photo7 = await AsyncStorage.getItem('passing_certificate');
          const car_photo7_date = await AsyncStorage.getItem('passing_certificate_date');

          if(car_photo7 != null) {
            let images = [...this.state.images];
            images.push({ url: JSON.parse(car_photo7) });
            this.setState({
              ...this.state,
              image7: JSON.parse(car_photo7),
              image7_date: JSON.parse(car_photo7_date),
              images
            });
          }
        }
      });
    }
  };


  render() {
    // console.log('0000',this.state.show_options);
    // console.log(this.state.partyCategorySelected +'&&'+ this.state.cylinderSelected);
    let car_photo_render;
    if(this.state.image1 != null && this.state.image2 != null && this.state.image3 != null && this.state.image4 != null && this.state.image5 != null && this.state.image6 != null && this.state.image7) {
        car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.navigate('Vehicle Photos', { test: 'Test', images: this.state.images}) }} style={styles.fab}>
                            <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('VEHICLE PHOTOS') }</Text>
                          </TouchableOpacity>;
    } else {
        if(this.state.image1 == null) {
            car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.push('Documents', { test: 'Test' }) }} style={{...styles.fab, width: 260}}>
                                  <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('REGISTRATION CARD F/SIDE') }</Text>
                                </TouchableOpacity>;
        } else if (this.state.image2 == null) {
            car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.push('Documents', { test: 'Test' }) }} style={{...styles.fab, width: 250}}>
                                  <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('REGISTRATION CARD BACK') }</Text>
                                </TouchableOpacity>;
        } else if(this.state.image3 == null) {
            car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.push('Documents', { test: 'Test' }) }} style={{...styles.fab, width: 200}}>
                                  <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('EMIRATES ID FRONT') }</Text>
                                </TouchableOpacity>;
        } else if(this.state.image4 == null) {
            car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.push('Documents', { test: 'Test' }) }} style={{...styles.fab, width: 190}}>
                                  <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('EMIRATES ID BACK') }</Text>
                                </TouchableOpacity>;
      } else if(this.state.image5 == null) {
            car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.push('Documents', { test: 'Test' }) }} style={{...styles.fab, width: 230}}>
                                  <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('DRIVING LICENSE FRONT') }</Text>
                                </TouchableOpacity>;
      } else if(this.state.image6 == null) {
            car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.push('Documents', { test: 'Test' }) }} style={{...styles.fab, width: 220}}>
                                  <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('DRIVING LICENSE BACK') }</Text>
                                </TouchableOpacity>;
      } else if(this.state.image7 == null && this.state.show_options == 0) {
            car_photo_render = <TouchableOpacity onPress={() => { this.showOptions() }} style={{...styles.fab, width: 220}}>
                                  <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('PASSING CERTIFICATE') }</Text>
                                </TouchableOpacity>;
      } else if(this.state.show_options == 1) {
            car_photo_render = <><TouchableOpacity onPress={() => { this.props.navigation.push('Documents', { test: 'Test' }) }} style={{...styles.fab, width: 100}}>
                                  <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('CAMERA') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.chooseFile('photo') }} style={{...styles.fab, width: 100, bottom: 100}}>
                                  <Text style={styles.fabIcon}><Icon size={ 18 } name='image'/> { I18n.t('UPLOAD') }</Text>
                                </TouchableOpacity></>
      }
  }

  // let cylinder_render;
  // if(this.state.cylinderShow == 1) {
  //   if(this.state.partyCategorySelected == 'station') {
  //     cylinder_render = <Item picker>
  //             <Picker
  //               mode="dropdown"
  //               iosIcon={<Icon name="arrow-down" />}
  //               style={{ marginTop: 20 }}
  //               placeholder="Type of Insurance"
  //               placeholderStyle={{ color: "#bfc6ea" }}
  //               placeholderIconColor="#007aff"
  //               selectedValue={this.state.cylinderSelected}
  //               onValueChange={this.onCylinderChange.bind(this)}
  //             >
  //               <Picker.Item label={ I18n.t('4') } value="4" />
  //               <Picker.Item label={ I18n.t('6') } value="6" />
  //               <Picker.Item label={ I18n.t('8') } value="8" />
  //             </Picker>
  //           </Item>;
  //   } else {
  //     cylinder_render = <Item picker>
  //             <Picker
  //               mode="dropdown"
  //               iosIcon={<Icon name="arrow-down" />}
  //               style={{ marginTop: 20 }}
  //               placeholder="Type of Insurance"
  //               placeholderStyle={{ color: "#bfc6ea" }}
  //               placeholderIconColor="#007aff"
  //               selectedValue={this.state.cylinderSelected}
  //               onValueChange={this.onCylinderChange.bind(this)}
  //             >
  //               <Picker.Item label={ I18n.t('4') } value="4" />
  //               <Picker.Item label={ I18n.t('6') } value="6" />
  //               <Picker.Item label={ I18n.t('8') } value="8" />
  //               <Picker.Item label={ I18n.t('12') } value="12" />
  //             </Picker>
  //           </Item>;
  //   }
  // } else {
  //   cylinder_render = null
  // }

  // let age_render;
  // if(this.state.typeSelected == 'third_party') {
  //   if((this.state.partyCategorySelected == 'saloon' && this.state.cylinderSelected == '4') || (this.state.partyCategorySelected == 'saloon' && this.state.cylinderSelected == '6') || (this.state.partyCategorySelected == 'saloon' && this.state.cylinderSelected == '8')) {
  //     age_render = <Item picker>
  //             <Picker
  //               mode="dropdown"
  //               iosIcon={<Icon name="arrow-down" />}
  //               style={{ marginTop: 20 }}
  //               placeholder="Type of Insurance"
  //               placeholderStyle={{ color: "#bfc6ea" }}
  //               placeholderIconColor="#007aff"
  //               selectedValue={this.state.ageSelected}
  //               onValueChange={this.onAgeChange.bind(this)}
  //             >
  //               <Picker.Item label={ I18n.t('25 Years') } value="25_years" />
  //               <Picker.Item label={ I18n.t('23 Years') } value="23_years" />
  //             </Picker>
  //           </Item>;
  //   } else if(this.state.partyCategorySelected == 'saloon' && this.state.cylinderSelected == '12') {
  //     age_render = <Item picker>
  //             <Picker
  //               mode="dropdown"
  //               iosIcon={<Icon name="arrow-down" />}
  //               style={{ marginTop: 20 }}
  //               placeholder="Type of Insurance"
  //               placeholderStyle={{ color: "#bfc6ea" }}
  //               placeholderIconColor="#007aff"
  //               selectedValue={this.state.ageSelected}
  //               onValueChange={this.onAgeChange.bind(this)}
  //             >
  //               <Picker.Item label={ I18n.t('25 Years') } value="25_years" />
  //             </Picker>
  //           </Item>;
  //   } else {
  //     age_render = <Item picker>
  //             <Picker
  //               mode="dropdown"
  //               iosIcon={<Icon name="arrow-down" />}
  //               style={{ marginTop: 20 }}
  //               placeholder="Type of Insurance"
  //               placeholderStyle={{ color: "#bfc6ea" }}
  //               placeholderIconColor="#007aff"
  //               selectedValue={this.state.ageSelected}
  //               onValueChange={this.onAgeChange.bind(this)}
  //             >
  //               <Picker.Item label={ I18n.t('25 Years') } value="25_years" />
  //               <Picker.Item label={ I18n.t('23 Years') } value="23_years" />
  //             </Picker>
  //           </Item>;
  //   }

  //   if((this.state.partyCategorySelected == 'station' && this.state.cylinderSelected == '4') || (this.state.partyCategorySelected == 'station' && this.state.cylinderSelected == '6') || (this.state.partyCategorySelected == 'station' && this.state.cylinderSelected == '8')  || (this.state.partyCategorySelected == 'station' && this.state.cylinderSelected == '12')) {
  //     age_render = <Item picker>
  //             <Picker
  //               mode="dropdown"
  //               iosIcon={<Icon name="arrow-down" />}
  //               style={{ marginTop: 20 }}
  //               placeholder="Type of Insurance"
  //               placeholderStyle={{ color: "#bfc6ea" }}
  //               placeholderIconColor="#007aff"
  //               selectedValue={this.state.ageSelected}
  //               onValueChange={this.onAgeChange.bind(this)}
  //             >
  //               <Picker.Item label={ I18n.t('25 Years') } value="25_years" />
  //               <Picker.Item label={ I18n.t('23 Years') } value="23_years" />
  //             </Picker>
  //           </Item>;
  //   }

  //   if((this.state.partyCategorySelected == 'sport' && this.state.cylinderSelected == '4') || (this.state.partyCategorySelected == 'sport' && this.state.cylinderSelected == '6') || (this.state.partyCategorySelected == 'sport' && this.state.cylinderSelected == '8')  || (this.state.partyCategorySelected == 'sport' && this.state.cylinderSelected == '12')) {
  //     age_render = <Item picker>
  //             <Picker
  //               mode="dropdown"
  //               iosIcon={<Icon name="arrow-down" />}
  //               style={{ marginTop: 20 }}
  //               placeholder="Type of Insurance"
  //               placeholderStyle={{ color: "#bfc6ea" }}
  //               placeholderIconColor="#007aff"
  //               selectedValue={this.state.ageSelected}
  //               onValueChange={this.onAgeChange.bind(this)}
  //             >
  //               <Picker.Item label={ I18n.t('25 Years') } value="25_years" />
  //               <Picker.Item label={ I18n.t('Age Between 20 and 25 Years') } value="age_between_20_25_years" />
  //             </Picker>
  //           </Item>;
  //   }
  // } else {
  //   age_render = <Item picker>
  //             <Picker
  //               mode="dropdown"
  //               iosIcon={<Icon name="arrow-down" />}
  //               style={{ marginTop: 20 }}
  //               placeholder="Type of Insurance"
  //               placeholderStyle={{ color: "#bfc6ea" }}
  //               placeholderIconColor="#007aff"
  //               selectedValue={this.state.ageSelected}
  //               onValueChange={this.onAgeChange.bind(this)}
  //             >
  //               <Picker.Item label={ I18n.t('Above 23 Years') } value="above_23_years" />
  //             </Picker>
  //           </Item>;
  // }

    return (
      <>
        <Modal visible={this.state.showModal} transparent={true} onRequestClose={() => { this.setState({ showModal: false }) }}>
          <ImageViewer imageUrls={this.state.images} enableSwipeDown={true} index={this.state.index} onSwipeDown={ this.close }/>
        </Modal>
        <Container>
          <ImageBackground source={require('../assets/take_care.jpeg')} style = {{ height: 150, marginBottom: 20 }}>
            <Text style={{ marginTop: 100, textAlign: 'center' }}><Text style={{ color: '#fff', fontSize: I18n.t('PASSPORT FONT SIZE') }}>{ I18n.t('THIS IS HOW WE') }</Text><Text style={{ fontSize: I18n.t('PASSPORT FONT SIZE'), color: '#E86143', fontWeight: 'bold' }}> { I18n.t('TAKE CARE OF YOU') }</Text></Text>
          </ImageBackground>
          {/*<StepIndicator
               customStyles={customStyles}
               currentPosition={this.state.currentPosition}
               labels={labels}
               stepCount= {5}
          />*/}
          <Content padder>
          { (this.state.image1 || this.state.image2) ? 
            <Text style={{ fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline', color: '#3C2949',textAlign: 'center' }}>{ I18n.t('REGISTRATION CARD') }</Text> : null
          }
          <View style={{ marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
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

          { (this.state.image3 || this.state.image4) ? 
            <Text style={{ marginTop:10, fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline', color: '#3C2949', textAlign: 'center' }}>{ I18n.t('EMIRATES ID') }</Text> : null
          }
          <View style={{ marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
          { this.state.image3 ?
          (
            <TouchableOpacity onPress={ () => {this.changeIndex(this.state.image3)} }>
              <Text style={{ fontSize: 9, textAlign: 'center' }}>{ this.state.image3_date }</Text>
              <Thumbnail large source={{uri: this.state.image3}}/>
              <Text onPress={ this.removeImage3 } style={{ color: '#fc0303', fontSize: 13, textAlign: 'center' }}><Icon  size={ 18 } name='times'/> { I18n.t('REMOVE') }</Text>
            </TouchableOpacity>
          ): null
          }

          { this.state.image4 ?
          (
            <TouchableOpacity onPress={ () => {this.changeIndex(this.state.image4)} }>
              <Text style={{ fontSize: 9, textAlign: 'center' }}>{ this.state.image4_date }</Text>
              <Thumbnail large source={{uri: this.state.image4}}/>
              <Text onPress={ this.removeImage4 } style={{ color: '#fc0303', fontSize: 13, textAlign: 'center' }}><Icon  size={ 18 } name='times'/> { I18n.t('REMOVE') }</Text>
            </TouchableOpacity>
          ) : null
          }
          </View>

          { (this.state.image5 || this.state.image6) ? 
            <Text style={{ marginTop:10, fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline', color: '#3C2949', textAlign: 'center' }}>{ I18n.t('DRIVING LICENSE') }</Text> : null
          }
          <View style={{ marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
          { this.state.image5 ?
          (
            <TouchableOpacity onPress={ () => {this.changeIndex(this.state.image5)} }>
              <Text style={{ fontSize: 9, textAlign: 'center' }}>{ this.state.image5_date }</Text>
              <Thumbnail large source={{uri: this.state.image5}}/>
              <Text onPress={ this.removeImage5 } style={{ color: '#fc0303', fontSize: 13, textAlign: 'center' }}><Icon  size={ 18 } name='times'/> { I18n.t('REMOVE') }</Text>
            </TouchableOpacity>
          ): null
          }

          { this.state.image6 ?
          (
            <TouchableOpacity onPress={ () => {this.changeIndex(this.state.image6)} }>
              <Text style={{ fontSize: 9, textAlign: 'center' }}>{ this.state.image6_date }</Text>
              <Thumbnail large source={{uri: this.state.image6}}/>
              <Text onPress={ this.removeImage6 } style={{ color: '#fc0303', fontSize: 13, textAlign: 'center' }}><Icon  size={ 18 } name='times'/> { I18n.t('REMOVE') }</Text>
            </TouchableOpacity>
          ) : null
          }
          </View>

          { this.state.image7 ? 
            <Text style={{ marginTop:10, fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline', color: '#3C2949', textAlign: 'center' }}> { I18n.t('PASSING CERTIFICATE') }</Text> : null
          }
          <View style={{ marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
          { this.state.image7 ?
          (
            <TouchableOpacity onPress={ () => {this.changeIndex(this.state.image7)} }>
              <Text style={{ fontSize: 9, textAlign: 'center' }}>{ this.state.image7_date }</Text>
              <Thumbnail large source={{uri: this.state.image7}}/>
              <Text onPress={ this.removeImage7 } style={{ color: '#fc0303', fontSize: 13, textAlign: 'center' }}><Icon  size={ 18 } name='times'/> { I18n.t('REMOVE') }</Text>
            </TouchableOpacity>
          ): null
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
  }
});
