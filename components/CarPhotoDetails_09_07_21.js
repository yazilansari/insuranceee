import React, { Component } from "react";
import { TouchableOpacity, View, ImageBackground, ActivityIndicator, StyleSheet, Modal } from "react-native";
import { RNCamera as Camera } from "react-native-camera";
import RNTextDetector from "react-native-text-detector";
import { Container, Header, Content, List, ListItem, Text, Card, CardItem, Footer, FooterTab, Button, Thumbnail, Item, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import StepIndicator from 'react-native-step-indicator';
import AsyncStorage from '@react-native-community/async-storage';
import ImageViewer from 'react-native-image-zoom-viewer';
import I18n from 'react-native-i18n';

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


export default class CarPhotoDetails extends React.Component {
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
    typeSelected: undefined,
    partyCategorySelected: undefined,
    compCategorySelected: 'saloon_gcc',
    cylinderSelected: undefined,
    ageSelected: 'above_23_years',
    categoryShow: 1,
    cylinderShow: 0,
    images: [],
    showModal: false,
    index: 0,
    // error: null,
    // visionResp: [],
    currentPosition: 4
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
    console.log('1');
    const car_photo1 = await AsyncStorage.getItem('car_photo1');
    if(car_photo1 != null) {
        let images = [...this.state.images]; // make a separate copy of the array
        let index = JSON.parse(car_photo1);
        this.setState({images: images.filter(val => val.url != index)});
    }
    await AsyncStorage.removeItem('car_photo1');
    await AsyncStorage.removeItem('car_photo1_base64');
    await AsyncStorage.removeItem('car_photo1_date');
    this.setState({
      ...this.state,
      image1: null
    });
  }

  removeImage2 = async () => {
    console.log('2')
    const car_photo2 = await AsyncStorage.getItem('car_photo2');
    if(car_photo2 != null) {
        let images = [...this.state.images]; // make a separate copy of the array
        let index = JSON.parse(car_photo2);
        this.setState({images: images.filter(val => val.url != index)});
    }
    await AsyncStorage.removeItem('car_photo2');
    await AsyncStorage.removeItem('car_photo2_base64');
    await AsyncStorage.removeItem('car_photo2_date');
    this.setState({
      ...this.state,
      image2: null
    });
  }

  removeImage3 = async () => {
    console.log('3')
    const car_photo3 = await AsyncStorage.getItem('car_photo3');
    if(car_photo3 != null) {
        let images = [...this.state.images]; // make a separate copy of the array
        let index = JSON.parse(car_photo3);
        this.setState({images: images.filter(val => val.url != index)});
    }
    await AsyncStorage.removeItem('car_photo3');
    await AsyncStorage.removeItem('car_photo3_base64');
    await AsyncStorage.removeItem('car_photo3_date');
    this.setState({
      ...this.state,
      image3: null
    });
  }

  removeImage4 = async () => {
    console.log('4')
    const car_photo4 = await AsyncStorage.getItem('car_photo4');
    if(car_photo4 != null) {
        let images = [...this.state.images]; // make a separate copy of the array
        let index = JSON.parse(car_photo4);
        this.setState({images: images.filter(val => val.url != index)});
    }
    await AsyncStorage.removeItem('car_photo4');
    await AsyncStorage.removeItem('car_photo4_base64');
    await AsyncStorage.removeItem('car_photo4_date');
    this.setState({
      ...this.state,
      image4: null
    });
  }

  componentDidUpdate = async (prevProps, prevState) => {
    console.log('upd');
    if(prevProps.route.params.image != this.props.route.params.image) {
      if(this.state.image1 == null) {
        await AsyncStorage.setItem('car_photo1', JSON.stringify(this.props.route.params.image));
        await AsyncStorage.setItem('car_photo1_base64', JSON.stringify(this.props.route.params.image_base64));
        let d = new Date();
        await AsyncStorage.setItem('car_photo1_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

        const car_photo1 = await AsyncStorage.getItem('car_photo1');
        const car_photo1_date = await AsyncStorage.getItem('car_photo1_date');

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
        await AsyncStorage.setItem('car_photo2', JSON.stringify(this.props.route.params.image));
        await AsyncStorage.setItem('car_photo2_base64', JSON.stringify(this.props.route.params.image_base64));
         let d = new Date();
         await AsyncStorage.setItem('car_photo2_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

        const car_photo2 = await AsyncStorage.getItem('car_photo2');
        const car_photo2_date = await AsyncStorage.getItem('car_photo2_date');

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
        await AsyncStorage.setItem('car_photo3', JSON.stringify(this.props.route.params.image));
        await AsyncStorage.setItem('car_photo3_base64', JSON.stringify(this.props.route.params.image_base64));
         let d = new Date();
         await AsyncStorage.setItem('car_photo3_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

        const car_photo3 = await AsyncStorage.getItem('car_photo3');
        const car_photo3_date = await AsyncStorage.getItem('car_photo3_date');

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
        await AsyncStorage.setItem('car_photo4', JSON.stringify(this.props.route.params.image));
        await AsyncStorage.setItem('car_photo4_base64', JSON.stringify(this.props.route.params.image_base64));
        let d = new Date();
         await AsyncStorage.setItem('car_photo4_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

        const car_photo4 = await AsyncStorage.getItem('car_photo4');
        const car_photo4_date = await AsyncStorage.getItem('car_photo4_date');

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
    }
    // console.log('1as', await AsyncStorage.getItem('car_photo1'));
    // console.log('2as', await AsyncStorage.getItem('car_photo2'));
    // console.log('3as', await AsyncStorage.getItem('car_photo3'));
    // console.log('4as', await AsyncStorage.getItem('car_photo4'));
  }

  componentDidMount = async () => {
    // const all_images = await AsyncStorage.getItem('all_images');
    // console.log(all_images);
    this._navListener = this.props.navigation.addListener('focus', () => {
      this.setState({ value: true });
    });

    console.log('did',  this.props.route.params.image);
    await AsyncStorage.setItem('car_photo1', JSON.stringify(this.props.route.params.image));
    await AsyncStorage.setItem('car_photo1_base64', JSON.stringify(this.props.route.params.image_base64));
    let d = new Date();
    await AsyncStorage.setItem('car_photo1_date', JSON.stringify(d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()));

    const car_photo1 = await AsyncStorage.getItem('car_photo1');
    const car_photo1_date = await AsyncStorage.getItem('car_photo1_date');

    console.log('date', car_photo1_date)

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

  render() {
    // console.log(this.state.partyCategorySelected +'&&'+ this.state.cylinderSelected);
    let car_photo_render;
    if(this.state.image1 != null && this.state.image2 != null && this.state.image3 != null && this.state.image4 != null) {
        car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.navigate('Insurance List', { test: 'Test', type: this.state.typeSelected, compCategory: this.state.compCategorySelected, partyCategory: this.state.partyCategorySelected, cylinder: this.state.cylinderSelected, age: this.state.ageSelected, vehicle_images: this.state.images}) }} style={styles.fab}>
                            <Text style={styles.fabIcon}><Icon size={ 18 } name='check-circle'/> { I18n.t('CONFIRM') }</Text>
                          </TouchableOpacity>;
    } else {
      if(this.state.image1 == null) {
          car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.push('Vehicle Photos', { test: 'Test' }) }} style={{...styles.fab, width: 90}}>
                                <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('FRONT') }</Text>
                              </TouchableOpacity>;
      } else if (this.state.image2 == null) {
          car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.push('Vehicle Photos', { test: 'Test' }) }} style={{...styles.fab, width: 90}}>
                                <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('BACK') }</Text>
                              </TouchableOpacity>;
      } else if(this.state.image3 == null) {
          car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.push('Vehicle Photos', { test: 'Test' }) }} style={{...styles.fab, width: 90}}>
                                <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('LEFT') }</Text>
                              </TouchableOpacity>;
      } else if(this.state.image4 == null) {
          car_photo_render = <TouchableOpacity onPress={() => { this.props.navigation.push('Vehicle Photos', { test: 'Test' }) }} style={{...styles.fab, width: 90}}>
                                <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> { I18n.t('RIGHT') }</Text>
                              </TouchableOpacity>;
    }
  }

  let cylinder_render;
  if(this.state.cylinderShow == 1) {
    if(this.state.partyCategorySelected == 'station') {
      cylinder_render = <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ marginTop: 20 }}
                placeholder="Type of Insurance"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.cylinderSelected}
                onValueChange={this.onCylinderChange.bind(this)}
              >
                <Picker.Item label={ I18n.t('4') } value="4" />
                <Picker.Item label={ I18n.t('6') } value="6" />
                <Picker.Item label={ I18n.t('8') } value="8" />
              </Picker>
            </Item>;
    } else {
      cylinder_render = <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ marginTop: 20 }}
                placeholder="Type of Insurance"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.cylinderSelected}
                onValueChange={this.onCylinderChange.bind(this)}
              >
                <Picker.Item label={ I18n.t('4') } value="4" />
                <Picker.Item label={ I18n.t('6') } value="6" />
                <Picker.Item label={ I18n.t('8') } value="8" />
                <Picker.Item label={ I18n.t('12') } value="12" />
              </Picker>
            </Item>;
    }
  } else {
    cylinder_render = null
  }

  let age_render;
  if(this.state.typeSelected == 'third_party') {
    if((this.state.partyCategorySelected == 'saloon' && this.state.cylinderSelected == '4') || (this.state.partyCategorySelected == 'saloon' && this.state.cylinderSelected == '6') || (this.state.partyCategorySelected == 'saloon' && this.state.cylinderSelected == '8')) {
      age_render = <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ marginTop: 20 }}
                placeholder="Type of Insurance"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.ageSelected}
                onValueChange={this.onAgeChange.bind(this)}
              >
                <Picker.Item label={ I18n.t('25 Years') } value="25_years" />
                <Picker.Item label={ I18n.t('23 Years') } value="23_years" />
              </Picker>
            </Item>;
    } else if(this.state.partyCategorySelected == 'saloon' && this.state.cylinderSelected == '12') {
      age_render = <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ marginTop: 20 }}
                placeholder="Type of Insurance"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.ageSelected}
                onValueChange={this.onAgeChange.bind(this)}
              >
                <Picker.Item label={ I18n.t('25 Years') } value="25_years" />
              </Picker>
            </Item>;
    } else {
      age_render = <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ marginTop: 20 }}
                placeholder="Type of Insurance"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.ageSelected}
                onValueChange={this.onAgeChange.bind(this)}
              >
                <Picker.Item label={ I18n.t('25 Years') } value="25_years" />
                <Picker.Item label={ I18n.t('23 Years') } value="23_years" />
              </Picker>
            </Item>;
    }

    if((this.state.partyCategorySelected == 'station' && this.state.cylinderSelected == '4') || (this.state.partyCategorySelected == 'station' && this.state.cylinderSelected == '6') || (this.state.partyCategorySelected == 'station' && this.state.cylinderSelected == '8')  || (this.state.partyCategorySelected == 'station' && this.state.cylinderSelected == '12')) {
      age_render = <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ marginTop: 20 }}
                placeholder="Type of Insurance"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.ageSelected}
                onValueChange={this.onAgeChange.bind(this)}
              >
                <Picker.Item label={ I18n.t('25 Years') } value="25_years" />
                <Picker.Item label={ I18n.t('23 Years') } value="23_years" />
              </Picker>
            </Item>;
    }

    if((this.state.partyCategorySelected == 'sport' && this.state.cylinderSelected == '4') || (this.state.partyCategorySelected == 'sport' && this.state.cylinderSelected == '6') || (this.state.partyCategorySelected == 'sport' && this.state.cylinderSelected == '8')  || (this.state.partyCategorySelected == 'sport' && this.state.cylinderSelected == '12')) {
      age_render = <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ marginTop: 20 }}
                placeholder="Type of Insurance"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.ageSelected}
                onValueChange={this.onAgeChange.bind(this)}
              >
                <Picker.Item label={ I18n.t('25 Years') } value="25_years" />
                <Picker.Item label={ I18n.t('Age Between 20 and 25 Years') } value="age_between_20_25_years" />
              </Picker>
            </Item>;
    }
  } else {
    age_render = <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ marginTop: 20 }}
                placeholder="Type of Insurance"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.ageSelected}
                onValueChange={this.onAgeChange.bind(this)}
              >
                <Picker.Item label={ I18n.t('Above 23 Years') } value="above_23_years" />
              </Picker>
            </Item>;
  }

    return (
      <>
        <Modal visible={this.state.showModal} transparent={true} onRequestClose={() => { this.setState({ showModal: false }) }}>
          <ImageViewer imageUrls={this.state.images} enableSwipeDown={true} index={this.state.index} onSwipeDown={ this.close }/>
        </Modal>
        <Container>
          <ImageBackground source={require('../assets/take_care.jpeg')} style = {{ height: 150, marginBottom: 20 }}>
            <Text style={{ marginTop: 100, textAlign: 'center' }}><Text style={{ color: '#fff', fontSize: 18 }}>{ I18n.t('THIS IS HOW WE') }</Text><Text style={{ fontSize: 18, color: '#E86143', fontWeight: 'bold' }}> { I18n.t('TAKE CARE OF YOU') }</Text></Text>
          </ImageBackground>
          {/*<StepIndicator
               customStyles={customStyles}
               currentPosition={this.state.currentPosition}
               labels={labels}
               stepCount= {5}
          />*/}
          <Content padder>
          <View style={{ marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          { this.state.image1 ?
          (
            <TouchableOpacity onPress= { () => {this.changeIndex(this.state.image1)} }>
              <Text style={{ fontSize: 9 }}>{ this.state.image1_date }</Text>
              <Thumbnail large source={{uri: this.state.image1}}/>
              <Text onPress={ this.removeImage1 } style={{ color: '#fc0303', fontSize: 13 }}><Icon  size={ 18 } name='times'/> { I18n.t('REMOVE') }</Text>
            </TouchableOpacity>
          ) : null
          }

          { this.state.image2 ?
          (
            <TouchableOpacity onPress={ () => {this.changeIndex(this.state.image2)} }>
              <Text style={{ fontSize: 9 }}>{ this.state.image2_date }</Text>
              <Thumbnail large source={{uri: this.state.image2}}/>
              <Text onPress={ this.removeImage2 } style={{ color: '#fc0303', fontSize: 13 }}><Icon  size={ 18 } name='times'/> { I18n.t('REMOVE') }</Text>
            </TouchableOpacity>
          ) : null
          }

          { this.state.image3 ?
          (
            <TouchableOpacity onPress={ () => {this.changeIndex(this.state.image3)} }>
              <Text style={{ fontSize: 9 }}>{ this.state.image3_date }</Text>
              <Thumbnail large source={{uri: this.state.image3}}/>
              <Text onPress={ this.removeImage3 } style={{ color: '#fc0303', fontSize: 13 }}><Icon  size={ 18 } name='times'/> { I18n.t('REMOVE') }</Text>
            </TouchableOpacity>
          ): null
          }

          { this.state.image4 ?
          (
            <TouchableOpacity onPress={ () => {this.changeIndex(this.state.image4)} }>
              <Text style={{ fontSize: 9 }}>{ this.state.image4_date }</Text>
              <Thumbnail large source={{uri: this.state.image4}}/>
              <Text onPress={ this.removeImage4 } style={{ color: '#fc0303', fontSize: 13 }}><Icon  size={ 18 } name='times'/> { I18n.t('REMOVE') }</Text>
            </TouchableOpacity>
          ) : null
          }
          </View>
          {(this.state.image1 != null && this.state.image2 != null && this.state.image3 != null && this.state.image4 != null) ?
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ marginTop: 20 }}
                placeholder="Type of Insurance"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.typeSelected}
                onValueChange={this.onTypeChange.bind(this)}
              >
                {/*<Picker.Item label={ I18n.t("SELECT TYPE OF INSURANCE") } value="0" />*/}
                <Picker.Item label={ I18n.t("COMPREHENSIVE") } value="comprehensive" />
                <Picker.Item label={ I18n.t("3rd PARTY") } value="third_party" />
              </Picker>
            </Item> : null
          }
            { (this.state.image1 != null && this.state.image2 != null && this.state.image3 != null && this.state.image4 != null && this.state.categoryShow != 1) ?
            (<Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ marginTop: 20 }}
                placeholder="Type of Insurance"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.partyCategorySelected}
                onValueChange={this.onPartyCategoryChange.bind(this)}
              >
                <Picker.Item label={ I18n.t("SALOON") } value="saloon" />
                <Picker.Item label={ I18n.t("STATION") } value="station" />
                <Picker.Item label={ I18n.t("SPORT") } value="sport" />
              </Picker>
            </Item>)
            :
            (this.state.image1 != null && this.state.image2 != null && this.state.image3 != null && this.state.image4 != null && <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ marginTop: 20 }}
                placeholder="Type of Insurance"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.compCategorySelected}
                onValueChange={this.onCompCategoryChange.bind(this)}
              >
                <Picker.Item label={ I18n.t("SALOON GCC") } value="saloon_gcc" />
                <Picker.Item label={ I18n.t("4WD GCC") } value="4wd_gcc" />
                <Picker.Item label={ I18n.t("SPORT 2 DOOR GCC") } value="sport_2_door_gcc" />
                <Picker.Item label={ I18n.t("P/ UP GCC /Luxury Only") } value="p_up_gcc_luxury_only" />
              </Picker>
            </Item>)
            }
            { this.state.image1 != null && this.state.image2 != null && this.state.image3 != null && this.state.image4 != null && cylinder_render }
            { this.state.image1 != null && this.state.image2 != null && this.state.image3 != null && this.state.image4 != null && age_render }
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
