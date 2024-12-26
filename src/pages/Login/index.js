import { View, Text, ImageBackground, ScrollView, Image, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { MyInput } from '../../components'

export default function Login({navigation}) {
  return (
    <ImageBackground style={{
        flex:1,
        width:'100%',
        height:'100%',
        backgroundColor:'white'
    }} source={require('../../assets/bglogin.png')}>
      <ScrollView>
        <View style={{
            padding:10,
        }}>

       

        <View style={{
            marginTop:'105%',
            padding:10
        }}>
            <Text style={{
                fontFamily:fonts.primary[600],
                color:'white',
                fontSize:25,
                textAlign:'center'
                
            }}>Masuk</Text>

            <View style={{
                padding:10
            }}>
                <MyInput label="Email" placeholder="Isi Email"  colorlabel='white'/>

                <MyInput label="Kata Sandi" placeholder="Isi Kata Sandi"  colorlabel='white'/>

                <View style={{
                    flexDirection:'row',
                    justifyContent:"flex-end"
                }}>
                    <TouchableNativeFeedback>
                        <View style={{
                            marginTop:10,
                        }}>
                            <Text style={{
                                fontFamily:fonts.primary[600],
                                color:'white',
                                fontSize:12
                            }}>Lupa Kata Sandi</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>


                <View>
                    <TouchableNativeFeedback>
                        <View style={{
                            padding:10,
                            backgroundColor:colors.secondary,
                            borderRadius:30,
                            marginTop:10

                        }}>
                        <Text style={{
                            fontFamily:fonts.primary[600], 
                            color:colors.white,
                            textAlign:"center"
                            }}>Masuk</Text>

                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={() => navigation.navigate('Register')}>
                        <Text style={{
                            fontFamily:fonts.primary[500],
                            color:'white',
                            textAlign:'center',
                            marginTop:10,
                            fontSize:12,
                        }}>Belum memiliki akun? Silakan <Text style={{
                            fontFamily:fonts.primary[600],
                        }}>Daftar</Text></Text>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </View>

        </View>
      </ScrollView>
    </ImageBackground>
  )
}