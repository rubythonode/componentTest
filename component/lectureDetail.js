import React, { Component } from 'react';
import { View, Text, Animated,TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from 'apsl-react-native-button'

import styles from './../style/style'

import config from './../config/config'
import changeSchool from './../config/changeSchool'

import ActionButton from 'react-native-action-button'

import Dimensions from 'Dimensions'
const {
  width, height
} = Dimensions.get('window')

import Calendar from 'react-native-calendar'
import moment from 'moment'

const dayHeadingsArray = ["日","月","火","水","木","金","土"]
const monthHeadingsArray = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",]

const baseUrl = config.baseUrl

const lecture = {
  code: "080246",
  lectureName: "応用物理学",
  lectureRoom: "工/P1-311",
  lectureTeacher: "山本　吉孝",
}



export default class LectureDetail extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount() {
    // lectureDetail은 timeTable에서 클릭해서 들어옴 이때 Actions.action(param)을 통해서 param을 받음
    // 그 param에 현재
    let lectureCode = this.props.lectureCode
    let school = changeSchool(this.props.school)
    this.setState({
      eval:[],
      timeLine: [],
      addTimeLinePageY: new Animated.Value(height),
      dataLoaded: false
    })
    fetch(baseUrl+`/lecture/${school}/${lectureCode}`)
    .then((response) => {
      return response.json()
    }).then((responseData) => {
      console.log(responseData)
      this.setState({
        eval: responseData.evaluation,
        timeLine: responseData.timeLine,
        dataLoaded: true,
      })
    })
  }

  _showAddTimeLinePage() {
    if(this.state.addTimeLinePageY._value != height){
      this._slideDown()
    }else {
      Animated.timing(this.state.addTimeLinePageY,{
        toValue: 0
      }).start()
    }
  }

  _slideDown(){
    Animated.timing(this.state.addTimeLinePageY,{
      toValue: height
    }).start()
  }

  _addTimeLineItem(timeLineItem){
    let timeLine = this.state.timeLine
    timeLine.push(timeLineItem)
    this.setState({
      timeLine: timeLine
    })


    let lectureCode = this.props.lectureCode
    let school = changeSchool(this.props.school)
    fetch(baseUrl+`/lecture/${school}/${lectureCode}/timeLine`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(timeLineItem)
    }).then((response)=> {
      //완료
    })

  }

  render() {
    if(this.state.dataLoaded){
      return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{height: 64}} />
          <LectureInfo lectureRoom={this.props.lectureRoom} lectureTeacher={this.props.lectureTeacher}/>
          <LectureAttend />
          <LectureTimeLine timeLineItems={this.state.timeLine}/>
          <AddTimeLinePage addTimeLinePageY={this.state.addTimeLinePageY} slideDown={this._slideDown.bind(this)} addFunc={this._addTimeLineItem.bind(this)}/>
          <ActionButton type="tab" position="right" offsetY={60}
            onPress={this._showAddTimeLinePage.bind(this)}
            addFunc={this._addTimeLineItem.bind(this)}
            />
        </View>
      )
    }
    else{
      //나중에 로딩 페이지 만들어서 넣어야함
      return (
        <View style={{flex:1 , backgroundColor: 'black'}}>

        </View>
      )
    }
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
    let timeLineData = this.props.timeLineItems
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
            {" " + this.props.lectureRoom}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: 20}}>
          <Text style={{fontSize: 18}}>
            교수 :
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {" " + this.props.lectureTeacher}
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


class AddTimeLinePage extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount() {
    this.setState({
      seletedDate: moment().format('YYYY-MM-DD'),
    })
  }

  _addTimeLineItem() {
    let timeLineItem ={
      date: this.state.seletedDate,
      context: this.state.title
    }
    console.log(timeLineItem)
    this.props.slideDown()
    this.props.addFunc(timeLineItem)
  }
  render() {
    return(
      <Animated.View style={[{transform: [{translateY: this.props.addTimeLinePageY}]},{backgroundColor: 'white', position: 'absolute', width: width, height: height, top:0}]}>
        <View style={{height: 64}} />
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
          customStyle={{day: {fontSize: 15, textAlign: 'center'}}} // Customize any pre-defined styles
         />
        <TextInput
           style={styles.textInput}
           onChangeText={(text)=>this.setState({title: text})}
           placeholder={'Title'}
         />
        <View style={{flexDirection: 'row'}}>
          <Button>cancel</Button>
          <Button onPress={this._addTimeLineItem.bind(this)}>save</Button>
        </View>
      </Animated.View>
    )
  }
}
