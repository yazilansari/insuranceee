import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Card, CardItem, Left, Button, Text, Footer, FooterTab } from 'native-base';
import { StyleSheet, View, Modal, TouchableOpacity, Image, ImageBackground, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

  I18n.fallbacks = true;
  I18n.translations = {
    'en': require('./translations/en'),
    'ar': require('./translations/ar'),
  }

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  onLogout = async () => {
     await AsyncStorage.removeItem('visitor_data');
     await AsyncStorage.removeItem('otp_visitor_data');
     // const visitor_data = await AsyncStorage.getItem('visitor_data');
     // console.log(visitor_data);
     this.props.navigation.navigate('Login');
  }

  componentDidMount = async () => {
    const otp_visitor_data = await AsyncStorage.getItem('otp_visitor_data');
    console.log('componentDidMount', otp_visitor_data);
    const visitor_data = await AsyncStorage.getItem('visitor_data');
    if (visitor_data !== null) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
    this._navListener = this.props.navigation.addListener('focus', () => {
      this.setState({ value: true });
    });
  }
  
  render() {
    return (
      <Container>
         <ImageBackground source={require('../assets/take_care.jpeg')} style = {{ height: 150 }}>
         <Text style={{ marginTop: 100, textAlign: 'center' }}><Text style={{ color: '#fff', fontSize: I18n.t('PASSPORT FONT SIZE') }}>{ I18n.t('THIS IS HOW WE') }</Text><Text style={{ fontSize: I18n.t('PASSPORT FONT SIZE'), color: '#E86143', fontWeight: 'bold' }}> { I18n.t('TAKE CARE OF YOU') }</Text></Text>
          </ImageBackground>
        <Content padder>
        <View style={{ marginTop: 10 }}>
        {(this.state.show) ?
         <Card>
         <TouchableOpacity onPress={ ()=> { this.props.navigation.navigate('Profile', { test: 'Test' }) } }>
           <CardItem bordered>
              <Icon onPress={ ()=> { this.props.navigation.navigate('Profile') } } style={{ color: '#3C2949', fontSize: 25 }} name="user-o" />
                <Button transparent onPress={ ()=> { this.props.navigation.navigate('Profile') } }>
                  <Text style={{ color: '#3C2949' }}>{ I18n.t('EDIT PROFILE') }</Text>
                </Button>
           </CardItem>
           </TouchableOpacity>
          </Card> : null
        }
          <Card>
         <TouchableOpacity onPress={ ()=> { this.props.navigation.navigate('Rate Calculator', { test: 'Test', name: "Premium Calculator" }) } }>
           <CardItem bordered>
              <Icon onPress={ ()=> { this.props.navigation.navigate('Rate Calculator', { test: 'Test', name: "Premium Calculator" }) } } style={{ color: '#3C2949', fontSize: 25 }} name="calculator" />
                <Button transparent onPress={ ()=> { this.props.navigation.navigate('Rate Calculator', { test: 'Test', name: "Premium Calculator" }) } }>
                  <Text style={{ color: '#3C2949' }}>{ I18n.t('PREMIUM CALCULATOR') }</Text>
                </Button>
           </CardItem>
           </TouchableOpacity>
          </Card>

          <Card>
            <TouchableOpacity onPress={ this.onLogout }>
             <CardItem bordered>
              <Icon onPress={ this.onLogout } style={{ color: '#3C2949', fontSize: 25 }} name="sign-out" />
                  <Button transparent onPress={ this.onLogout }>
                    <Text style={{ color: '#3C2949' }}>{ I18n.t('LOGOUT') }</Text>
                  </Button>
             </CardItem>
            </TouchableOpacity>
          </Card>

          <Card style={{ padding: 10}}>
             {/*<CardItem bordered>*/}
                <Text style={{ color: '#3C2949', fontWeight: 'bold' }}>{ I18n.t('FOR GENERAL SUPPORT') }: </Text><TouchableOpacity onPress={ ()=> Linking.openURL('mailto:support@gfs-ae.com?subject=General Support') }><Text style= {{ textDecorationLine: 'underline' }}>support@gfs-ae.com</Text></TouchableOpacity>
                <Text style={{ color: '#3C2949', marginTop: 20, fontWeight: 'bold' }}>{ I18n.t('FOR SUPPORT RELATED TO AUTO INSURANCE') }: </Text><TouchableOpacity onPress={ ()=> Linking.openURL('mailto:auto-inquiries@gfs-ae.com?subject=Auto Insurance Support') }><Text style= {{ textDecorationLine: 'underline' }}>auto-inquiries@gfs-ae.com</Text></TouchableOpacity>
                <Text style={{ color: '#3C2949', marginTop: 20, fontWeight: 'bold' }}>{ I18n.t('FOR SUPPORT RELATED TO HEALTH INSURANCE') }: </Text><TouchableOpacity onPress={ ()=> Linking.openURL('mailto:health-inquiries@gfs-ae.com?subject=Health Insurance Support') }><Text style= {{ textDecorationLine: 'underline' }}>health-inquiries@gfs-ae.com</Text></TouchableOpacity>
             {/*</CardItem>*/}
          </Card>

          <Card style={{ padding: 10}}>
             {/*<CardItem bordered>*/}
                <Text style={{ color: '#3C2949', fontWeight: 'bold' }}>{ I18n.t('FOR WHATSAPP') }: </Text><TouchableOpacity><Text style= {{ textDecorationLine: 'underline', textAlign: I18n.t('WHATS APP NUMBER ALIGN') }}>{ I18n.t('NUMBER') }</Text></TouchableOpacity>
                {/*<Text style={{ color: '#3C2949', marginTop: 20, fontWeight: 'bold' }}>{ I18n.t('FOR ARABIC WHATSAPP') }: </Text><TouchableOpacity><Text style= {{ textDecorationLine: 'underline' }}>0543396430</Text></TouchableOpacity>*/}
             {/*</CardItem>*/}
          </Card>
          </View>
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
              <Icon style={{ color: '#fff', fontSize: 25 }} name="user" />
              <Text style={{ color: '#fff' }}>{ I18n.t('SETTINGS') }</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}