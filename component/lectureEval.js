import React, { Component } from 'react';
import { View, Text, Slider, Switch, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from 'apsl-react-native-button'

import styles from './../style/style'

import config from './../config/config'

const baseUrl = config.baseUrl


export default class LectureDetail extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{height: 64}} />
        <View style={{flexDirection: 'row', padding: 20, alignItems: 'center'}}>
          <Text>
            講義力
          </Text>
          <Slider
            maximumValue={10}
            minimumValue={1}
            value={5}
            step={1}
            style={{flex: 1}}
            />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 20}}>
          <Text>
            テスト
          </Text>
          <View style={{flex: 1}}/>
          <Switch>
          </Switch>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>
            テスト回数
          </Text>

        </View>
      </View>
    )
  }
}
