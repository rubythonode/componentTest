import React, { Component } from 'react';
import { Router,
         Scene,
         TabBar } from 'react-native-router-flux';

import {
        View,
        Text,
      } from 'react-native';


import LoginWebView from './component/loginWebView'
import PageOne from './component/pageOne'
import ComponentSelector from './component/componentSelector'
import UserProfileSetting from './component/userProfileSetting'
import GetSchool from './component/getSchool'

import TimeTable from './component/timeTable'

import TimeTableSetting from './component/timeTableSetting'

import Ionicons from 'react-native-vector-icons/Ionicons';

const icon = <Ionicons name="ios-settings" color="gray" size={25}/>


export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="componentSelector" component={ComponentSelector} title="Selector" initial={true} />
          <Scene key="pageOne" component={PageOne} title="PageOne"/>
          <Scene key="loginWebView" component={LoginWebView} title="LoginWebView"/>
          <Scene key="userProfileSetting" component={UserProfileSetting} title="UserProfileSetting"/>
          <Scene key="getSchool" component={GetSchool} title="GetSchool"/>
          <Scene key="tabbar" tabs={true} component={TabBar} tabBarStyle={{backgroundColor: '#FFA000'}} hideNavBar={true}>
            <Scene key="timeTableTab" component={TimeTable} title="TimeTable"
                  initial={true} icon={TabIcon} rightTitle={icon} onRight={()=>{alert('setting')}}
                  ></Scene>
          </Scene>
          <Scene key="timeTableSetting" component={TimeTableSetting} title="TimeTableSetting" />
        </Scene>
      </Router>
    )
  }
}

class TabIcon extends Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'white' :'gray'}}>{this.props.title}</Text>
        );
    }
}
