import { View, Text, ScrollView, TouchableNativeFeedback, Alert, Linking } from 'react-native'
import React from 'react'

import { MyButton, MyHeader } from '../../components'
import { Image } from 'react-native'
import { Color, colors, fonts } from '../../utils'
import { useToast } from 'react-native-toast-notifications'
import { apiURL, MYAPP } from '../../utils/localStorage'
import axios from 'axios'
import { WebView } from 'react-native-webview';

export default function HasilBuatPenawaran({ navigation, route }) {
    const item = route.params;
    const toast = useToast();
    const hapusData = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
            { text: "tidak" },
            {
                text: 'HAPUS',
                onPress: () => {
                    axios.post(apiURL + 'delete_data', {
                        table: 'penawaran',
                        id: item.id_penawaran
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
                <MyHeader title='Buat Penawaran' />
            </View>
            <View style={{
                flex: 1,
            }}>
                <WebView source={{ uri: 'https://infowks.zavalabs.com/home/penawaran/' + item.id_penawaran }} style={{ flex: 1 }} />
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
                    <MyButton title="Edit" onPress={() => navigation.navigate('EditPenawaran', item)} />
                </View>
                <View style={{
                    flex: 1,
                    marginHorizontal: 2,
                }}>
                    <MyButton title="Print" onPress={() => Linking.openURL('https://infowks.zavalabs.com/home/penawaran/' + item.id_penawaran)} warna={colors.secondary} />
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