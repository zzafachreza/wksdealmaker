import { View, ScrollView, TextInput, Text, TouchableNativeFeedback, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color, colors, fonts } from '../../utils';
import { MyCalendar, MyHeader, MyImageUpload, MyInput, MyLoading, MyPicker } from '../../components';
import moment from 'moment';
import { apiURL, getData, MYAPP } from '../../utils/localStorage';
import axios from 'axios';
import { Col } from 'react-native-table-component';

export default function TambahPenawaran({ navigation, route }) {

    const [filteredPartNo, setFilteredPartNo] = useState([]);
    const [loading, setLoading] = useState(false); // Tambahkan state loading
    const [partDetails, setPartDetails] = useState({});
    const [usdToIdr, setUsdToIdr] = useState(0); // state untuk kurs USD ke IDR
    const allPartNos = ["PN12345", "PN54321", "PN67890"];
    const getPartNumber = (x) => {
        axios.post(apiURL + 'get_part_details', {
            key: x
        }).then(res => {
            console.log(res.data); // Pastikan response mencakup harga
            setFilteredPartNo(res.data)
        })
    }

    // Ambil nilai tukar USD ke IDR dari API
    useEffect(() => {
        axios.get('https://api.exchangerate-api.com/v4/latest/USD')
            .then(response => {
                setUsdToIdr(response.data.rates.IDR); // Menyimpan kurs USD ke IDR
            })
            .catch(error => console.error("Error fetching exchange rate:", error));
    }, []);


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
    
        // Cari data detail part berdasarkan partNo yang dipilih
        const selectedPart = filteredPartNo.find(item => item.part_number === partNo);
    
        if (selectedPart) {
            const priceInRupiah = selectedPart.price * usdToIdr; // Menghitung harga dalam rupiah
    
            // Simpan harga asli dalam angka untuk dikirim ke server
            setData((prevState) => ({
                ...prevState,
                deskripsi: selectedPart.part_description, // Update deskripsi
                harga: priceInRupiah // Simpan harga dalam IDR
            }));
        }
    };
    
    

    const [user, setUser] = useState({});

    useEffect(() => {
        getData('user').then(res => {
            setData({
                ...data,
                fid_user: res.id
            })
        });
    }, [])

    const [data, setData] = useState({
        kepada: '',
        cc: '',
        tanggal: moment().format('YYYY-MM-DD'),
        email_telepon: '',
        partno: '',
        deskripsi: '',
        harga: '',
        catatan: '',
        payment: 'Cash Before Delivery',
        stock: 'Ready Stock, Sebelum Terjual',

    });

    const handleDateChange = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD'); // Format sesuai ekspektasi database
        console.log("Tanggal yang dipilih:", formattedDate);
        setData((prevState) => ({ ...prevState, tanggal: formattedDate }));
    };

    const sendServer = () => {
        const formattedDate = moment(data.tanggal).format('DD MMMM YYYY');
        const dataToSend = { 
            ...data, 
            tanggal: moment(data.tanggal).format('YYYY-MM-DD'),
            part_no: data.partno,  // Ubah partno menjadi part_no sesuai dengan yang ada di database
        };
        setLoading(true); // Tampilkan loading
        axios.post(apiURL + 'penawaran_add', dataToSend)
            .then(res => {
                console.log(res.data);
                // Tunggu beberapa saat sebelum menghentikan loading dan menampilkan alert
                setTimeout(() => {
                    setLoading(false); // Matikan loading
                    Alert.alert(MYAPP, 'Buat Penawaran Berhasil!');
                    navigation.replace("BuatPenawaran");
                }, 1500); // Jeda 500ms untuk memastikan loading terlihat
            })
            .catch(err => {
                console.error(err);
                setLoading(false); // Matikan loading jika ada error
                Alert.alert(MYAPP, 'Terjadi kesalahan, silakan coba lagi.');
            });
    };
    


    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}
        >
            {loading && (
                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor:'rgba(0,0,0,0.8)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10,
                }}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={{
                         marginTop: 10,
                 color: colors.white,
        fontSize: 16,
        fontFamily: fonts.primary[600],
                    }}>Loading...</Text>
                </View>
            )}
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
                        value={data.partno}
                        onEndEditing={x => getPartNumber(x.nativeEvent.text)}
                        onChangeText={(x) => {
        setData((prevState) => ({ ...prevState, partno: x }));
    }}
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
                            
                                        selectPartNo(i.part_number); // Menggunakan selectPartNo
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
                        value={data.harga ? new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(data.harga) : ''} // Tampilkan harga dalam format rupiah

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
                            { label: '7 Hari Kerja', value: 'Indent, 7 Hari Kerja' },
                            { label: '14 Hari Kerja', value: 'Indent, 14 Hari Kerja' },
                            { label: '30 Hari Kerja', value: 'Indent, 30 Hari Kerja' },
                            { label: '60 Hari Kerja', value: 'Indent, 60 Hari Kerja' },
                            { label: '90 Hari Kerja', value: 'Indent, 90 Hari Kerja' }
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
