import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from './../style/style';

import TextField from 'react-native-md-textinput';

import Picker from 'react-native-picker';


export default class UserProfileSetting extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: '',
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
           onChangeText={(text) => this.setState({text})}
           value={this.state.text}
           placeholder={'Input your name'}
         />
        <TextField style={{height: 40, borderColor: 'gray', width: 300}}
         label={'Input your School'}
         highlightColor={'white'}
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
      </View>
    )
  }
}
