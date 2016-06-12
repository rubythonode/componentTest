import React, { Component } from 'react';
import { View, Text, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import store from 'react-native-simple-store'

import styles from './../style/style'

import config from './../config/config'

const baseUrl = config.baseUrl

export default class PageOne extends Component {
  constructor(props) {
    super(props)
  }

  onNavigationStateChange(navState) {
      if(navState.title == 'MobileLoginComplete'){
        console.log(navState.title);
        console.log(navState.url);
        let userInfos = navState.url.split("?")[1].split("&");
        console.log(userInfos)

        let uid = userInfos[0].split("=")[1]
        let provider = userInfos[1].split("=")[1]
        let email = userInfos[2].split("=")[1]

        store.save('user', {
          'logged': true,
          'uid': uid,
          'provider': provider,
          'email': email,
        }).then(() => store.get('user'))
          .then(user=> {
            console.log(user)
          })

      }
  }

  render() {
        return(
            <View style={styles.containerFull}>
              <WebView
                style={{flex: 1, marginTop: 32}}
                source={{uri: "https://schooltestpre.herokuapp.com/users/login"}}
                onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                />
            </View>
        )
  }
}
