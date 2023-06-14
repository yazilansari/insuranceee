import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Card, CardItem, Left, Button, Text, Footer, FooterTab } from 'native-base';
import { StyleSheet, View, Modal, TouchableOpacity, Image, ImageBackground, Linking, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

  I18n.fallbacks = true;
  I18n.translations = {
    'en': require('./translations/en'),
    'ar': require('./translations/ar'),
  }

export default class ViewBenefits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      benefits: '',
      loading: false,
    }
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    var self = this;
      axios.post(`https://gfs-ae.com/insure/services/get_benefits/${this.props.route.params.insurance_company_id}`)
      .then(function (response) {
        console.log("response :", response.data);
        // return;
        self.setState({ loading: false });
        self.setState({ benefits: response.data });
     })
     .catch(function (error) {
        console.log("error :", error);
     });
    this._navListener = this.props.navigation.addListener('focus', () => {
      this.setState({ value: true });
    });
  }
  
  render() {
    return (
      <>
      {(this.state.loading) ? <ActivityIndicator style={{ marginTop: 20 }} size="large" color="tomato" /> :  
      <Container>
         <ImageBackground source={require('../assets/take_care.jpeg')} style = {{ height: 150 }}>
         {/*<Text style={{ marginTop: 100, textAlign: 'center' }}><Text style={{ color: '#fff', fontSize: 18 }}>{ I18n.t('THIS IS HOW WE') }</Text><Text style={{ fontSize: 18, color: '#E86143', fontWeight: 'bold' }}> { I18n.t('TAKE CARE OF YOU') }</Text></Text>*/}
         <Text style={{ marginTop: 100, textAlign: 'center' }}><Text style={{ color: '#fff', fontSize: I18n.t('INSURANCE FONT SIZE') }}>{ I18n.t('A COVERAGE') }</Text><Text style={{ fontSize: I18n.t('INSURANCE FONT SIZE'), color: '#E86143', fontWeight: 'bold' }}> { I18n.t('DESIGNED FOR YOU') }</Text></Text>
          </ImageBackground>
        <Content padder>
        <View style={{ marginTop: 10 }}>
          <Card style={{ padding: 10}}>
             {/*<CardItem bordered>*/}
                <Text style={{ color: '#3C2949', fontWeight: 'bold' }}>{ this.state.benefits.data } </Text>
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
      }
      </>
    );
  }
}