import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from 'apsl-react-native-button'

import styles from './../style/style'

import CrawlWebView from './crawlSchool/crawlWebView'

import Picker from 'react-native-picker';

export default class getSchool extends Component {
  constructor(props){
    super(props)
    this.state ={
      id: '',
      pw: '',
      schools : ["大阪大学", "京都大学"],
      school: '',
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
             showDuration={300}
             showMask={true}
             pickerData={this.state.schools}//picker`s value List
             selectedValue={"大阪大学"}
             onPickerDone={(school)=>{
               console.log(school)
               this.setState({
                 school: school
               })
             }}//when confirm your choice
             />
             <Button style={styles.buttonWhite} textStyle={styles.buttonWhiteText} onPress={()=> {
                 this.refs.CrawlWebView.controllWebView()
               }}>
                 学校からデータをとる
               </Button>
          <CrawlWebView ref="CrawlWebView" ID={this.state.id} PW={this.state.pw} school={this.state.school} />
      </View>
    )
  }
}
