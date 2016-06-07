import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'apsl-react-native-button'

import styles from './../style/style'

import store from 'react-native-simple-store'


export default class PageOne extends Component {
  componentDidMount() {
    store.get('setting')
      .then((setting) => {
        if(!setting){
          store.save('setting', {
            timeTableDaySetting: 5,
            timeTableTimeSetting: 5,
          })
        }
      })
  }
  render() {
    return (
      <ScrollView style={styles.primaryColorBackground}>
        <View style={{height: 64}} />
          <Button onPress={Actions.lectureDetail} style={styles.button} textStyle={styles.buttonText}>
            lectureDetail
          </Button>
        <Button onPress={Actions.pageOne} style={styles.buttonWhite} textStyle={styles.buttonWhiteText}>
          PageOne
        </Button>
        <Button onPress={Actions.loginWebView} style={styles.button} textStyle={styles.buttonText}>
          LoginWebView
        </Button>
        <Button onPress={Actions.userProfileSetting} style={styles.buttonWhite} textStyle={styles.buttonWhiteText}>
          userProfileSetting
        </Button>
        <Button onPress={Actions.getSchool} style={styles.button} textStyle={styles.buttonText}>
          getSchool
        </Button>
        <Button onPress={Actions.tabbar} style={styles.buttonWhite} textStyle={styles.buttonWhiteText}>
          tabbar
        </Button>
        <Button onPress={Actions.timeTableSetting} style={styles.buttonWhite} textStyle={styles.buttonWhiteText}>
          timeTableSetting
        </Button>
        <Button onPress={Actions.userMore} style={styles.button} textStyle={styles.buttonText}>
          userMore
        </Button>

      </ScrollView>
    )
  }
}
