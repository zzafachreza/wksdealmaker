import { View, ScrollView, TextInput, Text, TouchableNativeFeedback } from 'react-native';
import React, { useState } from 'react';
import { Color, colors, fonts } from '../../utils';
import { MyCalendar, MyHeader, MyImageUpload, MyInput, MyPicker } from '../../components';

export default function TambahPenawaran({ navigation }) {

    const [data, setData] = useState({
        kepada: '',
        cc: '',
        tanggal: new Date(),
        email: '',
        partno: '',
        description: '',
        price: '',
        note: '',
        payment: '',
        stock: '',
        nama_quotation: '',
        nomor_telepon: '',
        ttd:null
    });

    const handleDateChange = (date) => {
        console.log("Tanggal yang di pilih :", date);
        setData((prevstate) => ({...prevstate, tanggal: date}))
    }


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
                <MyInput
                 label="Kepada :" 
                 colorlabel={colors.primary} 
                 placeholder="Isi Jawaban" 
                value={data.kepada}
                onChangeText={(x) => setData({...data, 'kepada': x})}
                 />

                <MyInput 
                label="Up/Cc :" 
                colorlabel={colors.primary} 
                placeholder="Isi Jawaban" 
                value={data.cc}
                onChangeText={(x) => setData({...data, 'cc': x})}
                />

                <MyCalendar
                label="Tanggal :" 
                value={data.tanggal || new Date()}
                onDateChange={handleDateChange}
                 />

                <MyInput
                value={data.email}
                label="Email/No Telepon"
                placeholder="Isi Jawaban"  
                colorlabel={colors.primary}
                onChangeText={(x) => setData({...data,'email': x})}
                
                  />

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
                    value={data.description}
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
                        onChangeText={(x) => setData({...data,'description' : x})}
                    />
                </View>

                <MyInput 
                label="Price :" 
                placeholder='Isi Jawaban'  
                colorlabel={colors.primary}
                value={data.price}
                onChangeText={(x) => setData({...data,'price' : x})}
                />

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
                        value={data.note}
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
                    
                        onChangeText={(x) => setData({...data,'note' : x})}
                    />
                </View>

                        <View style={{
                            padding:1,
                            backgroundColor:Color.blueGray[300],
                            borderRadius:50
                        }}></View>

                        <MyPicker value={data.payment} 
                        onChangeText={(x) => 
                        setData({...data,'payment' : x})} 
                        label='Payment' 
                        data={[
                            {label:'Cash Before Delivery', value:'Cash Before Delivery'},
                            {label:'DP 50% After Receive Order (ARO), Pelunasan 50% Setelah Barang Ready', value:'DP 50% After Receive Order (ARO), Pelunasan 50% Setelah Barang Ready'},
                            {label:'DP 30% After Receive Order (ARO), Pelunasan 70% Setelah Barang Ready', value:'DP 30% After Receive Order (ARO), Pelunasan 70% Setelah Barang Ready'}
                        ]}

                        />

                        <MyPicker 
                        label='Stock'
                        value={data.stock}
                        onChangeText={(x) => setData({...data, 'stock' : x})}
                        data={[
                            {label:'Ready Stock', value:'Ready Stock'},
                            {label:'7 Hari Kerja', value:'7 Hari Kerja'},
                            {label:'14 Hari Kerja', value:'14 Hari Kerja'},
                            {label:'30 Hari Kerja', value:'30 Hari Kerja'},
                            {label:'60 Hari Kerja', value:'60 Hari Kerja'},
                            {label:'90 Hari Kerja', value:'90 Hari Kerja'}
                        ]}/>

                        <MyInput 
                        label="Nama Pembuat Quotation :" 
                        placeholder='Isi Jawaban'  
                        colorlabel={colors.primary}
                        value={data.nama_quotation}
                        onChangeText={(x) => setData({...data, 'nama_quotation' : x})}
                        />

                          <MyInput 
                          label="Nomor HP :" 
                          placeholder='Isi Jawaban'  
                          colorlabel={colors.primary}
                            value={data.nomor_telepon}
                            onChangeText={(x) => setData({...data,'nomor_telepon': x})}
                          />
                        
                        <MyImageUpload onImagePicked={(x) => setData({...data,'ttd' : x})}/>

                        <View style={{
                            marginTop:20
                        }}>
                            <TouchableNativeFeedback onPress={() => navigation.navigate('HasilBuatPenawaran')}>
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
