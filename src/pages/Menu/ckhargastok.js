import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { Color, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyLoading } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useToast } from 'react-native-toast-notifications';

export default function CheckHargaStock({ navigation }) {

    const [user, setUser] = useState({});
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            __getTransaction();
        }

    }, [isFocused]);

    const __getTransaction = () => {
        getData('user').then(res => {
            setUser(res);
        })
    }

    const MyListData = ({ lab, val }) => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                // borderBottomWidth: 1,
                paddingVertical: 6,
                borderBottomColor: colors.zavalabs,
            }}>
                <View style={{ flex: 0.6, }}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12,
                        color: colors.black
                    }}>{lab}</Text>
                </View>
                <View style={{ flex: 0.1, }}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12,
                        color: colors.black
                    }}>:</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.primary
                    }}>{val}</Text>
                </View>
            </View>
        )
    }

    const [key, setKey] = useState('');
    const [qty, setQty] = useState(1);
    const toast = useToast();

    const [formula, setFormula] = useState({
        a8: 0,
        a9: 0,
        a10: 0,
        a11: 0,
        a12: 0,
        a13: 0,
        a14: 0,
        a15: 0,
        a16: 0
    })

    const filterData = () => {
        setLoading(true);
        axios.post(apiURL + 'part', {
            part_number: key,
            qty: qty
        }).then(res => {

            console.log(res.data);
            setTimeout(() => {
                setLoading(false);
                if (res.data.kode == 404) {
                    setOpen(false);
                    toast.show('Part Number tidak ditemukan !', {
                        type: 'error'
                    })

                } else {
                    setOpen(true);
                    console.log(res.data);
                    setData(res.data);



                }
            }, 1000)
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>

            {/* body */}
            <View style={{

            }}>
                <View style={{
                    // padding: 10,
                    flexDirection: 'row',
                    marginBottom: 10,
                }}>

                    <View style={{
                        flex: 1,
                        paddingRight: 5,
                    }}>
                        <MyInput value={key} onChangeText={x => setKey(x)} autoFocus label="Enter Part Number" placeholder="enter part number" iconname="file-tray-stacked-outline" />
                    </View>
                    <View style={{
                        flex: 0.5,
                        paddingLeft: 5
                    }}>
                        <MyInput keyboardType="number-pad" value={qty.toString()} onChangeText={x => setQty(x)} label="Qty" placeholder="please enter qty" iconname="cube-outline" />
                    </View>

                </View>
                <MyGap jarak={0} />
                <MyButton onPress={filterData} title="Search" iconColor={colors.white} Icons="search-outline" />

            </View>
            {loading && <MyLoading color={colors.primary} />}

            {open && !loading &&
                <View style={{
                    marginTop: 20,
                    borderRadius: 10,
                    padding: 10,
                    backgroundColor: Color.blueGray[50]
                }}>
                    <MyListData lab="Part No" val={data.part_number} />
                    <MyListData lab="Description" val={data.part_description} />
                    <MyListData lab="Division" val={data.division} />
                    {/*  <MyListData lab="Aplication" val={data.application} />
                    <MyListData lab="List Price" val={`${data.price}`} />
                    <MyListData lab="Qty" val={`${data.qty}`} />
                    <MyListData lab="Price x Qty" val={`$${data.priceqty}`} />
                    <MyListData lab="Discount" val={`${data.discount}%`} />
                    <MyListData lab="Price After Discount" val={`$${data.a8}`} />
                    <MyListData lab="Harga" val={`Rp${new Intl.NumberFormat().format(data.a9)}`} />
                    <MyListData lab="Harga + BM 10%" val={`Rp${new Intl.NumberFormat().format(data.a10)}`} />
                    <MyListData lab="Pph 2,5%" val={`Rp${new Intl.NumberFormat().format(data.a11)}`} />
                    <MyListData lab="Ppn 11%" val={`Rp${new Intl.NumberFormat().format(data.a12)}`} />

                    <MyListData lab="Ongkir 15%" val={`Rp${new Intl.NumberFormat().format(data.a13)}`} />

                    <MyListData lab="Harga Modal" val={`Rp${new Intl.NumberFormat().format(data.a14)}`} /> */}
                    <MyListData lab="Harga Jual" val={`Rp${new Intl.NumberFormat().format(data.a15)}`} />

                    <MyListData lab="Harga Nett" val={`Rp${new Intl.NumberFormat().format(data.a16)}`} />
                    <MyListData lab="Harga Supplier" val={`Rp${new Intl.NumberFormat().format(data.a17)}`} />

                    <MyListData lab="Stock" val={`${new Intl.NumberFormat().format(data.stock)}`} />
                </View>}


        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    judul: {
        fontFamily: fonts.secondary[600],
        fontSize: windowWidth / 35
    },
    item: {
        fontFamily: fonts.secondary[400],
        fontSize: windowWidth / 35
    }
})