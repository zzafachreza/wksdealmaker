import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MyDimensi, fonts, windowWidth, } from '../../utils/fonts';
import { Icon } from 'react-native-elements';
import { Color, colors } from '../../utils';

export default function MyButton({
  title,
  warna = colors.primary,
  onPress,
  Icons,
  radius = 20,
  colorText = colors.white,
  fontWeight = 'normal',
  iconColor = colors.primary,
  borderSize = 2,
  kiri = true,
  borderColor = Color.blueGray[300],
}) {
  return (
    <TouchableOpacity
      style={styles(warna, radius, borderSize, borderColor).btn}
      onPress={onPress}>
      
      {kiri && <Icon type="ionicon" name={Icons} color={iconColor} size={24} />}
      <Text
        style={{
          color: colorText,

          marginLeft: kiri ? 5 : 0,
          marginRight: !kiri ? 5 : 0,
          ...fonts.subheadline3,
          // fontWeight: fontWeight,
        }}>
        {title}
      </Text>
      {!kiri && <Icon type="ionicon" name={Icons} color={iconColor} size={24} />}
    </TouchableOpacity>
  );
}

const styles = (warna, radius, borderSize, borderColor) =>
  StyleSheet.create({
    btn: {
      height: 50,
      borderRadius: radius,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: warna,
      borderWidth: borderSize,
      borderColor: borderColor,
      flexDirection: 'row',
      
    },
  });
