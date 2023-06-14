import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text, Footer, FooterTab } from 'native-base';
import { TouchableOpacity, StyleSheet, View, Modal, Image, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import ValidationComponent from 'react-native-form-validator';
import axios from 'axios';
import I18n from 'react-native-i18n';
import DateTimePicker from '@react-native-community/datetimepicker';
  I18n.fallbacks = true;
  I18n.translations = {
    'en': require('./translations/en'),
    'ar': require('./translations/ar'),
  }

export default class Register extends ValidationComponent {
  constructor(props) {
    // console.log('cons');
    super(props);
    this.state = { 
        chosenDate: '',
        exisDate: '',
        user_name: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        conf_password: '',
        mobile: '',
        id: '',
        emailError: '',
        passwordError: '',
        error: '',
        loading: false,
        // success: ''
        isPickerShow: false
      };
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
    // console.log( new Date( newDate.getTime() + Math.abs(newDate.getTimezoneOffset()*60000) )  );
    // this.setState({ chosenDate: new Date( newDate.getTime() + Math.abs(newDate.getTimezoneOffset()*60000) ), isPickerShow: false });
    this.setState({ chosenDate: newDate, isPickerShow: false });
    this.setState({ exisDate: '' });
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
        id: this.state.id
      };
      console.log(visitor)
       axios.post(`https://gfs-ae.com/insure/services/update`, { visitor })
        .then(async res => {
          this.setState({ loading: false });
          // console.log(res.data.data.visitor_user_name);
          if(res.data.success == 1) {
            await AsyncStorage.removeItem('visitor_data');
            await AsyncStorage.setItem(
              'visitor_data',
              JSON.stringify(res.data.data)
            );
            // this.setState({ success: res.data.message });
            this.props.navigation.navigate('Account');
          } else {
            this.setState({ error: res.data.message });
          }
        }).catch(err => {
          console.log(err);
        });
    }
    // this.setState({user_name: '', password: ''});
  }

  componentDidMount = async () => {
    // console.log('===did');
    this.setState({ loading: true });
     const visitor_data = await AsyncStorage.getItem('visitor_data');
     if (visitor_data !== null) {
      // console.log('hvhv');
        let data = JSON.parse(visitor_data);
        var visitor_dob = new Date(data.visitor_dob);
        // var month = visitor_dob.getMonth();
        // var day = visitor_dob.getDate() + 1;
        // var year = visitor_dob.getFullYear();
        // var visitor_dobb = new Date(year, month, day);
        // console.log(visitor_dobb)
        this.setState({
          ...this.state,
          // chosenDate: visitor_dob,
          exisDate: visitor_dob,
          user_name: data.visitor_user_name,
          first_name: data.visitor_first_name,
          last_name: data.visitor_last_name,
          email: data.visitor_email,
          password: data.visitor_password,
          conf_password: data.visitor_conf_password,
          mobile: data.visitor_mobile,
          id: data.visitor_id,
        });
        this.setState({ loading: false });
    }
  }

  render() {
    console.log('exis ', this.state.exisDate);
    console.log('chose ', this.state.chosenDate);
    return (
        <>
        { this.state.loading ? <ActivityIndicator style={{ marginTop: 50, textAlign: 'center' }} size="large" color="tomato" /> : 
        <>
        <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
          <Form style={{ marginRight: 10 }}>
            <Item rounded style={{ height: 45, marginTop: 5, marginLeft: 10, borderColor: '#3C2949' }}>
              <Input onChangeText={ this.onChangeUserName } value={ this.state.user_name } placeholder={ I18n.t('USER NAME') } style={{ color: '#3C2949', marginLeft: 10 }} placeholderTextColor = "#3C2949"/>
            </Item>
            {this.isFieldInError('user_name') && this.getErrorsInField('user_name').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>User Name is Required</Text>) }
            
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10, borderColor: '#3C2949' }}>
              <Input onChangeText={ this.onChangeFirstName } value={ this.state.first_name } placeholder={ I18n.t('FIRST NAME') } style={{ color: '#3C2949', marginLeft: 10 }} placeholderTextColor = "#3C2949"/>
            </Item>
            {this.isFieldInError('first_name') && this.getErrorsInField('first_name').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>First Name is Required</Text>) }
            
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10, borderColor: '#3C2949' }}>
              <Input onChangeText={ this.onChangeLastName } value={ this.state.last_name } placeholder={ I18n.t('LAST NAME') } style={{ color: '#3C2949', marginLeft: 10 }} placeholderTextColor = "#3C2949"/>
            </Item>
            {this.isFieldInError('last_name') && this.getErrorsInField('last_name').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>Last Name is Required</Text>) }
            
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10, borderColor: '#3C2949' }}>
              <Input onChangeText={ this.onChangeEmail } value={ this.state.email } placeholder={ I18n.t('EMAIL') } style={{ color: '#3C2949', marginLeft: 10 }} placeholderTextColor = "#3C2949"/>
            </Item>
            { (this.state.emailError != '') ? <Text style={{ marginLeft: 25, color: '#E86143' }}>{ this.state.emailError }</Text> : <></> }
            {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>Enter Valid Email Id</Text>) }
            
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10, borderColor: '#3C2949' }}>
              <Input onChangeText={ this.onChangePassword } value={ this.state.password } secureTextEntry={true} placeholder={ I18n.t('PASSWORD') } style={{ color: '#3C2949', marginLeft: 10 }} placeholderTextColor = "#3C2949"/>
            </Item>
            {this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>Password is Required</Text>) }
            
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10, borderColor: '#3C2949' }}>
              <Input onChangeText={ this.onChangeConfPassword } value={ this.state.conf_password } secureTextEntry={true} placeholder={ I18n.t('CONFIRM PASSWORD') } style={{ color: '#3C2949', marginLeft: 10 }} placeholderTextColor = "#3C2949"/>
            </Item>
            { (this.state.passwordError != '') ? <Text style={{ marginLeft: 25, color: '#E86143' }}>{ this.state.passwordError }</Text> : <></> }
            {this.isFieldInError('conf_password') && this.getErrorsInField('conf_password').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>Confirm Password is Required</Text>) }
            
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10, borderColor: '#3C2949' }}>
              <Input onChangeText={ this.onChangeMobile } value={ this.state.mobile } keyboardType={'numeric'}  placeholder={ I18n.t('MOBILE No') } style={{ color: '#3C2949', marginLeft: 10 }} placeholderTextColor = "#3C2949"/>
            </Item>
            {this.isFieldInError('mobile') && this.getErrorsInField('mobile').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>Mobile No. is Required</Text>) }
            
            <Item rounded style={{ height: 45, marginTop: 20, marginLeft: 10, borderColor: '#3C2949' }}>
              <TouchableOpacity onPress= { () => {this.showPicker()} }>
                <Text style={{ marginLeft: 20 }}>Select DOB</Text>
                {/*<Input onChangeText={ this.onChangeMobile } keyboardType={'numeric'}  placeholder='Select DOB' style={{ color: '#fff', marginLeft: 10 }} placeholderTextColor = "#fff"/>*/}
              </TouchableOpacity>
            </Item>
            {this.state.isPickerShow ? (
              <DateTimePicker
                value={this.state.chosenDate != '' ? this.state.chosenDate : this.state.exisDate}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={this.setDate}
              />
            ) : ''}
            {(this.state.chosenDate != '' || this.state.exisDate != '') &&
              <View>
                <Text style={{ marginLeft: 25 }}>{this.state.chosenDate != '' ? this.state.chosenDate.toISOString().split('T')[0] : this.state.exisDate.toISOString().split('T')[0]}</Text>
              </View>
            }
            { (this.state.loading) ? <ActivityIndicator style={{ marginTop: 50 }} size="large" color="tomato" /> : <></> }
            {this.isFieldInError('chosenDate') && this.getErrorsInField('chosenDate').map(errorMessage => <Text style={{ marginLeft: 25, color: '#E86143' }}>Date of Birth is Required</Text>) }
            { (this.state.error != '') ? <Text style={{ marginLeft: 25, color: '#E86143' }}>{ this.state.error }</Text> : <></> }
            <Button block rounded onPress={ this.onSubmit } style={{ backgroundColor: '#3C2949', marginTop: 20, marginBottom: 10, marginLeft: 10 }}>
                <Text style={{ color: '#fff' }}>{ I18n.t('UPDATE PROFILE') }</Text>
            </Button>
          </Form>
      </ScrollView>

      <Footer>
          <FooterTab style={{ backgroundColor: '#E86143' }}>
            <Button vertical onPress={()=> { this.props.navigation.navigate('Services', { test: "Test" }) }}>
              <Icon style={{ color: '#3C2949', fontSize: 25 }} name="home" />
              <Text style={{ color: '#3C2949' }}>{ I18n.t('HOME') }</Text>
            </Button>
            <Button vertical onPress={()=> { this.props.navigation.navigate('Languages', { test: "Test" }) }}>
              <Icon style={{ color: '#3C2949', fontSize: 25 }} name="globe" />
              <Text style={{ color: '#3C2949' }}>{ I18n.t('LANGUAGES') }</Text>
            </Button>
            <Button vertical onPress={()=> { this.props.navigation.navigate('Account', { test: "Test" }) }}>
              <Icon style={{ color: '#fff', fontSize: 25 }} name="user" />
              <Text style={{ color: '#fff' }}>{ I18n.t('SETTINGS') }</Text>
            </Button>
          </FooterTab>
      </Footer>
      </>
    }
      </>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    marginTop: 50,
  }
});