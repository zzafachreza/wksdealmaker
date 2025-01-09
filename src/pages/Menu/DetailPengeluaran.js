import { View, Text, ScrollView, TouchableNativeFeedback, Alert } from 'react-native'
import React from 'react'

import { MyButton, MyHeader } from '../../components'
import { Image } from 'react-native'
import { Color, colors, fonts } from '../../utils'
import axios from 'axios'
import { apiURL, MYAPP } from '../../utils/localStorage'
import { useToast } from 'react-native-toast-notifications'

export default function DetailPengeluaran({ navigation, route }) {
    const item = route.params;
    const toast = useToast();
    const hapusData = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
            { text: "tidak" },
            {
                text: 'HAPUS',
                onPress: () => {
                    axios.post(apiURL + 'delete_data', {
                        table: 'pengeluaran',
                        id: item.id_pengeluaran
                    }).then(res => {
                        if (res.data.status == 200) {
                            toast.show(res.data.message, {
                                type: 'success'
                            });
                            navigation.goBack();
                        }
                    })
                }
            }
        ])
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white,

        }}>
            <View>
                <MyHeader title='Bukti Pengeluaran Kegiatan' />
            </View>
            <View style={{
                flex: 1,
                padding: 10,
            }}>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ fontFamily: fonts.secondary[600], fontSize: 12, }}>Tanggal</Text>
                    <Text style={{ fontFamily: fonts.secondary[800], fontSize: 12, }}>{item.tanggal}</Text>
                </View>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ fontFamily: fonts.secondary[600], fontSize: 12, }}>Tujuan Pengeluaran</Text>
                    <Text style={{ fontFamily: fonts.secondary[800], fontSize: 12, }}>{item.tujuan}</Text>
                </View>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ fontFamily: fonts.secondary[600], fontSize: 12, }}>Nominal</Text>
                    <Text style={{ fontFamily: fonts.secondary[800], fontSize: 12, }}>Rp {new Intl.NumberFormat().format(item.nominal)}</Text>
                </View>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ fontFamily: fonts.secondary[600], fontSize: 12, }}>Nama Karyawan</Text>
                    <Text style={{ fontFamily: fonts.secondary[800], fontSize: 12, }}>{item.nama_karyawan}</Text>
                </View>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ fontFamily: fonts.secondary[600], fontSize: 12, }}>Bukti Foto Nota</Text>
                    <Image source={{
                        uri: item.foto_pengeluaran
                    }} style={{
                        width: 200,
                        height: 200,
                        resizeMode: 'contain'
                    }} />
                </View>
            </View>

            <View style={{
                paddingBottom: 10,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <View style={{
                    flex: 1,
                    marginHorizontal: 2,
                }}>
                    <MyButton title="Edit" onPress={() => navigation.navigate('EditPengeluaran', item)} />
                </View>

                <View style={{
                    flex: 1,
                    marginHorizontal: 2,
                }}>
                    <MyButton onPress={hapusData} title="Hapus" warna={colors.danger} />
                </View>
            </View>


        </View>
    )
}