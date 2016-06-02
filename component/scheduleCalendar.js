import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Calendar from 'react-native-calendar'
import moment from 'moment'

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
      seletedDate: moment().format('MMMM DD YYYY'),
      schedules: testEvent
    })

  }

  render() {
    return (
      <View>
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
          eventDates={['2016-06-10', '2016-06-11', '2016-06-10']}       // Optional array of moment() parseable dates that will show an event indicator
          customStyle={{day: {fontSize: 15, textAlign: 'center'}}} // Customize any pre-defined styles
         />
       <View>
         <ScheduleTime seletedDate={this.state.seletedDate} schedules={this.state.schedules}>
         </ScheduleTime>
       </View>
      </View>
    )
  }
}
