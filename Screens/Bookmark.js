import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AlQuran from '../Quran Notes/AlQuran.json';
import Dialog from 'react-native-dialog';
import themeContext from '../Config/ThemeContext';



export default function Bookmark({ navigation }) {
    const theme = useContext(themeContext)

    const [bookmark, setBookmark] = useState();
    const [Popup, setPopup] = useState(false);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('bookmark')
            let value = JSON.parse(jsonValue)
            setBookmark(value)
        } catch (e) {
            console.log(e.message)
        }
    }

    const deleteBookmark = async (index) => {

        if (index > -1) {
            bookmark.splice(index, 1);
            console.log(bookmark)
            let data = setBookmark(bookmark)
            await AsyncStorage.setItem('bookmark', JSON.stringify(bookmark))
        }
        getData()
    }

    const allDataRemove = async () => {
        setPopup(true)
    }
    const EmptyBookmark = async () => {
        setPopup(false)
        await AsyncStorage.clear()
        getData()
    }

    const BookmarkData = async (item) => {
        navigation.navigate("BookmarkSurah",{item: item})
        // console.log(item)
    }

    useEffect(() => {
        // EmptyBookmark()
        getData();
    }, [])

    return (
        <View style={{ flex: 1, }}>

            <Dialog.Container contentStyle={{ backgroundColor: "#f3f3f3" }} visible={Popup}>
                <Dialog.Title style={{ color: '#000', fontSize: 16, fontFamily: "Overpass-Bold", top: -10, }}>Bookmark</Dialog.Title>
                <Dialog.Description style={{ color: '#000', fontSize: 16, fontFamily: "Overpass-Medium", top: -10, alignSelf: 'center', top: -6, }} >Do you want to clear all bookmarks.</Dialog.Description>
                <Dialog.Button style={{ color: '#000', fontSize: 12, fontFamily: "Ubuntu-Medium" }} label="No" onPress={() => setPopup(false)} />
                <Dialog.Button style={{ color: '#000', fontSize: 12, fontFamily: "Ubuntu-Medium" }} label="Yes" onPress={() => EmptyBookmark()} />
            </Dialog.Container>





            <View style={styles.SurahTxtView}>
                <Text style={styles.SurahTxt}>Bookmark</Text>
                <TouchableOpacity
                    style={{ position: 'absolute', left: '90%' }}
                    onPress={() => allDataRemove()}>
                    <Icon name="delete" size={22} color={'#fff'} style={{}} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ position: 'absolute', left: '2%' }}
                    onPress={() => navigation.goBack('Surah')}
                >
                    <Icon name="arrow-left" size={24} color={'#fff'} style={{ left: 6 }} />
                </TouchableOpacity>
            </View>


            <View style={{ flex: 1 }}>
                <FlatList
                    data={bookmark}
                    renderItem={({ item, index }) => {

                        return (
                            <View style={{ flex: 1, backgroundColor: theme.BGColor }} key={index}>
                                
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -4, backgroundColor: '#190', height: 40 }} >
                                    <Text
                                        style={[styles.translateTxt,{color: '#fff', top: 3, fontWeight: 'bold'}]}>
                                        {item.SurahName}
                                    </Text>
                                </View>

                                <TouchableOpacity style={[styles.AyatView, {backgroundColor: theme.AyatViewColor} ]} onPress={() => BookmarkData(item) }>
                                    <TouchableOpacity
                                        onPress={() => deleteBookmark(index)}
                                        style={{
                                            position: 'absolute',
                                            top: 6,
                                            left: 6,
                                        }}
                                    >
                                        <Icon
                                            name="star"
                                            size={24}
                                            color={'orange'}
                                            style={{}}
                                        />
                                    </TouchableOpacity>
                                    <Text style={[styles.AyatTxt, {color: theme.TextColor} ]}>
                                        {/* {`${item.text}[${item.id}] `} */}
                                        {`${AlQuran[item.SurahIndex].verses[item.AyatIndex].text}[${item.AyatIndex + 1}]`}
                                    </Text>
                                    <Text
                                        style={[styles.translateTxt,{color: theme.TranslateColor} ]}>
                                        {AlQuran[item.SurahIndex].verses[item.AyatIndex].translation}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    SurahTxtView: {
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        zIndex: 2,
        flexDirection: 'row',
    },
    SurahTxt: {
        fontSize: 24,
        color: '#fff',
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
    },
    AyatView: {
        backgroundColor: '#fff',
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
})




// let LightColors = {
//     BGColor: "lightgrey",
//     AyatViewColor: "#fff",
//     TextColor: "darkblue",
//     TranslateColor: "#000"
// } 
// let NightColors = {
//     BGColor: "#444",
//     AyatViewColor: "#000",
//     TextColor: "blue",
//     TranslateColor: "#fff"
// } 

// await AsyncStorage.setItem("Night", JSON.stringify(NightColors) )
// await AsyncStorage.setItem("Light", JSON.stringify(LightColors) )

// let Night = JSON.parse( await AsyncStorage.getItem('Night') ) 
// let Light = JSON.parse( await AsyncStorage.getItem('Light') ) 



{/* <Dialog.Container contentStyle={{ backgroundColor: "#f3f3f3" }} visible={Bookmark}>
<Dialog.Title style={{ color: '#000', fontSize: 16, fontFamily: "Overpass-Medium", top: -10, }}>Bookmark</Dialog.Title>
<Dialog.Description style={{ color: '#000', fontSize: 16, fontFamily: "Overpass-Medium", top: -10,alignSelf: 'center', top: -6,  }} >Do you want to Bookmark this Ayat.</Dialog.Description>
<Dialog.Button style={{ color: '#000', fontSize: 12, fontFamily: "Ubuntu-Medium" }} label="No" onPress={() => setBookmark(false)} />
<Dialog.Button style={{ color: '#000', fontSize: 12, fontFamily: "Ubuntu-Medium" }} label="Yes" onPress={() => bookmark() } />
</Dialog.Container> */}