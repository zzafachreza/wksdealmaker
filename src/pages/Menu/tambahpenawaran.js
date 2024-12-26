import { View, ScrollView, TextInput, Text, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import { Color, colors, fonts } from '../../utils';
import { MyCalendar, MyHeader, MyImageUpload, MyInput, MyPicker } from '../../components';

export default function TambahPenawaran({ navigation }) {
return (
    <View
        style={{
            flex: 1,
            backgroundColor: colors.white,
        }}
    >
        <View>
            <MyHeader title="Buat Penawaran" />
        </View>
        <ScrollView>
            <View
                style={{
                    padding: 20,
                }}
            >
                <MyInput label="Kepada :" colorlabel={colors.primary} placeholder="Isi Jawaban" />

                <MyInput label="Up/Cc :" colorlabel={colors.primary} placeholder="Isi Jawaban" />

                <MyCalendar label="Tanggal :" />

                <MyInput label="Email/No Telepon" placeholder="Isi Jawaban"  colorlabel={colors.primary}/>

                <MyPicker label="Part No :" />

                <View
                    style={{
                        marginVertical: 10, // Memberikan ruang antar elemen
                    }}
                >
                <Text style={{
                    fontFamily:fonts.primary[600],
                    color:colors.primary,
                    left:10
                }}>Description :</Text>
                    <TextInput
                        placeholder="Isi Jawaban" 
                        multiline={true} 
                        style={{
                            height: 150, 
                            borderColor: Color.blueGray[300], 
                            borderWidth: 1,
                            borderRadius: 30, 
                            padding: 10,
                            textAlignVertical: 'top', 
                            backgroundColor: colors.white, 
                            fontSize: 14, 
                            color: colors.black,
                            paddingLeft: 20,
                        }}
                    />
                </View>

                <MyInput label="Price :" placeholder='Isi Jawaban'  colorlabel={colors.primary}/>

                <View
                    style={{
                        marginVertical: 10, // Memberikan ruang antar elemen
                    }}
                >
                <Text style={{
                    fontFamily:fonts.primary[600],
                    color:colors.primary,
                    left:10
                }}>Note :</Text>
                    <TextInput
                        placeholder="Isi Jawaban" 
                        multiline={true} 
                        style={{
                            height: 150, 
                            borderColor: Color.blueGray[300], 
                            borderWidth: 1,
                            borderRadius: 30, 
                            padding: 10,
                            textAlignVertical: 'top', 
                            backgroundColor: colors.white, 
                            fontSize: 14, 
                            color: colors.black,
                            paddingLeft: 20,
                        }}
                    />
                </View>

                        <View style={{
                            padding:1,
                            backgroundColor:Color.blueGray[300],
                            borderRadius:50
                        }}></View>

                        <MyPicker label='Payment' data={[
                            {label:'Cash Before Delivery', value:'Cash Before Delivery'},
                            {label:'DP 50% After Receive Order (ARO), Pelunasan 50% Setelah Barang Ready', value:'DP 50% After Receive Order (ARO), Pelunasan 50% Setelah Barang Ready'},
                            {label:'DP 30% After Receive Order (ARO), Pelunasan 70% Setelah Barang Ready', value:'DP 30% After Receive Order (ARO), Pelunasan 70% Setelah Barang Ready'}
                        ]}/>

                        <MyPicker label='Payment' data={[
                            {label:'7 Hari', value:'7 Hari'},
                            {label:'14 Hari', value:'14 Hari'},
                            {label:'30 Hari', value:'30 Hari'},
                            {label:'60 Hari', value:'60 Hari'},
                            {label:'90 Hari', value:'90 Hari'}
                        ]}/>

                          <MyInput label="Nomor HP :" placeholder='Isi Jawaban'  colorlabel={colors.primary}/>
                        
                        <MyImageUpload/>

                        <View style={{
                            marginTop:20
                        }}>
                            <TouchableNativeFeedback>
                                <View style={{
                                    padding:10,
                                    backgroundColor:colors.primary,
                                    borderRadius:30,
                                    
                                }}>
                                <Text style={{
                                    color:colors.white,
                                    fontSize:15,
                                    textAlign:'center',
                                    fontFamily:fonts.primary[600]
                                }}>Selanjutnya</Text>

                                </View>
                            </TouchableNativeFeedback>
                        </View>
            </View>
        </ScrollView>
    </View>
);
}
