import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class DetailLecture extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={{margin: 128}}>
        <Text>This is PageOne!</Text>
      </View>
    )
  }
}

class LectureInfo extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return(
      <View>
        <Text>장소</Text>
        <Text>교수</Text>
        <Text>다른 필요한 정보</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Button>이 수업 평가</Button>
          <Button>이 수업 자세히보기</Button>
        </View>
      </View>
    )
  }
}

class AttendCheck extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <View>
        <Text>오늘의 출석?</Text>
        <View>
          <Button>출석</Button>
          <Button>지각</Button>
          <Button>결석</Button>
        </View>
      </View>
    )
  }
}

class TimeLine extends Component {
  constructor(props){
    super(props)
  }
}
