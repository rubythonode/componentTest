import React, { Component } from 'react';
import { View, } from 'react-native';

import store from 'react-native-simple-store'

import {
    Actions,
} from 'react-native-router-flux'

import WebViewBridge from 'react-native-webview-bridge'

import OsakaUniv from './school/osakaUniv'

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
        if(message.slice(0,18) == 'OsakaUnivTimeTable'){
            student = OsakaUniv.parseTimeTable(message)
            this.getScore()
        } if(message.slice(0,14) == 'OsakaUnivScore'){
            student["score"] = OsakaUniv.parseScore(message).data
            this.saveStudent()
        }

    }

    saveStudent() {
      console.log(student)
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
        this.setState({
            webViewUrl: OsakaUniv.url,
            injectString: OsakaUniv.login(this.props.ID, this.props.PW),
        });
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
