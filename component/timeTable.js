import React, { Component, } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native'

import store from 'react-native-simple-store'

import {
    Actions,
} from 'react-native-router-flux'

class TimeTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            student: {
                timeTable: 'None'
            }
        }
    }
    componentWillMount() {
      store.get('setting')
        .then((setting) => {
          console.log(setting)
          this.setState({
            daySetting: setting.timeTableDaySetting,
            timeSetting: setting.timeTableTimeSetting,
          })
        })
    }

    componentDidMount() {
        store.get('student')
          .then((student)=> {
            console.log(student)
            if(student !== null){
              this.setState({
                student: student.data
              })
            }
          })
    }

    render() {
        var timeTableData = this.state.student.timeTable
        if(timeTableData != 'None' && this.state.daySetting && this.state.timeSetting){
          console.log(this.state.daySetting)
          var daySetting = this.state.daySetting
          var timeSetting = this.state.timeSetting
            return(
                <View style={styles.container}>
                    <View style={{height: 64}}>
                    </View>
                    <View style={styles.timeTableContainer}>
                        {
                            timeTableData.map(function(timeTableDay, indexWeek){
                              if(indexWeek < daySetting) {
                                return <TimeTableDay
                                  timeTableDayData={timeTableDay}
                                  style={styles.timeTableDay}
                                  timeSetting={timeSetting}
                                  key={indexWeek}></TimeTableDay>
                              }
                            })
                        }
                    </View>
                    <View style={{height: 50}}>
                    </View>
                </View>
            )
        }else {
            return(
                <View style={styles.container}>
                    <Text>
                        まだ時間割がありません。登録してください。
                    </Text>
                </View>
            )
        }
    }
}

class TimeTableDay extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        var timeTableDay = this.props.timeTableDayData
        var timeSetting = this.props.timeSetting
        return (
            <View style={{flexDirection: 'column', flex: 1}}>
                <View style={styles.timeTableContainerColumn}>
                    {
                        timeTableDay.map(function(timeTableLecture, indexLecture){
                          if(timeSetting > indexLecture){
                            if(timeTableLecture.lectureName == 'None'){
                                return <TimeNoneCell key={indexLecture}></TimeNoneCell>
                            }else {
                                return <TimeTableCellLecture lecture={timeTableLecture} key={indexLecture}></TimeTableCellLecture>
                            }
                          }
                        })
                    }
                </View>
            </View>
        )
    }
}

class TimeNoneCell extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <View style={styles.timeTableNoneCell}>

            </View>
        )
    }
}

class TimeTableCellLecture extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        var lecture = this.props.lecture
        return(
            <View style={styles.timeTableCell}>
                <Text style={{flex: 1, fontSize: 12, color: 'white', padding: 1}}>
                    {lecture.lectureName}
                </Text>
                <Text style={{fontSize: 10, color: 'white'}}>
                    {lecture.lectureRoom}
                </Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    timeTableContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    timeTableContainerColumn: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    timeTableDay: {
        flex: 1,
    },
    timeTableCell: {
        flex: 1,
        backgroundColor: '#FF6F00',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderColor: '#C0C0C0',

    },
    timeTableNoneCell: {
      flex: 1,
      opacity: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderWidth: 0.5,
      borderColor: '#C0C0C0',
    }
})

export default TimeTable
