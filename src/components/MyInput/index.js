import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Color, colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { TextInput } from 'react-native-gesture-handler';

export default function MyInput({
  onFocus,
  label,
  nolabel = false,
  borderColor = Color.blueGray[300],
  backgroundColor = colors.white,
  editable,
  icon = true,
  onEndEditing,
  maxLength,
  iconname,
  onChangeText,
  value,
  colorlabel = colors.black,
  borderWidth = 1,
  textColor = colors.black,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  autoFocus,
  multiline,
  label2,
  styleLabel,
  colorIcon = colors.black,
  rightLabel,  // Tambahkan parameter untuk label di kanan
}) {

  const [tutup, setTutup] = useState(true);
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{
        fontFamily: fonts.primary[600],
        color: colorlabel,
        marginBottom: 8,
        marginLeft: 10
      }}>{label}</Text>
      <View style={{
        height: 40,
        flexDirection: 'row', // Gunakan row agar TextInput dan label bisa sejajar
        alignItems: 'center', // Align center agar teks sejajar vertikal
        borderWidth: 1,
        borderRadius: 30,
        borderColor: borderColor,
        backgroundColor: 'white',
      }}>
        {icon && (
          <View style={{
            paddingLeft: 12,
          }}>
            <Icon type='ionicon' name={iconname} color={Color.blueGray[300]} size={24} />
          </View>
        )}
        <TextInput
          onEndEditing={onEndEditing}
          maxLength={maxLength}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          value={value}
          placeholderTextColor={Color.blueGray[400]}
          editable={editable}
          multiline={multiline}
          autoFocus={autoFocus}
          onFocus={onFocus}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry ? tutup : false}
          autoCapitalize="none"
          style={{
            ...fonts.body3,
            flex: 1, // Flex untuk mengisi ruang yang ada
            paddingLeft: icon ? 10 : 40,
            paddingRight: rightLabel ? 10 : 0, // Spasi tambahan jika ada rightLabel
            height: 50,
            color: Color.blueGray[900],
          }}
        />
        {rightLabel && (
          <Text style={{
            ...fonts.body3,
            color: colors.primary,
            paddingRight: 12, // Spasi di kanan untuk label
          }}>
            {rightLabel}
          </Text>
        )}
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setTutup(!tutup)} style={{
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
            <Icon type="ionicon" name={!tutup ? 'eye-off' : 'eye'} color={colors.border} size={18} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
