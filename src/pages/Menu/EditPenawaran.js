import { View, ScrollView, TextInput, Text, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color, colors, fonts } from '../../utils';
import { MyCalendar, MyHeader, MyImageUpload, MyInput, MyPicker } from '../../components';
import moment from 'moment';
import { apiURL, getData } from '../../utils/localStorage';
import axios from 'axios';
import { Col } from 'react-native-table-component';
import { useToast } from 'react-native-toast-notifications';

export default function EditPenawaran({ navigation, route }) {

    const [filteredPartNo, setFilteredPartNo] = useState([]);
    const allPartNos = ["PN12345", "PN54321", "PN67890"];
    const getPartNumber = (x) => {
        axios.post(apiURL + 'get_part', {
            key: x
        }).then(res => {
            console.log(res.data);
            setFilteredPartNo(res.data)
        })
    }

    const handlePartNoChange = (text) => {
        setData((prevState) => ({ ...prevState, partno: text }));
        const filtered = allPartNos.filter((item) =>
            item.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredPartNo(filtered);
    };


    const selectPartNo = (partNo) => {
        setData((prevState) => ({ ...prevState, partno: partNo }));
        setFilteredPartNo([]); // Kosongkan hasil filter setelah memilih
    };

    const [user, setUser] = useState({});
    const toast = useToast();


    const [data, setData] = useState(route.params);

    const handleDateChange = (date) => {
        console.log("Tanggal yang di pilih :", date);
        setData((prevstate) => ({ ...prevstate, tanggal: date }))
    }

    const sendServer = () => {
        console.log(data);
        axios.post(apiURL + 'penawaran_update', data).then(res => {
            console.log(res.data);
            if (res.data.status == 200) {
                toast.show(res.data.message, {
                    type: 'success'
                });
                navigation.pop(2);
            }
        })
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
                        onChangeText={(x) => setData({ ...data, 'kepada': x })}
                    />

                    <MyInput
                        label="Up/Cc :"
                        colorlabel={colors.primary}
                        placeholder="Isi Jawaban"
                        value={data.cc}
                        onChangeText={(x) => setData({ ...data, 'cc': x })}
                    />

                    <MyCalendar
                        label="Tanggal :"
                        value={data.tanggal || new Date()}
                        onDateChange={handleDateChange}
                    />

                    <MyInput
                        value={data.email_telepon}
                        label="Email/No Telepon"
                        placeholder="Isi Jawaban"
                        colorlabel={colors.primary}
                        onChangeText={(x) => setData({ ...data, 'email_telepon': x })}

                    />

                    <MyInput
                        label="Part No:"
                        colorlabel={colors.primary}
                        value={data.part_no}
                        onEndEditing={x => getPartNumber(x.nativeEvent.text)}
                        onChangeText={(x) => setData({ ...data, 'part_no': x })}
                    />
                    {filteredPartNo.length > 0 &&
                        <View style={{
                            padding: 10,
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 10,
                            borderColor: Color.blueGray[300]
                        }}>
                            {filteredPartNo.map(i => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        setData({ ...data, 'part_no': i.part_number });
                                        setFilteredPartNo([]);
                                    }} style={{
                                        marginVertical: 5,
                                        backgroundColor: Color.blueGray[50],
                                        padding: 5,
                                    }}>
                                        <Text style={{
                                            fontSize: 11,
                                            fontFamily: fonts.secondary[600],
                                            color: colors.primary,
                                        }}>{i.part_number} - {i.part_description}</Text>
                                    </TouchableOpacity>
                                )
                            })
                            }
                        </View>
                    }


                    <View
                        style={{
                            marginVertical: 10, // Memberikan ruang antar elemen
                        }}
                    >
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            color: colors.primary,
                            left: 10
                        }}>Description :</Text>
                        <TextInput
                            value={data.deskripsi}
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
                            onChangeText={(x) => setData({ ...data, 'deskripsi': x })}
                        />
                    </View>

                    <MyInput
                        label="Price :"
                        placeholder='Isi Jawaban'
                        colorlabel={colors.primary}
                        value={data.harga}
                        keyboardType='number-pad'
                        onChangeText={(x) => setData({ ...data, harga: x })}
                    />

                    <View
                        style={{
                            marginVertical: 10, // Memberikan ruang antar elemen
                        }}
                    >
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            color: colors.primary,
                            left: 10
                        }}>Note :</Text>
                        <TextInput
                            value={data.catatan}
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

                            onChangeText={(x) => setData({ ...data, catatan: x })}
                        />
                    </View>

                    <View style={{
                        padding: 1,
                        backgroundColor: Color.blueGray[300],
                        borderRadius: 50
                    }}></View>

                    <MyPicker
                        value={data.payment}
                        onChangeText={(x) => setData({ ...data, payment: x })}  // Pastikan onValueChange diteruskan
                        label="Payment"
                        data={[
                            { label: 'Cash Before Delivery', value: 'Cash Before Delivery' },
                            { label: 'DP 50% After Receive Order (ARO), Pelunasan 50% Setelah Barang Ready', value: 'DP 50% After Receive Order (ARO), Pelunasan 50% Setelah Barang Ready' },
                            { label: 'DP 30% After Receive Order (ARO), Pelunasan 70% Setelah Barang Ready', value: 'DP 30% After Receive Order (ARO), Pelunasan 70% Setelah Barang Ready' }
                        ]}
                    />




                    <MyPicker
                        label='Stock'
                        value={data.stock}
                        onChangeText={(x) => setData({ ...data, 'stock': x })}
                        data={[
                            { label: 'Ready Stock, Sebelum Terjual', value: 'Ready Stock, Sebelum Terjual' },
                            { label: '7 Hari Kerja', value: '7 Hari Kerja' },
                            { label: '14 Hari Kerja', value: '14 Hari Kerja' },
                            { label: '30 Hari Kerja', value: '30 Hari Kerja' },
                            { label: '60 Hari Kerja', value: '60 Hari Kerja' },
                            { label: '90 Hari Kerja', value: '90 Hari Kerja' }
                        ]} />



                    <View style={{
                        marginTop: 20
                    }}>
                        <TouchableNativeFeedback onPress={sendServer}>
                            <View style={{
                                padding: 10,
                                backgroundColor: colors.primary,
                                borderRadius: 30,

                            }}>
                                <Text style={{
                                    color: colors.white,
                                    fontSize: 15,
                                    textAlign: 'center',
                                    fontFamily: fonts.primary[600]
                                }}>Selanjutnya</Text>

                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
