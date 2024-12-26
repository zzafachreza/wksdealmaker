import { View, Text, ScrollView, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { MyHeader, MyInput } from '../../components'
import { colors } from '../../utils'
import { Icon } from 'react-native-elements'

export default function CheckHargaStock({}) {
  return (
    <View style={{
        flex:1,
        backgroundColor:'white',

    }}>
    <View>
        <MyHeader title="Cek Harga & Stok"/>
    </View>
     <ScrollView>
        <View>

        {/* SEARCH */}

        <View style={{
            padding:10,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:"center"

        }}>
        <View style={{
            width:215,
        }}>
            <MyInput backgroundColor='#f5f5f5' label="Enter Part Number : " colorlabel={colors.primary} placeholder='Please enter part number'/>
        </View>

        <View style={{
            width:60
        }}>
            <MyInput label='Qty :'/>
        </View>

            <View style={{
                marginTop:40
            }}>
                <TouchableNativeFeedback>
                    <View style={{
                        padding:10,
                        backgroundColor:colors.primary,
                        width:50,
                        height:43,
                        borderRadius:30,
                    }}>
                        <Icon type='ionicon' name='search-outline' color='white' size={20}/>
                    </View>
                </TouchableNativeFeedback>
            </View>

        </View>

        </View>
     </ScrollView>
    </View>
  )
}