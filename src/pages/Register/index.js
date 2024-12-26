import { View, Text, ImageBackground, ScrollView, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { fonts } from '../../utils'
import { MyInput } from '../../components'
import { colors } from '../../utils/colors'

export default function Register() {
  return (
    <ImageBackground source={require('../../assets/bgregister.png')} style={{
        flex:1,
        width:"100%",
        height:"100%",
    }}>
      <ScrollView>
        <View style={{
            padding:10
        }}>

        <View style={{
            marginTop:'60%'
        }}>
            <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:25,
                textAlign:'center',
                color:'white',
            }}>Daftar</Text>

            <View style={{
                padding:10,
            }}>

            <MyInput label="Nama Lengkap" colorlabel='white' placeholder="Isi Nama Lengkap" />

            <MyInput label="Email" colorlabel='white' placeholder="Isi Email"/>

            <MyInput label="Telepon" colorlabel='white' placeholder="Isi Telepon"/>

            <MyInput label="Alamat Lengkap" colorlabel='white' placeholder="Isi Alamat Lengkap"/>

            <MyInput label="Kata Sandi" colorlabel='white' placeholder="Isi Kata Sandi" secureTextEntry={true}/>


            <View>
                <TouchableNativeFeedback>
                    <View style={{
                        padding:10,
                        backgroundColor:colors.secondary,
                        borderRadius:30,
                        marginTop:20,

                    }}>
                        <Text style={{
                            fontFamily:fonts.primary[600],
                            color:colors.white,
                            textAlign:'center',

                        }}>Daftar</Text>
                    </View>
                </TouchableNativeFeedback>

                
                                    <TouchableNativeFeedback onPress={() => navigation.navigate('Register')}>
                                        <Text style={{
                                            fontFamily:fonts.primary[500],
                                            color:'white',
                                            textAlign:'center',
                                            marginTop:10,
                                            fontSize:12,
                                        }}>Sudah memiliki akun? Silakan <Text style={{
                                            fontFamily:fonts.primary[600],
                                        }}>Masuk</Text></Text>
                                    </TouchableNativeFeedback>
            </View>
            </View>
        </View>

        </View>
      </ScrollView>
    </ImageBackground>
  )
}