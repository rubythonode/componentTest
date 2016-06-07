import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './../style/style'

const lecutre = {
  code: "080246",
  lectureName: "応用物理学",
  lectureRoom: "工/P1-311",
  lectureTeacher: "山本　吉孝",
}

export default class PageOne extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <LectureInfo />
        <LectureAttend />
        <LectureTimeLine />
      </View>
    )
  }
}

class LectureInfo extends Component {
  constructor(props) {
    super(props)
  }
  render() {

  }
}
class LectureAttend extends Component {
  constructor(props) {
    super(props)
  }
  render() {

  }
}
class LectureTimeLine extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    
  }
}
