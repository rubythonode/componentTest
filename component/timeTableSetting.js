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

import Button from 'apsl-react-native-button'

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


  componentWillMount() {
    store.get('setting')
      .then((setting)=> {
        console.log(setting)
        this.setState({
          timeTableDaySetting: setting.timeTableDaySetting,
          timeTableTimeSetting: setting.timeTableTimeSetting,
        })
      })
  }

  componentDidMount() {
    updatePosition(this.refs['TimeTableDaySelect']);
    updatePosition(this.refs['TimeTableTimeSelect']);
    updatePosition(this.refs['OPTIONLIST']);
  }

  _selectDaySetting(day) {
    switch (day) {
      case "平日のみ":
        this.setState({
          timeTableDaySetting: 5,
        })
        break;
      case "平日＋土曜日":
        this.setState({
          timeTableDaySetting: 6,
        })
        break;
      case "見たくない":
        this.setState({
          timeTableDaySetting: 0,
        })
        break;
      default:
        this.setState({
          timeTableDaySetting: 5,
        })
        break;
    }

  }

  _selectTimeSetting(time) {
    this.setState({
      timeTableTimeSetting: parseInt(time.slice(0,1))
    })

  }

  render() {
    return(
      <View style={styles.container}>
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
            <Option>1限</Option>
            <Option>2限</Option>
            <Option>3限</Option>
            <Option>4限</Option>
            <Option>5限</Option>
            <Option>6限</Option>
            <Option>7限</Option>
            <Option>8限</Option>
            <Option>9限</Option>
          </Select>

          <View style={{ height: 20 }}></View>

          <OptionList ref="OPTIONLIST"/>
        </View>

        <Button onPress={this._saveSetting.bind(this)} style={styles.buttonWhite} textStyle={styles.buttonWhiteText}>
            Save timeTableSeting
        </Button>

      </View>
    )
  }

  _saveSetting() {
    store.update('setting', {
      timeTableDaySetting: this.state.timeTableDaySetting,
      timeTableTimeSetting: this.state.timeTableTimeSetting,
    })
  }
}

export default TimeTableSetting
