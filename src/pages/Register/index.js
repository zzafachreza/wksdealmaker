import { View, Text, ImageBackground, ScrollView, TouchableNativeFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import { fonts, windowWidth } from '../../utils'
import { MyGap, MyInput, MyLoading } from '../../components'
import { colors } from '../../utils/colors'
import { showMessage } from 'react-native-flash-message'
import axios from 'axios'
import { api_token, apiURL } from '../../utils/localStorage'
import { useToast } from 'react-native-toast-notifications'

export default function Register({ navigation }) {

    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const [data, setData] = useState({
        api_token: api_token,
        nama_lengkap: '',
        email: '',
        telepon: '',
        alamat: '',
        password: '',


    });

    const handleRegister = () => {
        if (data.nama_lengkap.length == '' || data.email.length == '' || data.telepon.length == '' || data.alamat.length == '' || data.password.length == '') {
            showMessage({
                type: 'danger',
                backgroundColor: colors.danger,
                color: colors.white,
                message: 'Semua Field Harus Diisi!',
                position: 'top',
                style: { borderBottomRightRadius: 10, borderBottomLeftRadius: 10, },
                textStyle: { fontFamily: fonts.primary[600] }
            })
        } else if (data.nama_lengkap.length === '') {
            showMessage({
                type: 'danger',
                backgroundColor: colors.danger,
                color: colors.white,
                message: 'nama_lengkap Harus Diisi!',
                position: 'top',
                style: { borderBottomRightRadius: 10, borderBottomLeftRadius: 10, },
                textStyle: { fontFamily: fonts.primary[600] }
            });
        } else if (data.email.length === '') {
            showMessage({
                type: 'danger',
                backgroundColor: colors.danger,
                color: colors.white,
                message: 'Email Harus Diisi!',
                position: 'top',
                style: { borderBottomRightRadius: 10, borderBottomLeftRadius: 10, },
                textStyle: { fontFamily: fonts.primary[600] }
            });
        } else if (data.telepon.length === '') {
            showMessage({
                type: 'danger',
                backgroundColor: colors.danger,
                color: colors.white,
                message: 'Telepon Harus Diisi!',
                position: 'top',
                style: { borderBottomRightRadius: 10, borderBottomLeftRadius: 10, },
                textStyle: { fontFamily: fonts.primary[600] }
            });
        } else if (data.alamat.length === '') {
            showMessage({
                type: 'danger',
                backgroundColor: colors.danger,
                color: colors.white,
                message: 'Alamat Harus Diisi!',
                position: 'top',
                style: { borderBottomRightRadius: 10, borderBottomLeftRadius: 10, },
                textStyle: { fontFamily: fonts.primary[600] }
            });
        } else if (data.password.length === '') {
            showMessage({
                type: 'danger',
                backgroundColor: colors.danger,
                color: colors.white,
                message: 'Password Harus Diisi!',
                position: 'top',
                style: { borderBottomRightRadius: 10, borderBottomLeftRadius: 10, },
                textStyle: { fontFamily: fonts.primary[600] }
            });
        } else {
            console.log('Data yang dikirim: ', data);
            setLoading(true);
            axios
                .post(apiURL + 'register', data)
                .then((res) => {
                    console.log(res.data)
                    setTimeout(() => {
                        setLoading(false);
                        if (res.data.status == 200) {
                            toast.show(res.data.message, {
                                type: 'success'
                            })
                            navigation.navigate('Login');
                        } else {
                            toast.show(res.data.message, {
                                type: 'error'
                            })
                        }
                    }, 1000)
                })
                .catch((err) => {
                    console.error('Error: ', err.message);
                    toast.show(err.message, {
                        type: 'error'
                    })
                });
        }
    };


    return (
        <ImageBackground source={require('../../assets/bgregister.png')} style={{
            flex: 1,
            width: "100%",
            height: "100%",
        }}>
            <ScrollView>
                <Image style={{
                    width: windowWidth,
                    height: 200,
                    resizeMode: 'cover'
                }} source={require('../../assets/regtop.png')} />

                <View style={{
                    padding: 10
                }}>


                    <View style={{
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: 25,
                            textAlign: 'center',
                            color: 'white',
                        }}>Daftar</Text>

                        <View style={{
                            padding: 10,
                        }}>

                            <MyInput value={data.nama_lengkap}
                                label="Nama Lengkap"
                                colorlabel='white'
                                placeholder="Isi Nama Lengkap"
                                onChangeText={(x) => setData({ ...data, 'nama_lengkap': x })}
                            />

                            <MyInput
                                value={data.email}
                                label="Email"
                                colorlabel='white'
                                placeholder="Isi Email"
                                onChangeText={(x) => setData({ ...data, 'email': x })}
                            />

                            <MyInput
                                value={data.telepon}
                                label="Telepon"
                                keyboardType="phone-pad"
                                colorlabel='white'
                                placeholder="Isi Telepon"
                                onChangeText={(x) => setData({ ...data, 'telepon': x })}
                            />

                            <MyInput
                                value={data.alamat}
                                label="Alamat Lengkap"
                                colorlabel='white'
                                placeholder="Isi Alamat Lengkap"
                                onChangeText={(x) => setData({ ...data, 'alamat': x })}
                            />

                            <MyInput
                                value={data.password}
                                label="Kata Sandi"
                                colorlabel='white'
                                placeholder="Isi Kata Sandi"
                                secureTextEntry={true}
                                onChangeText={(x) => setData({ ...data, 'password': x })}
                            />


                            <View>

                                {loading && <MyLoading />}

                                {!loading && <TouchableNativeFeedback onPress={handleRegister}>
                                    <View style={{
                                        padding: 10,
                                        backgroundColor: colors.secondary,
                                        borderRadius: 30,
                                        marginTop: 20,

                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.primary[600],
                                            color: colors.white,
                                            textAlign: 'center',

                                        }}>Daftar</Text>
                                    </View>
                                </TouchableNativeFeedback>
                                }

                                {!loading && <TouchableNativeFeedback onPress={() => navigation.navigate('Login')}>
                                    <Text style={{
                                        fontFamily: fonts.primary[500],
                                        color: 'white',
                                        textAlign: 'center',
                                        marginTop: 10,
                                        fontSize: 12,
                                    }}>Sudah memiliki akun? Silakan <Text style={{
                                        fontFamily: fonts.primary[600],
                                    }}>Masuk</Text></Text>
                                </TouchableNativeFeedback>}
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </ImageBackground>
    )
}