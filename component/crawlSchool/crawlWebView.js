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
        console.log(message)
        if(message.slice(0,18) == 'OsakaUnivTimeTable'){
            student = OsakaUniv.parseTimeTable(message)
            this.getScore()
        } if(message.slice(0,14) == 'OsakaUnivScore'){
            student["score"] = OsakaUniv.parseScore(message).data
            this.saveStudent()
        }
        if(message.slice(0,18) == 'KyotoUnivTimeTable'){
            student = KyotoUniv.parseTimeTable(message)
            this.saveStudent()
        }

    }

    saveStudent() {
      console.log(student)
      console.log(JSON.stringify(student))
      store.save('student', {
        data: student
      }).then(() => {
        // 이동액션
      })
    }

    render() {
        return (
            <View>
                <WebViewBridge
                    ref="crawlWebView"
                    onBridgeMessage={this.onBridgeMessage.bind(this)}
                    javaScriptEnabled={true}
                    injectedJavaScript={this.state.injectString}
                    source={{uri: this.state.webViewUrl}}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                    style={{height: 300, width: 300}}
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
                webViewUrl: KyotoUniv.url,
                injectString: `if(document.URL == 'https://student.iimc.kyoto-u.ac.jp/')
                                {
                                    document.querySelector('.btn').click();
                                }
                                if(document.URL == 'https://authidp1.iimc.kyoto-u.ac.jp/idp/Authn/UserPassword') {
                                    document.getElementsByName("j_username")[0].value="a0131867";
                                                    document.getElementsByName("j_password")[0].value="dusrbals1";
                                                    document.getElementsByTagName("input")[2].click();
                                }
                `
            })

            setTimeout(function () {
                this.setState({
                    webViewUrl: KyotoUniv.timeTableUrl,
                    injectString: `(function () {
                            if (WebViewBridge) {
                                WebViewBridge.send('KyotoUnivTimeTable' + document.getElementsByTagName('body')[0].innerHTML);
                            }
                            }());`
                })
            }.bind(this), 3000);
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
