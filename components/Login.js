import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Body, Text, Form, Item, Label, Input } from 'native-base';
import { StyleSheet, View, Modal, Image, Platform, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import ValidationComponent from 'react-native-form-validator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends ValidationComponent {

  state = {
    modalVisible: false,
    user_name: '', 
    password: '',
    error: '',
    loading: false
  }

  onChangeUserName = (value) => {
    console.log(value)
    this.setState({user_name: value});
  }

  onChangePassword = (value) => {
    console.log(value)
    this.setState({password: value});
  }

  onSubmit = () => {
    this.setState({ error: '', user_name: '', password: '' });
     // Call ValidationComponent validate method
    this.validate({
      user_name: {required: true},
      password: {required: true}
    });
    if (this.isFormValid()) {
      this.setState({ loading: true });
      const visitor = {
        user_name: this.state.user_name,
        password: this.state.password
      };
      axios.post(`https://gfs-ae.com/insure/services/login`, { visitor })
        .then(async res => {
          this.setState({ loading: false });
          // console.log(res.data);
          if(res.data.success == 1) {
            await AsyncStorage.setItem(
              'visitor_data',
              JSON.stringify(res.data.data)
            );
            this.props.navigation.navigate('Services');
          } else {
            this.setState({ error: res.data.message })
          }
        }).catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <LinearGradient colors={['#2E1727', '#3E2E5B', '#2E1727']} style={styles.linearGradient}>
        <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
          style={styles.tinyLogo}
          source={require('../assets/insure_logo.png')}
          />
          </View>
          <Form style={{ marginRight: 10, marginTop: 10 }}>
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10 }}>
              <Input onChangeText={ this.onChangeUserName } value={ this.state.user_name } placeholder='Username' style={{ color: '#fff', marginLeft: 10 }} placeholderTextColor = "#fff"/>
            </Item>
            {this.isFieldInError('user_name') && this.getErrorsInField('user_name').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>Username is Required</Text>) }
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10 }}>
              <Input onChangeText={ this.onChangePassword } value={ this.state.password } secureTextEntry={true} placeholder='Password' style={{ color: '#fff', marginLeft: 10 }} placeholderTextColor = "#fff"/>
            </Item>
            { (this.state.loading) ? <ActivityIndicator style={{ marginTop: 20 }} size="large" color="tomato" /> : <></> }
            {this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>Password is Required</Text>) }
            { (this.state.error != '') ? <Text style={{ marginLeft: 25, color: '#E86143' }}>{ this.state.error }</Text> : <></> }
            <Button block rounded onPress={ this.onSubmit } style={{ backgroundColor: '#E86143', marginTop: 20, marginLeft: 10 }}>
                <Text style={{ color: '#fff' }}>Login</Text>
            </Button>
          </Form>
          <Text onPress={ () => {this.props.navigation.navigate('Forgot Password')} } style={{ marginTop: 5, marginLeft: 10, textAlign: 'center', color: '#E86143', fontSize: 20 }}>Forgot Password</Text>
          <Text style={{ marginTop: 20, marginLeft: 10, textAlign: 'center', color: '#fff'}}>OR</Text>
          <Text onPress={ () => {this.props.navigation.navigate('Mobile')} } style={{ marginTop: 5, marginLeft: 10, textAlign: 'center', color: '#E86143', fontSize: 20}}>Login With OTP</Text>
          <Text style={{ marginTop: 20, marginLeft: 10, textAlign: 'center', color: '#fff'}}>OR</Text>
          <Text style={{ marginTop: 5, marginLeft: 10, textAlign: 'center', color: '#fff'}}>Login With</Text>
          <View style={{ flexDirection: 'row', marginLeft: 15, justifyContent: 'center' }}>
          <Icon name="google-plus" color='red' size={20} style={{ marginTop: 20, marginRight: 10 }}/>
          { Platform.OS == 'ios' ? <Icon name="apple" color='#fff' size={20} style={{ marginTop: 20, marginLeft: 20 }}/> : <Text></Text> }
          </View>
          <Text onPress={ () => {this.props.navigation.navigate('Terms Conditions')} } style={{ marginTop: 20, marginLeft: 10, textAlign: 'center', color: '#E86143', fontSize: 20}}>Register Now</Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
            <Text style={{ color: '#fff', fontSize: 14 , marginTop: 10}}>Powered By: </Text>
            <Image source={require('../assets/europ.png')} style={{height: 50, width: 80}}/>
            <Image source={require('../assets/gfs.png')} style={{height: 50, width: 80}}/>
          </View>
          </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  linearGradient: {
    flex: 1
  },
   tinyLogo: {
    width: 300,
    height: 50
  },
});