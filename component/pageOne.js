import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class PageOne extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View style={{margin: 128}}>
        <Text>This is PageOne!</Text>
      </View>
    )
  }
}
