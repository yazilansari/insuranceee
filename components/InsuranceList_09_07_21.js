import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Card, CardItem, Left, Button, Text, Footer, FooterTab } from 'native-base';
import { StyleSheet, View, Modal, TouchableOpacity, Image, ImageBackground, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

  I18n.fallbacks = true;
  I18n.translations = {
    'en': require('./translations/en'),
    'ar': require('./translations/ar'),
  }

export default class InsuranceList extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        flag: 0,
        url: null,
        price: 0
      };
  }

  onSubmit = async (price) => {
    var price = price;
    price = 1;
    const visitor_data = await AsyncStorage.getItem('visitor_data');
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
    }
      this.setState({ loading: true });
      const payment_data = {
          "amount": price,
          "currency": "AED",
          "threeDSecure": true,
          "save_card": false,
          "customer": customer_data,
          "source": {
            "id": "src_card"
          },
          "redirect": {
            "url": "https://vervestack.com/insure/payment_success"
          }
        }
        // console.log(payment_data);
        const headers = {
          "Content-Type": "application/json",
          // "authorization": "Bearer sk_live_IA2bX8oCr1Z97McmQfKLhBTn",
          "authorization": "Bearer sk_live_IA2bX8oCr1Z97McmQfKLhBTn",
        }
       axios.post(`https://api.tap.company/v2/charges`, payment_data, {
                    headers: headers
      })
        .then(async res => {

          var flag = await AsyncStorage.getItem('flag');
          var type = flag;

          var visitor = customer_data;

          var registration_card1_base64 = await AsyncStorage.getItem('registration_card1_base64');
          var registration_card1 = "data:image/jpg;base64," + registration_card1_base64;

          var registration_card2_base64 = await AsyncStorage.getItem('registration_card2_base64');
          var registration_card2 = "data:image/jpg;base64," + registration_card2_base64;

          var emirates_id1_base64 = await AsyncStorage.getItem('emirates_id1_base64');
          var emirates_id1 = "data:image/jpg;base64," + emirates_id1_base64;

          var emirates_id2_base64 = await AsyncStorage.getItem('emirates_id2_base64');
          var emirates_id2 = "data:image/jpg;base64," + emirates_id2_base64;

          var driving_license1_base64 = await AsyncStorage.getItem('driving_license1_base64');
          var driving_license1 = "data:image/jpg;base64," + driving_license1_base64;

          var driving_license2_base64 = await AsyncStorage.getItem('driving_license2_base64');
          var driving_license2 = "data:image/jpg;base64," + driving_license2_base64;

          var passing_certificate_base64 = await AsyncStorage.getItem('passing_certificate_base64');
          var passing_certificate = "data:image/jpg;base64," + passing_certificate_base64;

          var car_photo1_base64 = await AsyncStorage.getItem('car_photo1_base64');
          var car_photo1 = "data:image/jpg;base64," + car_photo1_base64;

          var car_photo2_base64 = await AsyncStorage.getItem('car_photo2_base64');
          var car_photo2 = "data:image/jpg;base64," + car_photo2_base64;

          var car_photo3_base64 = await AsyncStorage.getItem('car_photo3_base64');
          var car_photo3 = "data:image/jpg;base64," + car_photo3_base64;

          var car_photo4_base64 = await AsyncStorage.getItem('car_photo4_base64');
          var car_photo4 = "data:image/jpg;base64," + car_photo4_base64;

          var data = {
            registration_card1: registration_card1,
            registration_card2: registration_card2,
            emirates_id1: emirates_id1,
            emirates_id2: emirates_id2,
            driving_license1: driving_license1,
            driving_license2: driving_license2,
            passing_certificate: passing_certificate,
            car_photo1: car_photo1,
            car_photo2: car_photo2,
            car_photo3: car_photo3,
            car_photo4: car_photo4,
            price: price,
            type: type,
            visitor: visitor,
            visitor_id: visitor_id
          }
          var self = this;
          axios.post(`https://vervestack.com/insure/services/order_store`, data, {
          })
            .then(function (response) {
              console.log("response :", response.data);
              self.setState({ loading: false });
              self.setState({ url: res.data.transaction.url });
              self.setState({ flag: 1 });
           })
           .catch(function (error) {
                    console.log("error from image :", error);
           });

        }).catch(err => {
          console.log(err);
        });
  }

  LoadingIndicatorView = () => {
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size="large" color="tomato" />;
  }

  componentDidMount = async () => {
    console.log('componentDidMount');
    this.setState({ loading: true });
    var self = this;
    axios.post(`https://vervestack.com/insure/services/get_price/${this.props.route.params.compCategory}/${this.props.route.params.partyCategory}/${this.props.route.params.age}/${this.props.route.params.cylinder}`)
    .then(function (response) {
      console.log("response :", response.data.data.price);
      self.setState({ loading: false });
      self.setState({ price: response.data.data.price });
      // self.setState({ flag: 1 });
   })
   .catch(function (error) {
            console.log("error :", error);
   });
    // console.log('Regist1', await AsyncStorage.getItem('registration_card1'));
    // console.log('Regist2', await AsyncStorage.getItem('registration_card2'));
    // console.log('Emir1', await AsyncStorage.getItem('emirates_id1'));
    // console.log('Emir2', await AsyncStorage.getItem('emirates_id2'));
    // console.log('Driv1', await AsyncStorage.getItem('driving_license1'));
    // console.log('Driv2', await AsyncStorage.getItem('driving_license2'));
    // console.log('pass', await AsyncStorage.getItem('passing_certificate'));
    // console.log('car1', await AsyncStorage.getItem('car_photo1'));
    // console.log('car2', await AsyncStorage.getItem('car_photo2'));
    // console.log('car3', await AsyncStorage.getItem('car_photo3'));
    // console.log('car4', await AsyncStorage.getItem('car_photo4'));
    // console.log('flag', await AsyncStorage.getItem('flag'));
    this._navListener = this.props.navigation.addListener('focus', () => {
      this.setState({ value: true });
    });
  }

  render() {
    // console.log('render', this.props.route.params.compCategory, this.props.route.params.partyCategory);
    // console.log(this.props.route.params.compCategory, this.props.route.params.partyCategory, this.props.route.params.cylinder, this.props.route.params.age);
    let price = this.state.price;
    // if(this.props.route.params.compCategory == 'saloon_gcc' && this.props.route.params.age == 'above_23_years') {
    //   price = 910;
    // } else if(this.props.route.params.compCategory == '4wd_gcc' && this.props.route.params.age == 'above_23_years') {
    //   price = 1400;
    // } else if(this.props.route.params.compCategory == 'sport_2_door_gcc' && this.props.route.params.age == 'above_23_years') {
    //   price = 1650;
    // } else if(this.props.route.params.compCategory == 'p_up_gcc_luxury_only' && this.props.route.params.age == 'above_23_years') {
    //   price = 1700;
    // }

    // else if(this.props.route.params.partyCategory == 'saloon' && this.props.route.params.age == '25_years' && this.props.route.params.cylinder == '4') {
    //   price = 551;
    // } else if(this.props.route.params.partyCategory == 'saloon' && this.props.route.params.age == '25_years' && this.props.route.params.cylinder == '6') {
    //   price = 624;
    // } else if(this.props.route.params.partyCategory == 'saloon' && this.props.route.params.age == '25_years' && this.props.route.params.cylinder == '8') {
    //   price = 698;
    // } else if(this.props.route.params.partyCategory == 'saloon' && this.props.route.params.age == '25_years' && this.props.route.params.cylinder == '12') {
    //   price = 955;
    // }

    // else if(this.props.route.params.partyCategory == 'saloon' && this.props.route.params.age == '23_years' && this.props.route.params.cylinder == '4') {
    //   price = 473;
    // } else if(this.props.route.params.partyCategory == 'saloon' && this.props.route.params.age == '23_years' && this.props.route.params.cylinder == '6') {
    //   price = 536;
    // } else if(this.props.route.params.partyCategory == 'saloon' && this.props.route.params.age == '23_years' && this.props.route.params.cylinder == '8') {
    //   price = 599;
    // }

    // else if(this.props.route.params.partyCategory == 'station' && this.props.route.params.age == '25_years' && this.props.route.params.cylinder == '4') {
    //   price = 735;
    // } else if(this.props.route.params.partyCategory == 'station' && this.props.route.params.age == '25_years' && this.props.route.params.cylinder == '6') {
    //   price = 772;
    // } else if(this.props.route.params.partyCategory == 'station' && this.props.route.params.age == '25_years' && this.props.route.params.cylinder == '8') {
    //   price = 809;
    // }

    // else if(this.props.route.params.partyCategory == 'station' && this.props.route.params.age == '23_years' && this.props.route.params.cylinder == '4') {
    //   price = 630;
    // } else if(this.props.route.params.partyCategory == 'station' && this.props.route.params.age == '23_years' && this.props.route.params.cylinder == '6') {
    //   price = 662;
    // } else if(this.props.route.params.partyCategory == 'station' && this.props.route.params.age == '23_years' && this.props.route.params.cylinder == '8') {
    //   price = 693;
    // }

    // else if(this.props.route.params.partyCategory == 'sport' && this.props.route.params.age == '25_years' && this.props.route.params.cylinder == '4') {
    //   price = 1500;
    // } else if(this.props.route.params.partyCategory == 'sport' && this.props.route.params.age == '25_years' && this.props.route.params.cylinder == '6') {
    //   price = 1700;
    // } else if(this.props.route.params.partyCategory == 'sport' && this.props.route.params.age == '25_years' && this.props.route.params.cylinder == '8') {
    //   price = 2000;
    // } else if(this.props.route.params.partyCategory == 'sport' && this.props.route.params.age == '25_years' && this.props.route.params.cylinder == '12') {
    //   price = 2200;
    // }

    // else if(this.props.route.params.partyCategory == 'sport' && this.props.route.params.age == 'age_between_20_25_years' && this.props.route.params.cylinder == '4') {
    //   price = 1700;
    // } else if(this.props.route.params.partyCategory == 'sport' && this.props.route.params.age == 'age_between_20_25_years' && this.props.route.params.cylinder == '6') {
    //   price = 1900;
    // } else if(this.props.route.params.partyCategory == 'sport' && this.props.route.params.age == 'age_between_20_25_years' && this.props.route.params.cylinder == '8') {
    //   price = 2100;
    // } else if(this.props.route.params.partyCategory == 'sport' && this.props.route.params.age == 'age_between_20_25_years' && this.props.route.params.cylinder == '12') {
    //   price = 2200;
    // }

    let render_data;
    if(this.state.loading) {
      render_data = <ActivityIndicator style={{ marginTop: 20 }} size="large" color="tomato" />;
    } else if(!this.state.loading && this.state.flag == 0) {
      render_data = <Container>
         <ImageBackground source={require('../assets/take_care.jpeg')} style = {{ height: 150 }}>
            <Text style={{ marginTop: 100, textAlign: 'center' }}><Text style={{ color: '#fff', fontSize: 18 }}>{ I18n.t('THIS IS HOW WE') }</Text><Text style={{ fontSize: 18, color: '#E86143', fontWeight: 'bold' }}> { I18n.t('TAKE CARE OF YOU') }</Text></Text>
        </ImageBackground>
        <Content padder>
        <Card>
          <TouchableOpacity>
             <CardItem bordered>
               <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'  }}>
                  <Image source={require('../assets/insurance_list.png')} style={{height: 50, width: 80}}/>
                  <Text style={{ color: '#3C2949', fontWeight: 'bold', fontSize: 14, marginTop: 10 }}>{ I18n.t('ANNUAL QUOTE') }</Text>
                  <View>
                  {(this.props.route.params.flag != 'rate_calculator') ?
                    <Button rounded onPress={ () => { this.onSubmit(price) }} style={{ backgroundColor: '#3C2949', padding: 5 }}>
                      <Text style={{ color: '#fff', fontWeight: 'bold'}}>AED { price }</Text>
                    </Button> :
                    <Button rounded style={{ backgroundColor: '#3C2949', padding: 5 }}>
                      <Text style={{ color: '#fff', fontWeight: 'bold'}}>AED { price }</Text>
                    </Button>
                  }
                    {(this.props.route.params.flag != 'rate_calculator') ?
                    <TouchableOpacity onPress={ () => { this.onSubmit(price) }}>
                      <Text style={{ color: '#000', marginLeft: 23, fontSize: 12}}>{ I18n.t('BUY NOW') }</Text>
                    </TouchableOpacity> : null
                    }
                  </View>
                </View>
             </CardItem>
          </TouchableOpacity>
        </Card>
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
      </Container>;
    } else if(!this.state.loading && this.state.flag == 1) {
      render_data = <WebView source={{ uri: this.state.url }} renderLoading={this.LoadingIndicatorView} startInLoadingState={true}/>;
    }
    return (
        <>{ render_data }</>
    );
  }
}