import React, { Component } from 'react';
import AnimatedSplash from "react-native-animated-splash-screen";
import { Text } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { withNavigation } from 'react-navigation';
import I18n from 'react-native-i18n';
// import GlobalFont from 'react-native-global-font';
// import { NativeBaseProvider } from 'native-base';

import Login from './components/Login';
import Register from './components/Register';
import Service from './components/Service';
import Languages from './components/Languages';
import MulkiyaFront from './components/MulkiyaFront';
import MulkiyaBack from './components/MulkiyaBack';
import EmirateIdFront from './components/EmirateIdFront';
import EmirateIdBack from './components/EmirateIdBack';
import LicenseFront from './components/LicenseFront';
import LicenseBack from './components/LicenseBack';
import PassingCertificate from './components/PassingCertificate';
import CarPhotos from './components/CarPhotos';
import CarPhotoDetails from './components/CarPhotoDetails';
import InsuranceList from './components/InsuranceList';
import Account from './components/Account';
import Profile from './components/Profile';
import Instruction from './components/Instruction';
import PassportPhotos from './components/PassportPhotos';
import PassportPhotoDetails from './components/PassportPhotoDetails';
import EmiratesIdPhotos from './components/EmiratesIdPhotos';
import EmiratesIdPhotoDetails from './components/EmiratesIdPhotoDetails';
import Mobile from './components/Mobile';
import OTPLogin from './components/OTPLogin';
import RateCalculator from './components/RateCalculator';
import Documents from './components/Documents';
import DocumentDetails from './components/DocumentDetails'
import ForgotPassword from './components/ForgotPassword';
import NewPassword from './components/NewPassword';
import ViewBenefits from './components/ViewBenefits';
import TermsConditions from './components/TermsConditions';
import ThankYou from './components/ThankYou';

const Stack = createStackNavigator();

  I18n.fallbacks = true;
  I18n.translations = {
    'en': require('./components/translations/en'),
    'ar': require('./components/translations/ar'),
  }

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isLoaded: false,
  }

  componentDidMount() {
    let that = this; 
    setTimeout(function() {
      that.setState({ isLoaded: true });
    }, 3000)

    // let fontName = 'Montserrat-Regular';
    // GlobalFont.applyGlobal(fontName);
  }

  render() {
    return (
      <AnimatedSplash
        translucent={true}
        isLoaded={this.state.isLoaded}
        logoImage={require("./assets/insure_logo.png")}
        backgroundColor={"#fff"}
        logoHeight={350}
        logoWidth={350}
      >
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#3C2949',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Services"
              component={Service}
              options={{ 
                headerLeft: null,
                headerTitleAlign: 'center'
              }}  
            />
            <Stack.Screen
              name="Languages"
              component={Languages}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Account"
              component={Account}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Registration Card Front"
              component={MulkiyaFront}
              options={{ 
                // headerLeft: null,
                headerTitleAlign: 'center'
              }} 
            />
            <Stack.Screen
              name="Registration Card Back"
              component={MulkiyaBack}
              options={{ 
                // headerLeft: null,
                headerTitleAlign: 'center'
              }} 
            />
            <Stack.Screen
              name="Emirates Id Front"
              component={EmirateIdFront}
              options={{ 
                // headerLeft: null,
                headerTitleAlign: 'center'
              }} 
            />
            <Stack.Screen
              name="Emirates Id Back"
              component={EmirateIdBack}
              options={{ 
                // headerLeft: null,
                headerTitleAlign: 'center'
              }} 
            />
            <Stack.Screen
              name="Driving License Front"
              component={LicenseFront}
              options={{ 
                // headerLeft: null,
                headerTitleAlign: 'center'
              }} 
            />
            <Stack.Screen
              name="Driving License Back"
              component={LicenseBack}
              options={{ 
                // headerLeft: null,
                headerTitleAlign: 'center'
              }} 
            />
            <Stack.Screen
              name="Passing Certificate"
              component={PassingCertificate}
              options={{ 
                // headerLeft: null,
                headerTitleAlign: 'center'
              }} 
            />
            <Stack.Screen
              name="Vehicle Photos"
              component={CarPhotos}
              options={{ 
                // headerLeft: null,
                headerTitleAlign: 'center'
              }} 
            />
            <Stack.Screen
              name="Vehicle Photo Details"
              component={CarPhotoDetails}
              options={{ 
                // headerLeft: null,
                headerTitleAlign: 'center'
              }} 
            />
            <Stack.Screen
              name="Insurance List"
              component={InsuranceList}
              options={{ 
                // headerLeft: null,
                headerTitleAlign: 'center'
              }} 
            />
            <Stack.Screen
              name="Vehicle Insurance"
              component={Instruction}
              options={({ route }) => ({ title: route.params.name, headerTitleAlign: 'center' })}
            />
            <Stack.Screen
              name="Passport Photos"
              component={PassportPhotos}
              options={{ 
                // headerLeft: null,
                headerTitleAlign: 'center'
              }} 
            />
            <Stack.Screen
              name="Passport Photo Details"
              component={PassportPhotoDetails}
              options={{ 
                headerLeft: null,
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen
              name="Emirates Id Photos"
              component={EmiratesIdPhotos}
              options={{ 
                // headerLeft: null,
                headerTitleAlign: 'center'
              }} 
            />
            <Stack.Screen
              name="Emirates Id Photo Details"
              component={EmiratesIdPhotoDetails}
              options={{ 
                headerLeft: null,
                headerTitleAlign: 'center'
              }}
            />
             <Stack.Screen
              name="Mobile"
              component={Mobile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OTP Login"
              component={OTPLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Rate Calculator"
              component={RateCalculator}
              // options={{ headerShown: false }}
              options={({ route }) => ({ title: route.params.name, headerTitleAlign: 'center' })}
            />
            <Stack.Screen
              name="Documents"
              component={Documents}
              options={{ 
                // headerLeft: null,
                headerTitleAlign: 'center'
              }} 
            />
             <Stack.Screen
              name="Document Details"
              component={DocumentDetails}
              options={{ 
                headerLeft: null,
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen
              name="Forgot Password"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="New Password"
              component={NewPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="View Benefits"
              component={ViewBenefits}
              options={{ 
                // headerLeft: null,
                headerTitleAlign: 'center'
              }} 
            />
            <Stack.Screen
              name="Terms Conditions"
              component={TermsConditions}
              options={{ 
                // headerLeft: null,
                headerTitleAlign: 'center'
              }} 
            />
            <Stack.Screen
              name="Thank You"
              component={ThankYou}
              options={{ headerShown: false }}
            />
        </Stack.Navigator>
        </NavigationContainer>
      </AnimatedSplash>
    );
  }
}
// export default withNavigation(App);

