import React, { Component } from 'react';
import { View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

export default class Icon extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let iconName = this.props.iconName
    let color = this.props.color
    let size = this.props.size

    let renderedIcon = (<View></View>)
    switch (iconName) {
      case 'person':
        renderedIcon = <Ionicons name="md-person" size={size} color={color} />
        break;
      case 'calculator':
        renderedIcon = <Ionicons name="md-calculator" size={size} color={color} />
        break;
      case 'setting':
        renderedIcon = <Ionicons name="md-settings" size={size} color={color} />
        break;
      case 'chat':
        renderedIcon = <Ionicons name="md-chatboxes" size={size}  color={color} />
        break;
      case 'home':
        renderedIcon = <Ionicons name="md-home" size={size} color={color} />
        break;
      case 'pin':
        renderedIcon = <Ionicons name="md-pin" size={size} color={color} />
        break;
      case 'restaurant':
        renderedIcon = <Ionicons name="md-restaurant" size={size} color={color} />
        break;
      case 'graduate':
        renderedIcon = <Ionicons name="md-school" size={size} color={color} />
        break;
      case 'timeTable':
        renderedIcon = <Entypo name="sweden" color={color} size={size} color={color} />
        break;
      case 'calendar':
        renderedIcon = <Ionicons name="ios-calendar" size={size} color={color} />
        break;
      default:
        break;
    }
    return renderedIcon
  }
}
