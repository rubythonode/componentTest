import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from 'apsl-react-native-button'

import styles from './../style/style'

import CrawlWebView from './crawlSchool/crawlWebView'

import Picker from 'react-native-picker';

import store from 'react-native-simple-store'

export default class getSchool extends Component {
  constructor(props){
    super(props)
    this.state ={
      id: '',
      pw: '',
      schools : ["大阪大学", "京都大学"],
      school: '',
      viewHeight: new Animated.Value(0)
    }
  }

  schoolText() {
    if(this.state.school == ''){
      return "学校を選んでください"
    }else {
      return this.state.school
    }
  }
  _onPressHandle() {
        this.picker.toggle();
        if(this.state.viewHeight._value != 300){
          Animated.spring(
            this.state.viewHeight,
            {toValue: 300}
          ).start()
        }
        else{
          this._slideDown()
        }
  }

  _slideDown() {
    Animated.spring(
      this.state.viewHeight,
      {toValue: 0}
    ).start()
  }

  _getSchoolData() {
    this.refs.CrawlWebView.controllWebView()
    store.update('user',{
      school: this.state.school[0]
    })
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

          <TouchableOpacity onPress={this._onPressHandle.bind(this)}>
            <Text style={{margin: 20,height: 40, fontSize: 20, color: 'white'}}>
              {this.schoolText()}
            </Text>
          </TouchableOpacity>
          <Picker
            ref={picker => this.picker = picker}
             style={{
                 height: 300
             }}
             showMask={true}
             showDuration={300}
             pickerData={this.state.schools}//picker`s value List
             selectedValue={"大阪大学"}
             onPickerDone={(school)=>{
               console.log(school)
               this.setState({
                 school: school
               })
               this._slideDown()
             }}
             onPickerCancel={()=>{
               this._slideDown()
             }}
             />

           <Button style={styles.buttonWhite} textStyle={styles.buttonWhiteText} onPress={this._getSchoolData.bind(this)}>
                 学校からデータをとる
            </Button>
            <Animated.View style={{height: this.state.viewHeight }}/>
          <CrawlWebView ref="CrawlWebView" ID={this.state.id} PW={this.state.pw} school={this.state.school} />
      </View>
    )
  }
}
