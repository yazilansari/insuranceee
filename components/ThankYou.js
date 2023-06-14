import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Card, CardItem, Left, Button, Text, Footer, FooterTab } from 'native-base';
import { StyleSheet, View, Modal, TouchableOpacity, Image, ImageBackground, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from 'react-native-i18n';
import axios from 'axios';

  I18n.fallbacks = true;
  I18n.translations = {
    'en': require('./translations/en'),
    'ar': require('./translations/ar'),
  }

export default class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        flag: 0,
      };
  }

  componentDidMount = async () => {
    const visitor_data = await AsyncStorage.getItem('visitor_data');
    const otp_visitor_data = await AsyncStorage.getItem('otp_visitor_data');
    let customer_data = {
              "first_name": "Test",
              "email": "test@gmail.com",
              "phone": {
                "country_code": "971",
                "number": "1234567890"
              }
    }
    let visitor_id = 0;
    if (visitor_data !== null) {
      // console.log('hvhv');
        let data = JSON.parse(visitor_data);
        customer_data = {
              "first_name": data.visitor_first_name,
              "email": data.visitor_email,
              "phone": {
                "country_code": "971",
                "number": data.visitor_mobile
              }
        }
        visitor_id = data.visitor_id;
    } else if(otp_visitor_data !== null) {
      let mobile = JSON.parse(otp_visitor_data);
        customer_data = {
              "first_name": "OTP User",
              "email": "user@gmail.com",
              "phone": {
                "country_code": "971",
                "number": mobile
              }
    }
      let visitor_id = 0;
    }
    // console.log('000000', customer_data);return;
    this.setState({ loading: true });
    var flag = await AsyncStorage.getItem('flag');
    var type = flag;
    var visitor = customer_data;
    var passport_photo1_base64 = await AsyncStorage.getItem('passport_photo1_base64');
    var passport_photo1 = "data:image/jpg;base64," + passport_photo1_base64;

    var passport_photo2_base64 = await AsyncStorage.getItem('passport_photo2_base64');
    var passport_photo2 = "data:image/jpg;base64," + passport_photo2_base64;

    var emirate_id_photo1_base64 = await AsyncStorage.getItem('emirate_id_photo1_base64');
    var emirate_id_photo1 = "data:image/jpg;base64," + emirate_id_photo1_base64;

    var emirate_id_photo2_base64 = await AsyncStorage.getItem('emirate_id_photo2_base64');
    var emirate_id_photo2 = "data:image/jpg;base64," + emirate_id_photo2_base64;

    var data = {
      passport_photo1: passport_photo1,
      passport_photo2: passport_photo2,
      emirate_id_photo1: emirate_id_photo1,
      emirate_id_photo2: emirate_id_photo2,
      type: type,
      visitor: visitor,
      visitor_id: visitor_id
    }
    var self = this;
          axios.post(`https://gfs-ae.com/insure/services/health_order_store`, data, {
          })
            .then(function (response) {
              console.log("response :", response.data);
              self.setState({ loading: false });
              self.setState({ flag: 1 });
           })
           .catch(function (error) {
                    console.log("error from image :", error);
           });
  }

  render() {
    let render_data;
    if(this.state.loading && this.state.flag == 0) {
      render_data = <ActivityIndicator style={{ marginTop: 20 }} size="large" color="tomato" />;
    } else {
      render_data = <CardItem style={{ justifyContent: 'center' }}><Text style={{ color: '#3C2949', fontWeight: 'bold', fontSize: 16 }}>{ I18n.t('THANK YOU SUBMITTING YOUR DETAILS') }. {"\n"}{ I18n.t('OUR CUSTOMER SERVICE REPRESENTATIVE WILL GET IN TOUCH  WITH YOU SOON') }.</Text></CardItem>;
    }
    return (
      <Container>
         <ImageBackground source={require('../assets/medical.jpg')} style = {{ height: 150 }}>
            <Text style={{ marginTop: 100, textAlign: 'center' }}><Text style={{ color: '#fff', fontSize: 18 }}>{ I18n.t('THIS IS HOW WE') }</Text><Text style={{ fontSize: 18, color: '#E86143', fontWeight: 'bold' }}> { I18n.t('TAKE CARE OF YOU') }</Text></Text>
        </ImageBackground>
        <Content padder>
          { render_data }
        </Content>
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
      </Container>
    );
  }
}