import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Card, CardItem, Left, Button, Text, Footer, FooterTab } from 'native-base';
import { StyleSheet, View, Modal, TouchableOpacity, Image, ImageBackground } from 'react-native';
// import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ScanDetails extends Component {
  render() {
    console.log(this.props.position)
    return (
      <>
        <TouchableOpacity>
          <Button transparent>
            <Text style={{ color: '#3C2949' }}>{ this.props.scanDetails.text }</Text>
          </Button>
        </TouchableOpacity>
      </>
    );
  }
}
