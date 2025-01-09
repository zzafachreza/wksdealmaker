import { View, Text, ScrollView, TouchableOpacity, PermissionsAndroid, Alert, Share, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { MyHeader, MyLoading } from '../../components'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage';
import { FlatList } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import moment from 'moment';

export default function DonwnloadBrosur({ navigation }) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const izinDownload = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Izinkan simpan data',
          message: 'Izinkan simpan data',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  useEffect(() => {
    izinDownload();
    if (isFocused) {
      __getTransaction();
    }
  }, [isFocused]);


  const __getTransaction = () => {
    axios.post(apiURL + 'slider').then(res => {
      console.log(res.data);
      setData(res.data);
    })
  }

  const downloadPDF = async (urlfile, path) => {

    const url = urlfile;
    const filePath = path;
    console.log(path)

    RNFS.downloadFile({
      fromUrl: url,
      toFile: filePath,
      background: true, // Enable downloading in the background (iOS only)
      discretionary: true, // Allow the OS to control the timing and speed (iOS only)
      progress: (res) => {
        setLoading(true);
        // Handle download progress updates if needed
        const progress = (res.bytesWritten / res.contentLength) * 100;
        console.log(`Progress: ${progress.toFixed(2)}%`);
        setPersen(`Progress: ${progress.toFixed(2)}%`)
      },
    })
      .promise.then((response) => {
        console.log('File downloaded!', response);
        setPersen(``);
        setLoading(false);
        Alert.alert('File berhasil disimpan !', path)
      })
      .catch((err) => {
        setLoading(false);
        setPersen(``);
        console.log('Download error:', err);
      });

  }


  const [persen, setPersen] = useState('');
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white,

    }}>
      <View>
        <MyHeader title="Download Brosur" />
      </View>

      <View style={{
        flex: 1,
        padding: 10,
      }}>

        <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={({ item, index }) => {
          return (
            <View style={{
              backgroundColor: Color.blueGray[100],
              padding: 10,
              marginVertical: 4,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={{
                flex: 1,
                // justifyContent: 'flex-start',
                alignItems: 'flex-start'
              }}>
                <Text style={{
                  ...fonts.caption,
                }}>{item.keterangan1}</Text>
                <Text style={{
                  width: 50,
                  height: 15,
                  fontSize: 10,
                  textAlign: 'center',
                  marginTop: 5,
                  borderRadius: 10,
                  backgroundColor: colors.danger,
                  color: colors.white,
                  fontFamily: fonts.secondary[600],
                }}>PDF</Text>
              </View>

              <TouchableOpacity onPress={() => {
                let urlfile = webURL + item.foto;
                let path = RNFS.ExternalStorageDirectoryPath + `/Download/${item.keterangan1}.pdf`;
                downloadPDF(urlfile, path)

              }} style={{
                paddingHorizontal: 10,
              }}>
                <Icon type='ionicon' name='download-outline' color={colors.primary} />
              </TouchableOpacity>

            </View>
          )
        }} />

        {loading &&
          <View style={{
            position: 'absolute',
            width: windowWidth,
            height: windowHeight,
            backgroundColor: colors.primary + '80',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {/* <MyLoading /> */}
            <ActivityIndicator color={colors.white} size="large" />
            <Text style={{ color: colors.white, fontFamily: fonts.secondary[600] }}>{persen}</Text>
          </View>
        }
      </View>
    </View>
  )
}