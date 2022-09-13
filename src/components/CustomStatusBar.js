import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { parameters } from '../global/styles'

const CustomStatusBar = ({backgroundColor,barStyle = "dark-content"}) => {
    const insets = useSafeAreaInsets();
  return (
    <View style={{height: parameters.statusBarHeight,backgroundColor}}>
      <StatusBar animated={true} backgroundColor={backgroundColor} barStyle={barStyle} />
    </View>
  )
}

export default CustomStatusBar

const styles = StyleSheet.create({})