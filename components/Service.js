import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Card, CardItem, Left, Button, Text, Footer, FooterTab } from 'native-base';
import { StyleSheet, View, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

  I18n.fallbacks = true;
  I18n.translations = {
    'en': require('./translations/en'),
    'ar': require('./translations/ar'),
  }

export default class Service extends Component {

  constructor(props) {
    super(props);
  }

 /* componentDidMount = async () => {
    const language = await AsyncStorage.getItem('Language');
    I18n.locale = JSON.parse(language);
    // this.setState({ value: true });
    // this.props.navigation.navigate('Languages');
  }
  
  componentDidUpdate = async () => {
    const language = await AsyncStorage.getItem('Language');
    I18n.locale = JSON.parse(language);
  }*/

  componentDidMount = async() => {
    // console.log('000....');
    await AsyncStorage.removeItem('registration_card1');
    await AsyncStorage.removeItem('registration_card1_base64');
    await AsyncStorage.removeItem('registration_card1_date');

    await AsyncStorage.removeItem('registration_card2');
    await AsyncStorage.removeItem('registration_card2_base64');
    await AsyncStorage.removeItem('registration_card2_date');

    await AsyncStorage.removeItem('emirates_id1');
    await AsyncStorage.removeItem('emirates_id1_base64');
    await AsyncStorage.removeItem('emirates_id1_date');

    await AsyncStorage.removeItem('emirates_id2');
    await AsyncStorage.removeItem('emirates_id2_base64');
    await AsyncStorage.removeItem('emirates_id2_date');

    await AsyncStorage.removeItem('driving_license1');
    await AsyncStorage.removeItem('driving_license1_base64');
    await AsyncStorage.removeItem('driving_license1_date');

    await AsyncStorage.removeItem('driving_license2');
    await AsyncStorage.removeItem('driving_license2_base64');
    await AsyncStorage.removeItem('driving_license2_date');

    await AsyncStorage.removeItem('passing_certificate');
    await AsyncStorage.removeItem('passing_certificate_base64');
    await AsyncStorage.removeItem('passing_certificate_date');

    await AsyncStorage.removeItem('car_photo1');
    await AsyncStorage.removeItem('car_photo1_base64');
    await AsyncStorage.removeItem('car_photo1_date');

    await AsyncStorage.removeItem('car_photo2');
    await AsyncStorage.removeItem('car_photo2_base64');
    await AsyncStorage.removeItem('car_photo2_date');

    await AsyncStorage.removeItem('car_photo3');
    await AsyncStorage.removeItem('car_photo3_base64');
    await AsyncStorage.removeItem('car_photo3_date');

    await AsyncStorage.removeItem('car_photo4');
    await AsyncStorage.removeItem('car_photo4_base64');
    await AsyncStorage.removeItem('car_photo4_date');

    // await AsyncStorage.removeItem('otp_visitor_data');

    await AsyncStorage.removeItem('visitor_email');

    await AsyncStorage.removeItem('passport_photo1');
    await AsyncStorage.removeItem('passport_photo1_base64');
    await AsyncStorage.removeItem('passport_photo1_date');

    await AsyncStorage.removeItem('passport_photo2');
    await AsyncStorage.removeItem('passport_photo2_base64');
    await AsyncStorage.removeItem('passport_photo2_date');

    await AsyncStorage.removeItem('emirate_id_photo1');
    await AsyncStorage.removeItem('emirate_id_photo1_base64');
    await AsyncStorage.removeItem('emirate_id_photo1_date');

    await AsyncStorage.removeItem('emirate_id_photo2');
    await AsyncStorage.removeItem('emirate_id_photo2_base64');
    await AsyncStorage.removeItem('emirate_id_photo2_date');

    this._navListener = this.props.navigation.addListener('focus', () => {
      this.setState({ value: true });
    });
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          
            <Text style={{ marginTop: 20, textAlign: 'center', color: '#3C2949', fontWeight: 'bold' }}>{ I18n.t('INSURANCE AT YOUR FINGERTIPS') }</Text>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Vehicle Insurance', { test: "Test" }) }}>
              <ImageBackground source={require('../assets/car_insurance.jpeg')} style = {{ marginTop: 20 }}>
                  <Text style={{ textAlign: 'center', marginTop: 210, fontSize: 25, color: '#3C2949' }}><Text style={{ color: '#3C2949', fontSize: 25, fontWeight: 'bold' }}>{ I18n.t('VEHICLE') }</Text> { I18n.t('INSURANCE') }</Text>
              </ImageBackground>
            </TouchableOpacity>
          

          {/*<View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Vehicle Insurance', { flag: "medical", name: "Health Insurance" }) }}>
              <ImageBackground source={require('../assets/health_insurance.jpg')} style = {{ marginTop: 30 }}>
                  <Text style={{ textAlign: 'center', marginTop: 210, fontSize: 25, color: '#3C2949' }}><Text style={{ color: '#3C2949', fontSize: 25, fontWeight: 'bold' }}>{ I18n.t('INSURANCEE') }</Text> { I18n.t('HEALTH') }</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>*/}

          
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Vehicle Insurance', { flag: "marine", name: "Marine Insurance" }) }}>
              <ImageBackground source={require('../assets/marine_insurance2.jpg')} style = {{ marginTop: 60 }}>
                  <Text style={{ textAlign: 'center', marginTop: 210, fontSize: 25, color: '#3C2949' }}><Text style={{ color: '#3C2949', fontSize: 25, fontWeight: 'bold' }}>{ I18n.t('MARINE') }</Text> { I18n.t('INSURANCEEEEE') }</Text>
              </ImageBackground>
            </TouchableOpacity>
          
        </View>
        <Footer>
          <FooterTab style={{ backgroundColor: '#E86143' }}>
            <Button vertical onPress={()=> { this.props.navigation.navigate('Services', { test: 'Test' }) }}>
              <Icon style={{ color: '#fff', fontSize: 25 }} name="home" />
              <Text style={{ color: '#fff' }}>{ I18n.t('HOME') }</Text>
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
      </Container>

    );
  }
}

