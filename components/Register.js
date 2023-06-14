import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { TouchableOpacity, StyleSheet, View, Modal, Image, ScrollView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ValidationComponent from 'react-native-form-validator';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Register extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
        chosenDate: '',
        user_name: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        conf_password: '',
        mobile: '',
        emailError: '',
        passwordError: '',
        error: '',
        loading: false,
        chosenDate: new Date(),
        isPickerShow: false
      };
      console.log('con', this.state.isPickerShow);
    this.setDate = this.setDate.bind(this);
  }

  onChangeUserName = (value) => {
    // console.log(value)
    this.setState({user_name: value});
  }

  onChangeFirstName = (value) => {
    // console.log(value)
    this.setState({first_name: value});
  }

  onChangeLastName = (value) => {
    // console.log(value)
    this.setState({last_name: value});
  }

  onChangeEmail = (value) => {
    // console.log(value)
    this.setState({email: value});
  }

  onChangePassword = (value) => {
    // console.log(value)
    this.setState({password: value});
  }

  onChangeConfPassword = (value) => {
    // console.log(value)
    this.setState({conf_password: value});
  }

  onChangeMobile = (value) => {
    // console.log(value)
    this.setState({mobile: value});
  }

  setDate(e, newDate) {
    this.setState({ chosenDate: newDate, isPickerShow: false });
    // this.setState({ isPickerShow: false });
  }

  showPicker = () => {
    this.setState({ isPickerShow: true });
  };

  onSubmit = () => {
    this.setState({ error: '' });

    if(this.state.email == '') {
      this.setState({ emailError: 'Email is Required' });
    } else {
      this.setState({ emailError: '' });
    }

     // Call ValidationComponent validate method
    this.validate({
      user_name: {required: true},
      first_name: {required: true},
      last_name: {required: true},
      email: {email: true},
      password: {required: true},
      conf_password: {required: true},
      mobile: {required: true},
      chosenDate: {required: true},
    });

    if(this.state.password != '' && this.state.conf_password != '') {
      if(this.state.password != this.state.conf_password) {
        this.setState({ passwordError: 'Password and Confirm Password Should Same' });
        return;   
      } else {
          this.setState({ passwordError: '' });
      }
    } else {
      this.setState({ passwordError: '' });
    }

    if (this.isFormValid()) {
      this.setState({ loading: true });
      const visitor = {
        user_name: this.state.user_name,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        mobile: this.state.mobile,
        password: this.state.password,
        conf_password: this.state.conf_password,
        chosenDate: this.state.chosenDate,
      };
      console.log(visitor)
       axios.post(`https://gfs-ae.com/insure/services/register`, { visitor })
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
    // this.setState({user_name: '', password: ''});
  }

  render() {
    return (
      
        <LinearGradient colors={['#2E1727', '#3E2E5B', '#2E1727']} style={styles.linearGradient}>
        <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 10}}>Create Account</Text>
          <Form style={{ marginRight: 10 }}>
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10 }}>
              <Input onChangeText={ this.onChangeUserName } placeholder='User Name' style={{ color: '#fff', marginLeft: 10 }} placeholderTextColor = "#fff"/>
            </Item>
            {this.isFieldInError('user_name') && this.getErrorsInField('user_name').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>User Name is Required</Text>) }
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10 }}>
              <Input onChangeText={ this.onChangeFirstName } placeholder='First Name' style={{ color: '#fff', marginLeft: 10 }} placeholderTextColor = "#fff"/>
            </Item>
            {this.isFieldInError('first_name') && this.getErrorsInField('first_name').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>First Name is Required</Text>) }
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10 }}>
              <Input onChangeText={ this.onChangeLastName } placeholder='Last Name' style={{ color: '#fff', marginLeft: 10 }} placeholderTextColor = "#fff"/>
            </Item>
            {this.isFieldInError('last_name') && this.getErrorsInField('last_name').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>Last Name is Required</Text>) }
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10 }}>
              <Input onChangeText={ this.onChangeEmail } placeholder='Email Id' style={{ color: '#fff', marginLeft: 10 }} placeholderTextColor = "#fff"/>
            </Item>
            { (this.state.emailError != '') ? <Text style={{ marginLeft: 25, color: '#E86143' }}>{ this.state.emailError }</Text> : <></> }
            {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>Enter Valid Email Id</Text>) }
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10 }}>
              <Input onChangeText={ this.onChangePassword } secureTextEntry={true} placeholder='Password' style={{ color: '#fff', marginLeft: 10 }} placeholderTextColor = "#fff"/>
            </Item>
            {this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>Password is Required</Text>) }
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10 }}>
              <Input onChangeText={ this.onChangeConfPassword } secureTextEntry={true} placeholder='Confirm Password' style={{ color: '#fff', marginLeft: 10 }} placeholderTextColor = "#fff"/>
            </Item>
            { (this.state.passwordError != '') ? <Text style={{ marginLeft: 25, color: '#E86143' }}>{ this.state.passwordError }</Text> : <></> }
            {this.isFieldInError('conf_password') && this.getErrorsInField('conf_password').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>Confirm Password is Required</Text>) }
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10 }}>
              <Input onChangeText={ this.onChangeMobile } keyboardType={'numeric'}  placeholder='Mobile No.' style={{ color: '#fff', marginLeft: 10 }} placeholderTextColor = "#fff"/>
            </Item>
            {this.isFieldInError('mobile') && this.getErrorsInField('mobile').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>Mobile No. is Required</Text>) }
            
            {/*{!this.state.isPickerShow && (*/}
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10 }}>
              <TouchableOpacity onPress= { () => {this.showPicker()} }>
                <Text style={{ marginLeft: 20, color: '#fff' }}>Select DOB</Text>
                {/*<Input onChangeText={ this.onChangeMobile } keyboardType={'numeric'}  placeholder='Select DOB' style={{ color: '#fff', marginLeft: 10 }} placeholderTextColor = "#fff"/>*/}
              </TouchableOpacity>
            </Item>
            {/*)}*/}
            {this.state.isPickerShow ? (
              <DateTimePicker
                value={this.state.chosenDate}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={this.setDate}
              />
            ) : ''}

            <View>
              <Text style={{ marginLeft: 25, color: '#fff' }}>{this.state.chosenDate.toISOString().split('T')[0]}</Text>
            </View>
            
            { (this.state.loading) ? <ActivityIndicator style={{ marginTop: 20 }} size="large" color="tomato" /> : <></> }
            {this.isFieldInError('chosenDate') && this.getErrorsInField('chosenDate').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>Date of Birth is Required</Text>) }
            { (this.state.error != '') ? <Text style={{ marginLeft: 25, color: '#E86143' }}>{ this.state.error }</Text> : <></> }
            <Button block rounded onPress={ this.onSubmit } style={{ backgroundColor: '#E86143', marginTop: 20, marginLeft: 10 }}>
                <Text style={{ color: '#fff' }}>Register</Text>
            </Button>
          </Form>
          </ScrollView>
        </LinearGradient>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  linearGradient: {
    flex: 1
  }
});