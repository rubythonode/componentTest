import React, { Component, } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Picker,
} from 'react-native'

const Item = Picker.Item

import styles from './../style/style'

import store from 'react-native-simple-store'

const DropDown = require('react-native-dropdown');
const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;


class TimeTableSetting extends Component {
  constructor(props) {
    super(props)
  }

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }


  componentDidMount() {
    updatePosition(this.refs['TimeTableDaySelect']);
    updatePosition(this.refs['TimeTableTimeSelect']);
    updatePosition(this.refs['OPTIONLIST']);

    store.get('setting')
      .then((setting)=> {
        console.log(setting)
        this.setState({
          timeTableDaySetting: setting.timeTableDaySetting,
          timeTableTimeSetting: setting.timeTableTimeSetting,
        })
      })
  }

  _selectDaySetting(day) {
    switch (day) {
      case "平日のみ":
        this.setState({
          timeTableDaySetting: 5
        })
        break;
      case "平日＋土曜日":
        this.setState({
          timeTableDaySetting: 6
        })
        break;
      default:

    }
  }

  _selectTimeSetting(time) {
    this.setState({
      timeTableTimeSetting: time
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <Select
          style={{backgroundColor: 'white'}}
          width={250}
          ref="TimeTableDaySelect"
          optionListRef={this._getOptionList.bind(this)}
          defaultValue="なん曜日まで？"
          onSelect={this._selectDaySetting.bind(this)}>
          <Option>見たくない</Option>
          <Option>平日のみ</Option>
          <Option>平日＋土曜日</Option>
          <Option>平日＋土日曜日</Option>
        </Select>

        <View style={{ height: 10 }}/>

        <Select
          style={{backgroundColor: 'white'}}
          width={250}
          ref="TimeTableTimeSelect"
          optionListRef={this._getOptionList.bind(this)}
          defaultValue="なん限まで？"
          onSelect={this._selectTimeSetting.bind(this)}>
          <Option>１限</Option>
          <Option>２限</Option>
          <Option>３限</Option>
          <Option>４限</Option>
          <Option>５限</Option>
          <Option>６限</Option>
          <Option>７限</Option>
          <Option>８限</Option>
          <Option>９限</Option>
        </Select>

        <View style={{ height: 20 }}></View>


        <OptionList ref="OPTIONLIST"/>

      </View>
    )
  }
}

export default TimeTableSetting
