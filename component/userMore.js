import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
 } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Icon from './../style/icon'

export default class PageOne extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 64}}/>
        <UserProfile />
        <View style={{height: 64}} />
        <ToggleButtonGroup />
      </View>
    )
  }
}

class UserProfile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={{backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon iconName="person" size={30}/>
          <View style={{flex: 1}}>
            <Text>
              닉네임
            </Text>
            <Text>
              이름 / 아이디
            </Text>
            <Text>
              학교
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{flex: 1, borderWidth: 1, borderColor: 'gray'}}>
            <Text>
              내가 쓴 글
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, borderWidth: 1, borderColor: 'gray'}}>
            <Text>
              댓글 단 글
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, borderWidth: 1, borderColor: 'gray'}}>
            <Text>
              스크랩
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


class ToggleButtonGroup extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <ToggleButton iconName="person" size={28} title={"내 계정"}/>
          <ToggleButton iconName="person" size={28} title={"내 계정"}/>
          <ToggleButton iconName="person" size={28} title={"내 계정"}/>
          <ToggleButton iconName="person" size={28} title={"내 계정"}/>
        </View>
        <View style={{flexDirection: 'row'}}>
          <ToggleButton iconName="calculator" size={28} title={"학점 계산"}/>
          <ToggleButton iconName="calculator" size={28} title={"학점 계산"}/>
          <ToggleButton iconName="calculator" size={28} title={"학점 계산"}/>
          <ToggleButton iconName="calculator" size={28} title={"학점 계산"}/>
        </View>
      </View>
    )
  }
}

class ToggleButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={{flex: 1, borderColor: 'gray', borderWidth: 1, height: 100, backgroundColor: 'white',justifyContent: 'center',
      alignItems: 'center',flexDirection: 'row'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
          <Icon iconName={this.props.iconName} color={this.props.color} size={this.props.size}></Icon>
          <Text>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
