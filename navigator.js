import React, { Component } from 'react';
import { Router,
         Scene,
         TabBar,
         Modal } from 'react-native-router-flux';

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
import ScheduleCalendar from './component/scheduleCalendar'

import TimeTableSetting from './component/timeTableSetting'
import UserMore from './component/userMore'

import LectureDetail from './component/lectureDetail'
import LectureEval from './component/lectureEval'

import Icon from './style/icon'

const SettingIcon = <Icon iconName="setting" color="gray" size={25}/>


export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="modal" component={Modal}>
          <Scene key="root">
            <Scene key="componentSelector" component={ComponentSelector} title="Selector" initial={true} />
            <Scene key="pageOne" component={PageOne} title="PageOne"/>
            <Scene key="loginWebView" component={LoginWebView} title="LoginWebView"/>
            <Scene key="userProfileSetting" component={UserProfileSetting} title="UserProfileSetting"/>
            <Scene key="getSchool" component={GetSchool} title="GetSchool"/>
            <Scene key="tabbar" tabs={true} component={TabBar} tabBarStyle={{backgroundColor: '#FFA000'}} hideNavBar={true}>
                  <Scene key="timeTableTab" initial={true} icon={TabIcon} title="TimeTable">
                    <Scene key="timeTable" component={TimeTable} title="TimeTable" initial={true}
                      rightTitle={SettingIcon} onRight={()=>{alert('setting')}}
                      />
                    <Scene key="lectureDetail" component={LectureDetail} title="LectureDetail"  />
                  </Scene>
                  <Scene key="scheduleCalendar" component={ScheduleCalendar} title="ScheduleCalendar"
                    icon={TabIcon}
                    />
            </Scene>
            <Scene key="timeTableSetting" component={TimeTableSetting} title="TimeTableSetting" />
            <Scene key="userMore" component={UserMore} title="UserMore" />
            <Scene key="lectureEval" component={LectureEval} title="LectureEval"  />
          </Scene>
        </Scene>
      </Router>
    )
  }
}



class TabIcon extends Component {
    render(){
      let title = this.props.title
      let selected = this.props.selected
      switch (title) {
        case "TimeTable":
          return <TimeTableIcon selected={selected} />
          break;
        case "ScheduleCalendar":
          return <ScheduleCalendarIcon selected={selected} />
          break;
        }
    }
}

class TimeTableIcon extends Component {
  render() {
    let color = this.props.selected ? '#FFFFFF' : '#A0A0A0'
    return (
      <View style={{flexDirection: 'column', alignItems: 'center', height: 32,}}>
        <Icon iconName="timeTable" color={color} size={28} />
        <Text style={{color: color, fontSize: 10}} >時間割</Text>
      </View>
    )
  }
}

class ScheduleCalendarIcon extends Component {
  render() {
    let color = this.props.selected ? '#FFFFFF' : '#A0A0A0'
    return(
      <View style={{flexDirection: 'column', alignItems: 'center', height: 32,}}>
        <Icon iconName="calendar" color={color} size={28} />
        <Text style={{color: color, fontSize: 10}} >カレンダー</Text>
      </View>
    )
  }
}
