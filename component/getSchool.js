import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from 'apsl-react-native-button'

import styles from './../style/style'

import CrawlWebView from './crawlSchool/crawlWebView'

export default class getSchool extends Component {
  constructor(props){
    super(props)
    this.state ={
      id: '',
      pw: '',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
           style={styles.textInput}
           onChangeText={(id) => this.setState({id: id})}
           value={this.state.id}
           placeholder={'Input your name'}
         />
         <TextInput
            style={styles.textInput}
            onChangeText={(pw) => this.setState({pw: pw})}
            value={this.state.pw}
            placeholder={'Input your name'}
          />
        <Button style={styles.buttonWhite} textStyle={styles.buttonWhiteText} onPress={()=> {
            this.refs.CrawlWebView.controllWebView()
          }}>
            学校からデータをとる
          </Button>
          <CrawlWebView ref="CrawlWebView" ID={this.state.id} PW={this.state.pw} />
      </View>
    )
  }
}
