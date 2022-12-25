import React, { useEffect, useState, useContext } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';
import AlQuran from '../Quran Notes/AlQuran.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../Config/ThemeContext';

export default function HomePage({ navigation }) {
  const [Hide, setHide] = useState(false);
  const [NightMod, setNightMod] = useState(true);
  // const [Mod, setMod] = useState(true);
  const [NightColor, setNightColor] = useState('');
  const [LightColor, setLightColor] = useState('');


  const theme = useContext(themeContext)

  const Surah = item => {
    navigation.navigate('Surah', { Quran: item, });
    setHide(false)
  };


  const BookmarkNav = () => {
    navigation.navigate("Bookmark")
    setHide(false)
  }


  useEffect(() => {
    let Bool = async () => {
      let boolean = await AsyncStorage.getItem( "Boolean");
      if (boolean) {
        boolean = JSON.parse(boolean);
        setNightMod(boolean == true ? false : true);
        console.log(boolean);
      }
    }
    Bool()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'green'} />

      <View style={styles.SurahTxtView}>
        <Text style={styles.SurahTxt}>{`القرآن الكريم`}</Text>
        <TouchableOpacity
          style={{ position: 'absolute', left: '90%' }}
          onPress={() => setHide(!Hide)}>
          <Icon name="dots-vertical" size={28} color={'#fff'} style={{}} />
        </TouchableOpacity>
      </View>


      {/* Drawer Box */}
      {
        Hide == true
          ?
          (
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'lightgrey',
                zIndex: 2,
                alignItems: 'center',
                top: 50,
                right: 16
              }}>


              <TouchableOpacity
                style={[styles.DrawerBox]}
                onPress={() => {
                  setNightMod((value) => !value)
                  EventRegister.emit("changeColor", NightMod)
                }
                }>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={[styles.DrawerTxt, {}]}>{NightMod ? "Dark" : "Light"} Mod</Text>
                  {NightMod == true
                    ?
                    (
                      <Icon
                        name="moon-waxing-crescent"
                        size={20}
                        color={'darkgrey'}
                        style={{
                          top: -1,
                        }}
                      />
                    )
                    :
                    (
                      <Icon
                        name="white-balance-sunny"
                        size={20}
                        color={'orange'}
                        style={{ top: -1 }}
                      />
                    )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.DrawerBox} onPress={() => BookmarkNav()}>
                <Text style={styles.DrawerTxt}>Bookmark</Text>
              </TouchableOpacity>
            </View>
          )
          :
          null
      }


      <FlatList
        data={AlQuran}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {

          return (
            <View style={{backgroundColor: theme.BGColor}}>
              <TouchableOpacity
                style={[styles.surahBtn, { backgroundColor: theme.AyatViewColor }]}
                onPress={() => Surah(item)}>
                <Text
                  style={[styles.surahBtnTxt, { color: theme.TranslateColor }]}
                >
                  {`سورة ${item.name} `}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  surahBtn: {
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.2,
    borderTopWidth: 0.3,
    borderColor: 'grey',
  },
  surahBtnTxt: {
    fontSize: 22,
    color: '#000',
  },
  SurahTxtView: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    zIndex: 2,
    flexDirection: 'row',
    // paddingLeft: 30
  },
  SurahTxt: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Ubuntu-Medium',
    textAlign: 'center',
  },
  DrawerBox: {
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
    height: 36,
    width: 130,
    paddingRight: 10,
    borderColor: 'grey',
    borderBottomWidth: 0.3,
    borderTopWidth: 0.3,
    // elevation: 5
  },
  DrawerTxt: {
    color: 'green',
    textAlign: 'left',
    fontSize: 14,
    left: 10,
    fontFamily: 'Ubuntu-Medium',
  },
});
