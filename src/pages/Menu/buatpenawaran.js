import { View, Text, ScrollView, TouchableOpacity, PermissionsAndroid, Alert, Share, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { MyHeader, MyLoading } from '../../components'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL, getData, webURL } from '../../utils/localStorage';
import { FlatList } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import moment from 'moment';

export default function BuatPenawaran({ navigation }) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();


  useEffect(() => {

    if (isFocused) {
      __getTransaction();
    }
  }, [isFocused]);


  const __getTransaction = () => {
    getData('user').then(u => {
      axios.post(apiURL + 'penawaran', {
        fid_user: u.id
      }).then(res => {
        console.log(res.data);
        setData(res.data);
      })
    })
  }




  const [persen, setPersen] = useState('');
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white,

    }}>
      <View>
        <MyHeader title="Buat Penawaran" />
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

            }}>

              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Text style={{
                  flex: 0.3,
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                }}>Kepada</Text>
                <Text style={{
                  flex: 0.1,
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                }}>:</Text>
                <Text style={{
                  flex: 1,
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                }}>{item.kepada}</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Text style={{
                  flex: 0.3,
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                }}>Up/Cc</Text>
                <Text style={{
                  flex: 0.1,
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                }}>:</Text>
                <Text style={{
                  flex: 1,
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                }}>{item.cc}</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Text style={{
                  flex: 0.3,
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                }}>Part No</Text>
                <Text style={{
                  flex: 0.1,
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                }}>:</Text>
                <Text style={{
                  flex: 1,
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                }}>{item.part_no}</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Text style={{
                  flex: 0.3,
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                }}>Price</Text>
                <Text style={{
                  flex: 0.1,
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                }}>:</Text>
                <Text style={{
                  flex: 1,
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                }}>Rp {new Intl.NumberFormat().format(item.harga)}</Text>
              </View>
              <View style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Text style={{
                  flex: 1,
                  fontFamily: fonts.secondary[600],
                  color: Color.blueGray[400],
                  fontSize: 12,
                }}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>

                <TouchableOpacity onPress={() => navigation.navigate('HasilBuatPenawaran', item)} style={{
                  backgroundColor: colors.primary,
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Icon type='ionicon' size={14} name='search-outline' color={Color.blueGray[50]} />
                  <Text style={{
                    // left: 5,
                    marginLeft: 5,
                    fontFamily: fonts.secondary[600],
                    color: Color.blueGray[50],
                    fontSize: 12,
                  }}>Detail</Text>
                </TouchableOpacity>
              </View>



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

        <TouchableOpacity onPress={() => navigation.navigate('TambahPenawaran')} style={{
          alignSelf: 'flex-end',
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Icon type='ionicon' name='add' size={30} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View >
  )
}