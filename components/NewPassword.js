import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text, DatePicker } from 'native-base';
import { StyleSheet, View, Modal, Image, ScrollView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ValidationComponent from 'react-native-form-validator';
// import DatePicker from 'react-native-datepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class NewPassword extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
        password: '',
        error: '',
        loading: false
      };
  }

  onChangePassword = (value) => {
    // console.log(value)
    this.setState({password: value});
  }

  onSubmit = async () => {
    this.setState({ error: '' });

     // Call ValidationComponent validate method
    this.validate({
      password: {required: true},
    });

    if (this.isFormValid()) {
      this.setState({ loading: true });
      const visitor_email = await AsyncStorage.getItem('visitor_email');
      if (visitor_email !== null) {
      // console.log('hvhv');
        let email = JSON.parse(visitor_email);
        // console.log(data);return;
        const visitor = {
          password: this.state.password,
          email: email
        };
        // console.log(visitor);return;
         axios.post(`https://gfs-ae.com/insure/services/new_password`, { visitor })
          .then(async res => {
            this.setState({ loading: false });
            // console.log(res.data);
            if(res.data.success == 1) {
              this.props.navigation.navigate('Login');
            } else {
              this.setState({ error: res.data.message })
            }
          }).catch(err => {
            console.log(err);
          });
      }
      // this.setState({user_name: '', password: ''});
    }
  }

  render() {
    return (
      
        <LinearGradient colors={['#2E1727', '#3E2E5B', '#2E1727']} style={styles.linearGradient}>
        <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 10}}>Enter New Password</Text>
          <Form style={{ marginRight: 10 }}>
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10 }}>
              <Input onChangeText={ this.onChangePassword } placeholder='New Password' style={{ color: '#fff', marginLeft: 10 }} placeholderTextColor = "#fff"/>
            </Item>
            {this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>Password is Required</Text>) }
            { (this.state.loading) ? <ActivityIndicator style={{ marginTop: 20 }} size="large" color="tomato" /> : <></> }
  
            { (this.state.error != '') ? <Text style={{ marginLeft: 25, color: '#E86143' }}>{ this.state.error }</Text> : <></> }
            <Button block rounded onPress={ this.onSubmit } style={{ backgroundColor: '#E86143', marginTop: 20, marginLeft: 10 }}>
                <Text style={{ color: '#fff' }}>Login</Text>
            </Button>
          </Form>
          </ScrollView>
        </LinearGradient>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 250,
  },
  linearGradient: {
    flex: 1,
  }
});