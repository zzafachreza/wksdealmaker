import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { Color, colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export default function MyPicker({
  label,
  iconname,
  onValueChange,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  label2,
  styleLabel,
  colorIcon = colors.primary,
  data = [],
}) {
  return (
    <>
      <Text
        style={{
          fontFamily:fonts.primary[600],
          color: colors.primary,
          marginBottom: 8,
          marginTop:10,
          marginLeft:10,

          
        }}>
        {label}
      </Text>

      <View style={{
        backgroundColor: colors.white,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: Color.blueGray[300],
        height:40
      }}>
        <View style={{
          position: 'absolute',
          left: 12,
          top: 13,
        }}>
          <Icon type='ionicon' name={iconname} color={Color.blueGray[300]} size={24} />
        </View>
        <Picker style={{ width: '90%', height: 50, left: 30, transform: [{ scale: 1 }], top:-7 }}
          selectedValue={value} onValueChange={onValueChange}>
          {data.map(item => {
            return <Picker.Item textStyle={{ fontSize: 12, ...fonts.body2, color: colors.primary,}} value={item.value} label={item.label} />;
          })}
        </Picker>
        <View style={{
          position: 'absolute',
          right: 12,
          top: 7,
          backgroundColor: Color.white[900]
        }}>
          <Icon type='ionicon' name='caret-down-outline' color={Color.blueGray[300]} size={24} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});