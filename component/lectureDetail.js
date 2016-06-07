import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from 'apsl-react-native-button'

import styles from './../style/style'

const lecture = {
  code: "080246",
  lectureName: "応用物理学",
  lectureRoom: "工/P1-311",
  lectureTeacher: "山本　吉孝",
}

const timeLineData = [
  {
    date: '2016-3-8',
    context: '레포트'
  },
  {
    date: '2016-3-2',
    context: '시험'
  },
  {
    date: '2016-3-9',
    context: '과제'
  },
  {
    date: '2016-3-27',
    context: '쪽지시험'
  }

]

export default class PageOne extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{height: 64}} />
        <LectureInfo />
        <LectureAttend />
        <LectureTimeLine />
      </View>
    )
  }
}

class TimeLineItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let item = this.props.item
    return (
      <View style={{flexDirection: 'row', padding: 10, paddingLeft: 20, borderBottomWidth: 0.5, borderColor: '#A0A0A0', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{width: 100, fontSize: 15}} >{item.date}</Text>
        <Text style={{ marginLeft: 20, flex: 1, fontSize: 15}}>{item.context}</Text>
      </View>
    )
  }
}

class LectureTimeLine extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <View>
        <View style={{backgroundColor: '#95a5a6'}}>
          <Text style={{color: '#FFFFFF', marginTop: 10, marginBottom: 10, marginLeft: 20}}>
            タイムライン
          </Text>
        </View>
        <View>
          {
            timeLineData.map((timeLineDataItem, index) => {
              return <TimeLineItem key={index} item={timeLineDataItem}/>
            })
          }
        </View>
      </View>
    )
  }
}
class LectureInfo extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View>
        <View style={{backgroundColor: '#95a5a6'}}>
          <Text style={{color: '#FFFFFF', marginTop: 10, marginBottom: 10, marginLeft: 20}}>
            授業情報
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 10}}>
          <Text style={{fontSize: 18}}>
            장소 :
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {" " + lecture.lectureRoom}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: 20}}>
          <Text style={{fontSize: 18}}>
            교수 :
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {" " + lecture.lectureTeacher}
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Button style={{flex: 1, margin: 15, marginLeft: 30, backgroundColor: '#34495e'}} textStyle={{color: '#FFFFFF'}}>
            授業評価
          </Button>
          <Button style={{flex: 1, margin: 15, marginLeft: 30, backgroundColor: '#34495e'}} textStyle={{color: '#FFFFFF'}}>
            授業詳しく
          </Button>
        </View>
      </View>
    )
  }
}
class LectureAttend extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View>
        <View style={{backgroundColor: '#95a5a6'}}>
          <Text style={{color: '#FFFFFF', marginTop: 10, marginBottom: 10, marginLeft: 20}}>
            오늘의 출석
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button style={{flex: 1, backgroundColor: '#2ecc71', borderWidth: 0, margin: 20}} textStyle={{color: '#FFFFFF'}}>
            출석
          </Button>
          <Button style={{flex: 1, backgroundColor: '#f1c40f', borderWidth: 0, margin: 20}} textStyle={{color: '#FFFFFF'}}>
            지각
          </Button>
          <Button style={{flex: 1, backgroundColor: '#e74c3c', borderWidth: 0, margin: 20}} textStyle={{color: '#FFFFFF'}}>
            결석
          </Button>
        </View>
        <Button style={{flex: 1, backgroundColor: '#34495e', borderWidth: 0, margin: 20}} textStyle={{color: '#FFFFFF'}}>
          이 수업의 예전자료
        </Button>
      </View>
    )
  }
}
