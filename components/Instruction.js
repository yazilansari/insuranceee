import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Card, CardItem, Left, Button, Text, Footer, FooterTab } from 'native-base';
import { StyleSheet, View, Modal, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
// import GlobalFont from 'react-native-global-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

  I18n.fallbacks = true;
  I18n.translations = {
    'en': require('./translations/en'),
    'ar': require('./translations/ar'),
  }

export default class Instruction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: false
    }
  }

 /*componentDidUpdate = () => {
    console.log('didu')
  }*/

  componentDidMount = async () => {
    if(this.props.route.params.flag == undefined) {
      await AsyncStorage.setItem('flag', 'Car Insurance');
    } else {
      await AsyncStorage.setItem('flag', 'Marine Insurance');
    }

    this._navListener = this.props.navigation.addListener('focus', () => {
      this.setState({ value: true });
      
      // let fontName = 'SansitaSwashed-Regular';
      // GlobalFont.applyGlobal(fontName);
    });
  }

  render() {
    console.log(this.props.route.params.flag)
    /*this.props.navigation.addListener(
      'willFocus',
      payload => {
        console.log('ren')
      }
    )*/
    return (
      <>
      <Container>
         {this.props.route.params.flag == undefined ? <ImageBackground source={require('../assets/take_care.jpeg')} style = {{ height: 150 }}>
            <Text style={{ marginTop: 100, textAlign: 'center' }}><Text style={{ color: '#fff', fontSize: I18n.t('VEHICLE FONT SIZE') }}>{ I18n.t('DELIVERING') }</Text><Text style={{ fontSize: I18n.t('VEHICLE FONT SIZE'), color: '#E86143', fontWeight: 'bold' }}> { I18n.t('YOUR INSURANCE') }</Text></Text>
        </ImageBackground> :
        <ImageBackground source={require('../assets/marine_insurance2.jpg')} style = {{ height: 150 }}>
            <Text style={{ marginTop: 100, textAlign: 'center' }}><Text style={{ color: '#fff', fontSize: I18n.t('HEALTH FONT SIZE') }}>{ I18n.t('INSURE') }</Text><Text style={{ fontSize: I18n.t('HEALTH FONT SIZE'), color: '#E86143', fontWeight: 'bold' }}> { I18n.t('THE FUTURE') }</Text></Text>
        </ImageBackground>
        }
        <Content padder>
        <Text style={{ textAlign: 'center' }}><Text style={{ color: '#E86143', fontSize: 11 }}>{ I18n.t('THE RIGHT INFORMATION') }</Text><Text style={{ fontSize: 11, color: '#E86143', fontWeight: 'bold' }}> { I18n.t('WILL HELP US GIVE YOU A BETTER PRICE') }</Text></Text>
        {/*{this.props.route.params.flag != undefined ? <Card>
          <TouchableOpacity>
             <CardItem bordered>
               <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'  }}>
                  <Image source={require('../assets/uae_passport.jpg')} style={{height: 50, width: 100}}/>
                  <Text style={{ color: '#3C2949', fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>{I18n.t('PASSPORT')}</Text>
                </View>
             </CardItem>
          </TouchableOpacity>
        </Card> : <></>
        }*/}

        {/*{this.props.route.params.flag == undefined ?*/}
        <Card>
          <TouchableOpacity>
             <CardItem bordered>
               <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'  }}>
                  <Image source={require('../assets/mulkiya.jpg')} style={{height: 50, width: 80}}/>
                  <Text style={{ color: '#3C2949', fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>{ I18n.t('REGISTRATION CARD') }</Text>
                  {/*<View>
                    <Button rounded onPress={ this.onSubmit } style={{ backgroundColor: '#3C2949', padding: 5 }}>
                      <Text style={{ color: '#fff', fontWeight: 'bold'}}>AED 900</Text>
                    </Button>
                    <Text style={{ color: '#000', marginLeft: 15, fontSize: 12}}>View Details</Text>
                  </View>*/}
                </View>
             </CardItem>
          </TouchableOpacity>
        </Card>
        {/*: <></>
        }*/}

        <Card>
          <TouchableOpacity>
             <CardItem bordered>
               <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'  }}>
                  <Image source={require('../assets/emirates_id.jpg')} style={{height: 50, width: 80}}/>
                  <Text style={{ color: '#3C2949', fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>{ I18n.t('EMIRATES ID') }</Text>
                  {/*<View>
                    <Button rounded onPress={ this.onSubmit } style={{ backgroundColor: '#3C2949', padding: 5 }}>
                      <Text style={{ color: '#fff', fontWeight: 'bold'}}>AED 900</Text>
                    </Button>
                    <Text style={{ color: '#000', marginLeft: 15, fontSize: 12}}>View Details</Text>
                  </View>*/}
                </View>
             </CardItem>
          </TouchableOpacity>
        </Card>

        {/*{this.props.route.params.flag == undefined ?*/}
        <Card>
          <TouchableOpacity>
             <CardItem bordered>
               <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'  }}>
                  <Image source={require('../assets/license.jpg')} style={{height: 50, width: 80}}/>
                  <Text style={{ color: '#3C2949', fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>{ I18n.t('DRIVING LICENSE') }</Text>
                  {/*<View>
                    <Button rounded onPress={ this.onSubmit } style={{ backgroundColor: '#3C2949', padding: 5 }}>
                      <Text style={{ color: '#fff', fontWeight: 'bold'}}>AED 900</Text>
                    </Button>
                    <Text style={{ color: '#000', marginLeft: 15, fontSize: 12}}>View Details</Text>
                  </View>*/}
                </View>
             </CardItem>
          </TouchableOpacity>
        </Card>
        {/*: <></>
        }*/}

        {/*{this.props.route.params.flag == undefined ?*/}
        <Card>
          <TouchableOpacity>
             <CardItem bordered>
               <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'  }}>
                  <Image source={require('../assets/passing_certificate.jpg')} style={{height: 50, width: 80}}/>
                  <Text style={{ color: '#3C2949', fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>{I18n.t('PASSING CERTIFICATE')}</Text>
                  {/*<View>
                    <Button rounded onPress={ this.onSubmit } style={{ backgroundColor: '#3C2949', padding: 5 }}>
                      <Text style={{ color: '#fff', fontWeight: 'bold'}}>AED 900</Text>
                    </Button>
                    <Text style={{ color: '#000', marginLeft: 15, fontSize: 12}}>View Details</Text>
                  </View>*/}
                </View>
             </CardItem>
          </TouchableOpacity>
        </Card>
        {/*: <></>
        }*/}

        {/*{this.props.route.params.flag == undefined ?*/}
        <Card>
          <TouchableOpacity>
             <CardItem bordered>
               <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'  }}>
                  <Image source={require('../assets/insurance_list.png')} style={{height: 50, width: 100}}/>
                  <Text style={{ color: '#3C2949', fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>{I18n.t('VEHICLE PHOTOS')}</Text>
                  {/*<View>
                    <Button rounded onPress={ this.onSubmit } style={{ backgroundColor: '#3C2949', padding: 5 }}>
                      <Text style={{ color: '#fff', fontWeight: 'bold'}}>AED 900</Text>
                    </Button>
                    <Text style={{ color: '#000', marginLeft: 15, fontSize: 12}}>View Details</Text>
                  </View>*/}
                </View>
             </CardItem>
          </TouchableOpacity>
        </Card>
        {/*: <></>
        }*/}

        </Content>
        {/*{this.props.route.params.flag == undefined ?*/}
        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Documents', { test: 'Test' }) }} style={styles.fab}>
            <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> {I18n.t('REGISTRATION CARD F/SIDE') }</Text>
        </TouchableOpacity>
        {/*:
        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Passport Photos', { test: 'Test' }) }} style={{...styles.fab, width: 220}}>
            <Text style={styles.fabIcon}><Icon size={ 18 } name='camera'/> {I18n.t('PASSPORT FIRST PAGE') }</Text>
        </TouchableOpacity> 
        }*/}
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
    width: 260,
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