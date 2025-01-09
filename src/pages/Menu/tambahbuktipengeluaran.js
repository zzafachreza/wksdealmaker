import { View, Text, ScrollView, TouchableNativeFeedback, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyCalendar, MyHeader, MyImageUpload, MyInput, MyPicker } from '../../components'
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { apiURL, getData, MYAPP } from '../../utils/localStorage';
import { useToast } from 'react-native-toast-notifications';


export default function TambahBuktiPengeluaran({ navigation }) {
    
 const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        getData('user').then(u => {
            setUser(u);
            setData({
                ...data,
                fid_user: u.id
            })
        })
    }, []);
    const [data, setData] = useState({
        tanggal: new Date(),
        jenis: '',
        nominal: '',
        nama_karyawan: user.name,
        tujuan: '',
        foto_pengeluaran: null,
    });

    

    const handleDateChange = (date) => {
        console.log("Tanggal yang dipilih:", date);
        setData({ ...data, tanggal: date });
    };

    const handleKirim = () => {
        if (data.jenis.length === '' || data.nominal.length === '' || data.nama_karyawan.length === '' || data.foto_pengeluaran === null) {
            showMessage({
                type: 'danger',
                color: 'white',
                backgroundColor: colors.danger,
                position: "top",
                style: { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, },
                textStyle: { fontFamily: fonts.primary[600], textAlign: "center" },
                message: "Mohon Semua Field Diisi!"
            });
        } else if (data.jenis.length === '') {
            showMessage({
                type: 'danger',
                color: 'white',
                backgroundColor: colors.danger,
                position: "top",
                style: { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, },
                textStyle: { fontFamily: fonts.primary[600], textAlign: "center" },
                message: "Mohon Isi Jenis Pengeluaran!"
            });
        } else if (data.nominal.length === '') {
            showMessage({
                type: 'danger',
                color: 'white',
                backgroundColor: colors.danger,
                position: "top",
                style: { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, },
                textStyle: { fontFamily: fonts.primary[600], textAlign: "center" },
                message: "Mohon Isi Nominal!"
            });
        } else if (data.nama_karyawan.length === '') {
            showMessage({
                type: 'danger',
                color: 'white',
                backgroundColor: colors.danger,
                position: "top",
                style: { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, },
                textStyle: { fontFamily: fonts.primary[600], textAlign: "center" },
                message: "Mohon Isi Nama Karyawan!"
            });
        } else if (data.foto_pengeluaran === null) {
            showMessage({
                type: 'danger',
                color: 'white',
                backgroundColor: colors.danger,
                position: "top",
                style: { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, },
                textStyle: { fontFamily: fonts.primary[600], textAlign: "center" },
                message: "Mohon Isi Nama Karyawan!"
            });
        } else {
            console.log("Data yang di kirim : ", data);

            axios
                .post(apiURL + 'pengeluaran_add', data)
                .then((res) => {
                    if (res.data.status == 200) {
                        toast.show(res.data.message, {
                            type: 'success'
                        });
                        navigation.goBack();
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        }
    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white,
        }}>
            <View>
                <MyHeader title='Bukti Pengeluaran Kegiatan' />
            </View>

            <ScrollView>
                <View style={{
                    padding: 10,

                }}>

                    <MyCalendar
                        label='Tanggal :'
                        value={data.tanggal || new Date()}
                        onDateChange={handleDateChange}
                    />

                    <MyInput
                        label='Jenis Pengeluaran'
                        placeholder='Isi Jawaban'
                        colorlabel={colors.primary}
                        value={data.jenis}
                        onChangeText={(x) => setData({ ...data, 'jenis': x })}

                    />

                    <MyInput
                        label='Nominal'
                        keyboardType='number-pad'
                        placeholder='Isi Jawaban'
                        colorlabel={colors.primary}
                        value={data.nominal}
                        onChangeText={(x) => setData({ ...data, 'nominal': x })}

                    />

                    <MyInput
                        label='Nama Karyawan'
                        placeholder='Isi Jawaban'
                        colorlabel={colors.primary}
                        value={user.nama_lengkap}
                        onChangeText={(x) => setData({ ...data, 'nama_karyawan': x })}
                    />

                    <MyPicker
                        label="Tujuan Pengeluaran"
                        data={[
                            { label: 'Kebutuhan Umum Kantor', value: 'Keperluan Umum Kantor' },
                            { label: 'Project', value: 'Project' },
                            { label: 'Service', value: 'Service' },
                            { label: 'Entertain', value: 'Entertrain' },
                        ]}
                        value={data.tujuan}
                        onChangeText={(x) => setData({ ...data, 'tujuan': x })}
                    />

                    <MyImageUpload label='Bukti Foto Nota' onImagePicked={(x) => setData({ ...data, 'foto_pengeluaran': x })} />




                    <View style={{
                        padding: 10,
                        marginTop: 20
                    }}>
                        <TouchableNativeFeedback onPress={handleKirim}>
                            <View style={{
                                padding: 10,
                                backgroundColor: colors.primary,
                                borderRadius: 30

                            }}>

                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    color: colors.white,
                                    textAlign: "center",
                                }}>Simpan</Text>

                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}