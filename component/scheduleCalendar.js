import React, { Component } from 'react';
import { View, Text, Animated, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Calendar from 'react-native-calendar'
import moment from 'moment'

import ActionButton from 'react-native-action-button'

import store from 'react-native-simple-store'

import styles from './../style/style'
import Button from 'apsl-react-native-button'

import Dimensions from 'Dimensions'
const {
  width, height
} = Dimensions.get('window')

const dayHeadingsArray = ["日","月","火","水","木","金","土"]
const monthHeadingsArray = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",]

const testEvent = [
  {
    date: '2016-06-10',
    category: 'circle',
    context: '오늘 밥'
  },
  {
    date: '2016-06-11',
    category: 'test',
    context: '유기화학 시험'
  },
  {
    date: '2016-06-10',
    category: 'report',
    context: '양자역학 레포트'
  }
]

class ScheduleItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let timeItem = this.props.timeItem
    return(
      <View style={{height: 60, borderWidth: 2, justifyContent: 'center', alignItems: 'center',}}>
        <Text>
          {timeItem.context}
        </Text>
      </View>
    )
  }
}

class ScheduleTime extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View>
        <View><Text>{this.props.seletedDate}의 스케쥴</Text></View>
        {
          this.props.schedules.map((scheduleItem, index)=> {
            if(scheduleItem.date == this.props.seletedDate){
              return <ScheduleItem key={index} timeItem={scheduleItem}></ScheduleItem>
            }
          })
        }
      </View>
    )
  }
}

export default class ScheduleCalendar extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount() {
    this.setState({
      seletedDate: moment().format('YYYY-MM-DD'),
      schedules: testEvent,
      addScheduleFormY: new Animated.Value(height)
    })
  }

  _addSchedule(seletedDate) {
    console.log(height)
    console.log(this.state.addScheduleFormY._value)
    if(this.state.addScheduleFormY._value != height){
      this._slideDown()
    }
    else{
      Animated.spring(this.state.addScheduleFormY,{
        toValue: -200
      }).start()
    }
  }

  _slideDown() {
    Animated.spring(this.state.addScheduleFormY,{
      toValue: height
    }).start()
  }

  _addCustomSchedule(event) {
    console.log(event)
    let schedules = this.state.schedules
    schedules.push(event)
    this.setState({
      schedules: schedules
    })
  }

  _getEventDate(schedules) {
    let eventDates = schedules.map((scheduleItem, index)=> {
      return scheduleItem.date
    })
    return eventDates
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 65}}>
        </View>
        <Calendar
          scrollEnabled={false}
          showControls={true}
          dayHeadings={dayHeadingsArray}
          monthHeadings={monthHeadingsArray}
          prevButtonText={'先月'}
          nextButtonText={'来月'}
          onDateSelect={(date) => {
            this.setState({seletedDate: moment(date).format('YYYY-MM-DD')})
          }}
          eventDates={this._getEventDate(this.state.schedules)}       // Optional array of moment() parseable dates that will show an event indicator
          customStyle={{day: {fontSize: 15, textAlign: 'center'}}} // Customize any pre-defined styles
         />

       <View style={{flex: 1}}>
         <ScheduleTime seletedDate={this.state.seletedDate} schedules={this.state.schedules} active={true}>
         </ScheduleTime>
       </View>
       <AddScheduleForm seletedDate={this.state.seletedDate} addScheduleFormY={this.state.addScheduleFormY} saveFunc={this._addCustomSchedule.bind(this)} slideDown={this._slideDown.bind(this)}/>
       <ActionButton type="tab" position="right" onPress={this._addSchedule.bind(this, this.state.seletedDate)} offsetY={70}>
       </ActionButton>
       <View style={{height: 60}}>
       </View>
    </View>
    )
  }
}

class AddScheduleForm extends Component {
  constructor(props){
    super(props)
  }

  _addSchedule() {
    let event = {
      date: this.props.seletedDate,
      context: this.state.title
    }
    this.props.saveFunc(event)
    this.props.slideDown()
  }
  render(){
    return(
      <Animated.View style={[{transform: [{translateY: this.props.addScheduleFormY}]},{backgroundColor: 'white', position: 'absolute', width: width, height: 300}]}>
        <TextInput
           style={styles.textInput}
           onChangeText={(text)=>this.setState({title: text})}
           placeholder={'Title'}
         />
        <View style={{flexDirection: 'row'}}>
          <Button>cancel</Button>
          <Button onPress={this._addSchedule.bind(this)}>save</Button>
        </View>
      </Animated.View>
    )
  }
}
