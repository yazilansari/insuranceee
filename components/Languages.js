import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Card, CardItem, Left, Button, Text, Footer, FooterTab } from 'native-base';
import { StyleSheet, View, Modal, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

  I18n.fallbacks = true;
  I18n.translations = {
    'en': require('./translations/en'),
    'ar': require('./translations/ar'),
  }

export default class Languages extends Component {

  constructor(props) {
    super(props);
    this.state = {
      langValue: "en",
      value: false
    }
  }

  onSelectedLang = async text => {
    // console.log(';;;', text)
    await AsyncStorage.setItem(
      'Language',
      JSON.stringify(text)
    );
    I18n.locale = text;
    this.setState({ value: true });
    // this.props.navigation.navigate('Languages');
  }

  render() {
    return (
      <Container>
         <ImageBackground source={require('../assets/take_care.jpeg')} style = {{ height: 150 }}>
            <Text style={{ marginTop: 100, textAlign: 'center' }}><Text style={{ color: '#fff', fontSize: I18n.t('PASSPORT FONT SIZE') }}>{ I18n.t('THIS IS HOW WE') }</Text><Text style={{ fontSize: I18n.t('PASSPORT FONT SIZE'), color: '#E86143', fontWeight: 'bold' }}> { I18n.t('TAKE CARE OF YOU') }</Text></Text>
          </ImageBackground>
        <Content padder>
        <View style={{ marginTop: 10 }}>
         <Card>
         <TouchableOpacity onPress={() => { this.onSelectedLang('en') }}>
           <CardItem bordered>
              <Image source={require('../assets/usa.png')} style={{height: 50, width: 50}}/>
                <Button transparent>
                  <Text style={{ color: '#3C2949' }}>{ I18n.t('ENGLISH') }</Text>
                </Button>
           </CardItem>
           </TouchableOpacity>
          </Card>

          <Card>
            <TouchableOpacity onPress={() => { this.onSelectedLang('ar') }}>
             <CardItem bordered>
              <Image source={require('../assets/uae.png')} style={{height: 50, width: 50}}/>
                  <Button transparent>
                    <Text style={{ color: '#3C2949' }}>{ I18n.t('ARABIC') }</Text>
                  </Button>
             </CardItem>
            </TouchableOpacity>
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
              <Icon style={{ color: '#fff', fontSize: 25 }} name="globe" />
              <Text style={{ color: '#fff' }}>{ I18n.t('LANGUAGES') }</Text>
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