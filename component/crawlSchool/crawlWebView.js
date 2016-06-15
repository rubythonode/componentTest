import React, { Component } from 'react';
import { View, } from 'react-native';

import store from 'react-native-simple-store'

import {
    Actions,
} from 'react-native-router-flux'

import WebViewBridge from 'react-native-webview-bridge'

import OsakaUniv from './school/osakaUniv'
import KyotoUniv from './school/kyotoUniv'

var DOMParser = require('react-native-html-parser').DOMParser

import config from './../../config/config'

const baseUrl = config.baseUrl

var student = {}

class CrawlWebView extends Component {
    constructor(props) {
        super(props)
        // 처음에 url이 없으면 에러가 나서 적당히 google을 넣어놓음.
        this.state= {
            webViewUrl: 'http://google.com',
            injectString: `(function () {
                    if (WebViewBridge) {

                    }
                  }());`,
        }
    }

    onBridgeMessage(message) {
        let crawlWebView = this.refs.crawlWebView;
        // console.log(message)
        if(message.slice(0,18) == 'OsakaUnivTimeTable'){
            student = OsakaUniv.parseTimeTable(message)
            // this.getScore()
            this.saveStudent()
        } if(message.slice(0,14) == 'OsakaUnivScore'){
            student["score"] = OsakaUniv.parseScore(message).data
            // this.saveStudent()
        }
        if(message.slice(0,18) == 'KyotoUnivTimeTable'){
            student = KyotoUniv.parseTimeTable(message)
            this.saveStudent()
        }

    }

    saveStudent() {
      console.log(student)

      store.save('student', {
        data: student
      }).then(() => store.get('user'))
      .then((user) => {
        // 이동액션
        // uid, school 정보를 가져옴 -> 그걸로 sendObject 만들어서 fetch
        if(this.props.school == '大阪大学'){
          var school = 'osakaUniv'
        }
        let sendObject = {
          uid: user.uid,
          school: school,
          timeTable: student.timeTable
        }
        console.log(sendObject)
        fetch(baseUrl+'/users/editTimeTable', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendObject)
        }).then((response) => {
          // 이동액션
          // 강의 평가 하는 곳으로
        })
      })
    }

    render() {
        return (
            <View>
                <WebViewBridge
                  style={{height: 300, width: 300}}
                    ref="crawlWebView"
                    onBridgeMessage={this.onBridgeMessage.bind(this)}
                    javaScriptEnabled={true}
                    injectedJavaScript={this.state.injectString}
                    source={{uri: this.state.webViewUrl}}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                />
            </View>
        );
    }

    onNavigationStateChange(navState){
        if(OsakaUniv.loginCondition(navState)){
            //get TimeTable
            this.setState({
                webViewUrl: OsakaUniv.timeTableUrl,
                injectString: `
                (function () {
                    if (WebViewBridge) {
                        WebViewBridge.send('OsakaUnivTimeTable' + document.getElementsByTagName('body')[0].innerHTML);
                    }
                  }());`,
            });
        }
    }

    controllWebView() {
        if(this.props.school == '大阪大学'){
            this.setState({
            webViewUrl: OsakaUniv.url,
            injectString: OsakaUniv.login(this.props.ID, this.props.PW),
            });
        }
        if(this.props.school == '京都大学'){
            this.setState({
                webViewUrl: KyotoUniv.timeTableUrl,
                injectString: `if(document.URL == 'https://authidp1.iimc.kyoto-u.ac.jp/idp/Authn/UserPassword') {
                                    document.getElementsByName("j_username")[0].value="a0131867";
                                                    document.getElementsByName("j_password")[0].value="dusrbals1";
                                                    document.getElementsByTagName("input")[2].click();
                                }
                                if(document.URL == 'https://www.k.kyoto-u.ac.jp/student/la/entry/zenki?server=ganymede'){
                                  (function () {
                                          if (WebViewBridge) {
                                              WebViewBridge.send('KyotoUnivTimeTable' + document.getElementsByTagName('body')[0].innerHTML);
                                          }
                                          }());
                                }`
            })
        }


    }
    getScore() {
        this.setState({
            webViewUrl: OsakaUniv.scoreUrl,
            injectString:
            `setTimeout(function(){
                (function () {
                    if (WebViewBridge) {
                        WebViewBridge.send('OsakaUnivScore' + document.getElementsByTagName('body')[0].innerHTML);
                    }
                  }());
            },0);
              nextCall('2');`,
        });
    }


}

export default CrawlWebView
