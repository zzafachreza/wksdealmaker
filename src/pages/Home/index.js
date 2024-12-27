import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import { getData } from '../../utils/localStorage';
import { colors, fonts, windowWidth } from '../../utils';

const images = [
  { id: 1, src: require('../../assets/korosel-1.png'), label: 'Gambar 1' },
  { id: 2, src: require('../../assets/koresel-2.png'), label: 'Gambar 2' },
  { id: 3, src: require('../../assets/koresel-3.png'), label: 'Gambar 3' },
];

const windowHeight = Dimensions.get('window').height;

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});
  const scrollX = useRef(new Animated.Value(0)).current; // Untuk animasi scroll
  const scrollViewRef = useRef(null); // Untuk mengontrol scroll view
  const [currentIndex, setCurrentIndex] = useState(0);

  const __getUser = () => {
    getData('user').then((u) => {
      setUser(u);
    });
  };

  useEffect(() => {
    __getUser();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      scrollViewRef.current.scrollTo({
        x: nextIndex * windowWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000); // Ganti slide setiap 3 detik

    return () => clearInterval(interval); // Hentikan interval saat komponen di-unmount
  }, [currentIndex]);

  return (
    <ImageBackground
      source={require('../../assets/bghome.png')}
      style={{
        flex: 1,
        backgroundColor: colors.white,
        width: '100%',
        height: '100%',
      }}
    >
      <ScrollView>
        <View style={{ padding: 10 }}>
          {/* Sambutan & nama */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
              marginTop: 20,
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: fonts.primary[400],
                  fontSize: 12,
                  color: colors.white,
                }}
              >
                Selamat datang!
              </Text>
              <Text
                style={{
                  fontFamily: fonts.primary[600],
                  fontSize: 20,
                  color: colors.white,
                }}
              >
                Fadhlan Himawan
              </Text>
            </View>

            <View>
              <Image
                source={require('../../assets/logohome.png')}
                style={{
                  width: 69,
                  height: 47,
                }}
              />
            </View>
          </View>

          {/* COROSEL */}
          <View style={{ marginTop: 20 }}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              ref={scrollViewRef}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={16}
            >
              {images.map((item) => (
                <View
                  key={item.id}
                  style={{
                    width: windowWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={item.src}
                    style={{
                      width:348,
                      height: 211,
                      borderRadius: 10,
                    }}
                  />
                  
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={{
            padding:10
          }}>

          <Image style={{
            width:281,
            height:38,
            alignSelf:"center",
            marginTop:0
          }} source={require('../../assets/logoteks.png')}/>

          <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            flexWrap:'wrap',
            marginTop:20,
            
          }}>

          <TouchableNativeFeedback onPress={() => navigation.navigate('CheckHargaStock')}>
            <View>
              <View style={{
                padding:10,
                backgroundColor:colors.primary,
                borderRadius:100,
                alignItems:"center",
                width:80,
                height:80,
                flexDirection:'row',
                justifyContent:'center'
              

              }}>
                <Image style={{
                    width:50,
                    height:50,
                    alignSelf:'center'
                }} source={require('../../assets/menu_cekharga.png')}/>
              </View>
              <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:12,
                textAlign:"center",
                marginTop:5

              }}>Cek Harga{'\n'}&Stok</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback>
            <View>
              <View style={{
                padding:10,
                backgroundColor:colors.primary,
                borderRadius:100,
                alignItems:"center",
                width:80,
                height:80,
                flexDirection:'row',
                justifyContent:'center'
              

              }}>
                <Image style={{
                    width:50,
                    height:50,
                    alignSelf:'center'
                }} source={require('../../assets/menu_reportvisit.png')}/>
              </View>
              <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:12,
                textAlign:"center",
                marginTop:5

              }}>Report Visit</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback>
            <View>
              <View style={{
                padding:10,
                backgroundColor:colors.primary,
                borderRadius:100,
                alignItems:"center",
                width:80,
                height:80,
                flexDirection:'row',
                justifyContent:'center'
              

              }}>
                <Image style={{
                    width:50,
                    height:50,
                    alignSelf:'center'
                }} source={require('../../assets/menu_reportservice.png')}/>
              </View>
              <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:12,
                textAlign:"center",
                marginTop:5

              }}>Report Service</Text>
            </View>
          </TouchableNativeFeedback>


          <TouchableNativeFeedback onPress={() => navigation.navigate('BuatPenawaran')}>
            <View style={{
              marginTop:10
            }}>
              <View style={{
                padding:10,
                backgroundColor:colors.primary,
                borderRadius:100,
                alignItems:"center",
                width:80,
                height:80,
                flexDirection:'row',
                justifyContent:'center'
              

              }}>
                <Image style={{
                    width:50,
                    height:50,
                    alignSelf:'center'
                }} source={require('../../assets/menu_buatpenawaran.png')}/>
              </View>
              <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:12,
                textAlign:"center",
                marginTop:5

              }}>Buat{'\n'}Penawaran</Text>
            </View>
          </TouchableNativeFeedback>


          <TouchableNativeFeedback onPress={() => navigation.navigate('DownloadBrosur')}>
            <View style={{
              marginTop:10
            }}>
              <View style={{
                padding:10,
                backgroundColor:colors.primary,
                borderRadius:100,
                alignItems:"center",
                width:80,
                height:80,
                flexDirection:'row',
                justifyContent:'center'
              

              }}>
                <Image style={{
                    width:50,
                    height:50,
                    alignSelf:'center'
                }} source={require('../../assets/menu_downloadbrosur.png')}/>
              </View>
              <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:12,
                textAlign:"center",
                marginTop:5

              }}>Download{'\n'}Brosur</Text>
            </View>
          </TouchableNativeFeedback>


          <TouchableNativeFeedback onPress={() => navigation.navigate('BuktiPengeluaran')}>
            <View style={{
              marginTop:10
            }}>
              <View style={{
                padding:10,
                backgroundColor:colors.primary,
                borderRadius:100,
                alignItems:"center",
                width:80,
                height:80,
                flexDirection:'row',
                justifyContent:'center'
              

              }}>
                <Image style={{
                    width:50,
                    height:50,
                    alignSelf:'center'
                }} source={require('../../assets/menu_buktipengeluaran.png')}/>
              </View>
              <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:12,
                textAlign:"center",
                marginTop:5

              }}>Bukti{'\n'}Pengeluaran{'\n'}Kegiatan</Text>
            </View>
          </TouchableNativeFeedback>

          </View>


          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
