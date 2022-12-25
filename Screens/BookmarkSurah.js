import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AlQuran from '../Quran Notes/AlQuran.json';
import Dialog from 'react-native-dialog';
import themeContext from '../Config/ThemeContext';

export default BookmarkSurah = ({navigation, route}) => {
    const theme = useContext(themeContext)

    const [Popup, setPopup] = useState(false)
    
    let Surah = route.params.item
    let data = AlQuran[Surah.SurahIndex].verses

    let ID = data.map( (item) => {return item.id - 1} )

    const SendAyat = () => {
        // console.log(Surah.AyatIndex)
        if (ID.includes( Surah.AyatIndex) == true) {
            this.flatListRef.scrollToIndex({animated: false,  index: Surah.AyatIndex})
        } else {
            null
        }
    }

    useEffect( () => {
        SendAyat()
    },[])


    return (

        <View style={{ flex: 1, }}>

            <Dialog.Container contentStyle={{ backgroundColor: "#f3f3f3" }} visible={Popup}>
                <Dialog.Title style={{ color: '#000', fontSize: 16, fontFamily: "Overpass-Bold", top: -10, }}>Bookmark</Dialog.Title>
                <Dialog.Description style={{ color: '#000', fontSize: 16, fontFamily: "Overpass-Medium", top: -10, alignSelf: 'center', top: -6, }} >Do you want to clear all bookmarks.</Dialog.Description>
                <Dialog.Button style={{ color: '#000', fontSize: 12, fontFamily: "Ubuntu-Medium" }} label="No" onPress={() => setPopup(false)} />
                <Dialog.Button style={{ color: '#000', fontSize: 12, fontFamily: "Ubuntu-Medium" }} label="Yes" onPress={() => EmptyBookmark()} />
            </Dialog.Container>





            <View style={styles.SurahTxtView}>
                <Text style={styles.SurahTxt}>{Surah.SurahName}</Text>
                
                <TouchableOpacity
                    style={{ position: 'absolute', left: '2%' }}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Icon name="arrow-left" size={24} color={'#fff'} style={{ left: 6 }} />
                </TouchableOpacity>

            </View>


            <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                ref={(ref) => {
                    this.flatListRef = ref;
                }}
                // initialScrollIndex={Surah.AyatIndex}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                onScrollToIndexFailed={(error) => {
                    this.flatListRef.scrollToOffset({ offset: error.averageItemLength * error.index, animated: true });
                    setTimeout(() => {
                      if (data.length !== 0 && this.flatListRef !== null) {
                        this.flatListRef.scrollToIndex({ index: error.index, animated: true });
                      }
                    }, 0)
                }}
                
                
                renderItem={({ item, index }) => {
                    // this.flatListRef.scrollToIndex({animated: false,  index: Surah.AyatIndex - 1 })
    
                    return (
                        <View style={{ flex: 1, zIndex: 1, backgroundColor: theme.BGColor }}>
                            <TouchableOpacity
                                style={[styles.AyatView, { backgroundColor: theme.AyatViewColor }]}
                                // onPress={() => setHide(false)}
                                // onLongPress={() => AddBookmark(item)}
                            >

                                <Text 
                                    style={[styles.AyatTxt, { color: theme.TextColor }]}
                                >
                                    {`${item.text}[${item.id}] `}
                                </Text>
                                <Text
                                    style={[
                                        styles.translateTxt,
                                        { color: theme.TranslateColor},
                                    ]}
                                >
                                    {item.translation}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: 26,
        color: '#fff',
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
        // right: 25
        // backgroundColor: 'pink'
    },
    AyatView: {
        padding: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.8,
    },
    AyatTxt: {
        fontSize: 22,
        color: 'blue',
        fontFamily: 'Sono_Monospace-Light',
    },
    translateTxt: {
        top: 10,
        fontSize: 24,
        color: '#000',
        fontFamily: 'Ubuntu-Light',
        marginBottom: 5,
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
        elevation: 5
    },
    DrawerTxt: {
        color: 'green',
        textAlign: 'left',
        fontSize: 14,
        left: 10,
        fontFamily: 'Ubuntu-Medium',
    },
});
