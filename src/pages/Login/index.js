import { View, Text, ImageBackground, ScrollView, Image, TouchableNativeFeedback, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyInput, MyLoading } from '../../components'
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { api_token, apiURL, storeData } from '../../utils/localStorage';
import { useToast } from 'react-native-toast-notifications';

export default function Login({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [comp, setComp] = useState({});

    const [data, setData] = useState({
        api_token: api_token,
        email: '',
        password: '',
    });
    const toast = useToast();

    useEffect(() => {
        axios.post(apiURL + 'company').then(res => {
            console.log(res.data.data);
            setComp(res.data.data)
        })
    }, [])

    const handleLogin = () => {
        if (data.email.length == 0 && data.password.length == 0) {

            toast.show('Email dan Kata Sandi Harus Diisi !', {
                type: 'error'
            })
        } else if (data.email.length == 0) {
            toast.show('Email Harus Diisi !', {
                type: 'error'
            })
        } else if (data.password.length == 0) {
            toast.show('Kata Sandi Harus Diisi !', {
                type: 'error'
            })
        } else {
            console.log('Data yang dikirim: ', data);
            setLoading(true);
            axios
                .post(apiURL + 'login', data)
                .then((res) => {
                    console.log(res.data)
                    setTimeout(() => {
                        setLoading(false);
                        if (res.data.status == 200) {
                            toast.show(res.data.message, {
                                type: 'success'
                            });
                            storeData('user', res.data.data);
                            navigation.navigate('MainApp');
                        } else {
                            toast.show(res.data.message, {
                                type: 'error'
                            })
                        }
                    }, 1000)

                })
                .catch((err) => {
                    console.error('Error: ', err);
                    toast.show(err.message, {
                        type: 'error'
                    })
                })
        }
    };


    return (
        <ImageBackground style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: 'white'
        }} source={require('../../assets/bglogin.png')}>
            <ScrollView>
                <View style={{
                    padding: 10,
                }}>



                    <View style={{
                        marginTop: '80%',
                        padding: 10
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            color: 'white',
                            fontSize: 25,
                            textAlign: 'center'

                        }}>Masuk</Text>

                        <View style={{
                            padding: 10
                        }}>
                            <MyInput value={data.email}
                                label="Email"
                                placeholder="Isi Email"
                                colorlabel='white'
                                onChangeText={(x) => setData({ ...data, 'email': x })}
                            />

                            <MyInput
                                label="Kata Sandi"
                                placeholder="Isi Kata Sandi"
                                colorlabel='white'
                                secureTextEntry={true}
                                value={data.password}
                                onChangeText={(x) => setData({ ...data, 'password': x })}
                            />

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: "flex-end"
                            }}>
                                <TouchableNativeFeedback onPress={() => {
                                    Linking.openURL('https://wa.me/' + comp.tlp + '?text=Hallo admin saya lupa kata sandi . . .')
                                }}>
                                    <View style={{
                                        marginTop: 10,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.primary[600],
                                            color: 'white',
                                            fontSize: 12
                                        }}>Lupa Kata Sandi</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>


                            <View>

                                {!loading && <>
                                    <TouchableNativeFeedback onPress={handleLogin}>
                                        <View style={{
                                            padding: 10,
                                            backgroundColor: colors.secondary,
                                            borderRadius: 30,
                                            marginTop: 10

                                        }}>
                                            <Text style={{
                                                fontFamily: fonts.primary[600],
                                                color: colors.white,
                                                textAlign: "center"
                                            }}>Masuk</Text>

                                        </View>
                                    </TouchableNativeFeedback>

                                    <TouchableNativeFeedback onPress={() => navigation.navigate('Register')}>
                                        <Text style={{
                                            fontFamily: fonts.primary[500],
                                            color: 'white',
                                            textAlign: 'center',
                                            marginTop: 10,
                                            fontSize: 12,
                                        }}>Belum memiliki akun? Silakan <Text style={{
                                            fontFamily: fonts.primary[600],
                                        }}>Daftar</Text></Text>
                                    </TouchableNativeFeedback>
                                </>}

                                {loading && <MyLoading />}
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </ImageBackground>
    )
}