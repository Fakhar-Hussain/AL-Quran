import React, { useState, useEffect, useContext } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Alert,
    VirtualizedList,
    LogBox
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from 'react-native-dialog';
import themeContext from '../Config/ThemeContext';


export default Surah = ({ navigation, route }) => {

    const theme = useContext(themeContext)
    LogBox.ignoreAllLogs()

    // Colors States
    // const [NightModBGColor, setNightModBGColor] = useState('lightgrey');
    // const [NightModColor, setNightModColor] = useState('#fff');
    // const [NightModTxtColor, setNightModTxtColor] = useState('darkblue');
    // const [NightModTranslateTxtColor, setNightModTranslateTxtColor] = useState('#000');


    const [NightColor, setNightColor] = useState('');
    const [LightColor, setLightColor] = useState('');


    // Boolean States
    const [Hide, setHide] = useState(false);
    const [NightMod, setNightMod] = useState(true);
    const [visible, setVisible] = useState(false);
    const [Bookmark, setBookmark] = useState(false);

    const [addBookmark, setAddBookmark] = useState();
    const [Ayat, setAyat] = useState("");
    const [Search, setSearch] = useState(false);

    let Quran = route.params.Quran;
    let data = Quran.verses;


    const NightModOn = async () => {
        // let color = await AsyncStorage.setItem("OnColor", JSON.stringify(LightColors))
        let colorValue = await AsyncStorage.getItem("OnColor")
        let value = JSON.parse(colorValue)
        // console.log(value);
        setLightColor(value)
    }

    const NightModOff = async () => {
        // let color = await AsyncStorage.setItem("OffColor", JSON.stringify(NightColors))
        let colorValue = await AsyncStorage.getItem("OffColor")
        let value = JSON.parse(colorValue)
        // console.log(value);
        setNightColor(value)
    }

    const AddBookmark = async (item) => {
        let dataItem = {
            "SurahName": `سورة ${Quran.name}`,
            "SurahIndex": Quran.id - 1,
            "AyatIndex": item.id - 1
        }

        Alert.alert('Bookmark', 'Do you want to Bookmark...?',
            [
                { text: 'Cancel', style: 'cancel', },
                { text: 'Yes', onPress: () => bookmark() },
            ]);

        let bookmark = async () => {
            try {
                let bookmarkArray = await AsyncStorage.getItem('bookmark')
                bookmarkArray = bookmarkArray ? JSON.parse(bookmarkArray) : [];
                bookmarkArray.push(dataItem);
                bookmarkArray.reverse()
                console.log(bookmarkArray);

                bookmarkArray = JSON.stringify(bookmarkArray);
                await AsyncStorage.setItem("bookmark", bookmarkArray)
            }
            catch (e) {
                console.log(e.message);
            }
        }
    };

    const BookmarkNav = () => {
        navigation.navigate("Bookmark")
        setHide(false)
    }

    const SearchAyat = () => {
        setHide(false)
        setVisible(true)
    }


    let ID = data.map((item) => { return item.id - 1 })

    const SendAyat = () => {
        console.log(ID.includes(Ayat - 1))
        if (ID.includes(Ayat - 1) == true) {
            this.flatListRef.scrollToIndex({ animated: true, index: Ayat - 1 })
        } else {
            setSearch(true)
        }
        setAyat('')
        setVisible(false)
    }

    useEffect(() => {
        NightModOn()
        NightModOff()
    }, [])


    return (
        <View style={{ flex: 1 }}>


            <Dialog.Container contentStyle={{ backgroundColor: "#f3f3f3" }} visible={visible}>
                <Dialog.Title style={{ color: '#000', fontSize: 16, fontFamily: "Overpass-Medium", top: -10, }}>Search Ayat</Dialog.Title>
                <Dialog.Input autoFocus={true} value={Ayat} onChangeText={(text) => setAyat(text)} keyboardType='number-pad' style={{ color: '#000', fontSize: 16, fontFamily: "Overpass-Bold", }} />
                <Dialog.Button style={{ color: '#000', fontSize: 12, fontFamily: "Ubuntu-Medium", }} label="Cancel" onPress={() => setVisible(false)} />
                <Dialog.Button style={{ color: '#000', fontSize: 12, fontFamily: "Ubuntu-Medium" }} label="Search" onPress={() => SendAyat()} />
            </Dialog.Container>

            <Dialog.Container contentStyle={{ backgroundColor: "#f3f3f3" }} visible={Search}>
                <Dialog.Title style={{ color: '#000', fontSize: 16, fontFamily: "Overpass-Medium", top: -10, }}>Search Ayat</Dialog.Title>
                <Dialog.Description style={{ color: '#000', fontSize: 16, fontFamily: "Overpass-Medium", top: -10, alignSelf: 'center', top: -6, }} >Sorry! No Ayat Found.</Dialog.Description>
                <Dialog.Button style={{ color: '#000', fontSize: 12, fontFamily: "Ubuntu-Medium" }} label="OK" onPress={() => setSearch(false)} />
            </Dialog.Container>






            <View style={styles.SurahTxtView}>
                <Text style={styles.SurahTxt}>{`سورة ${Quran.name} `}</Text>
                <TouchableOpacity
                    style={{ position: 'absolute', left: '90%' }}
                    onPress={() => setHide(!Hide)}>
                    <Icon name="dots-vertical" size={28} color={'#fff'} style={{}} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ position: 'absolute', left: '2%' }}
                    onPress={() => navigation.goBack('Home')}>
                    <Icon name="arrow-left" size={24} color={'#fff'} style={{ left: 6 }} />
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
                            <TouchableOpacity style={styles.DrawerBox} onPress={() => SearchAyat()}>
                                <Text style={styles.DrawerTxt}>Search</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.DrawerBox} onPress={() => BookmarkNav()}>
                                <Text style={styles.DrawerTxt}>Bookmark</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity
                                style={[styles.DrawerBox]}
                                onPress={() => setNightMod(!NightMod)}>
                                <View
                                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={[styles.DrawerTxt, {}]}>{NightMod ? "Light" : "Night"} Mod</Text>
                                    {NightMod == true
                                        ?
                                        (
                                            <Icon
                                                name="white-balance-sunny"
                                                size={20}
                                                color={'orange'}
                                                style={{ top: -1 }}
                                            />
                                        )
                                        :
                                        (
                                            <Icon
                                                name="moon-waxing-crescent"
                                                size={20}
                                                color={'darkgrey'}
                                                style={{
                                                    top: -1,
                                                }}
                                            />
                                        )}
                                </View>
                            </TouchableOpacity> */}
                        </View>
                    )
                    :
                    null
            }





            <FlatList
                data={data}
                ref={(ref) => {
                    this.flatListRef = ref;
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                onScrollToIndexFailed={(error) => {
                    setTimeout(() => {
                        this.flatListRef.scrollToOffset({ offset: error.averageItemLength * error.index, animated: true });
                        if (data.length !== 0 && this.flatListRef !== null) {
                            this.flatListRef.scrollToIndex({ index: error.index, animated: true });
                        }
                    }, 100)
                }}


                renderItem={({ item, index }) => {

                    return (
                        <View style={[styles.contain, { backgroundColor: theme.BGColor }]}>
                            <TouchableOpacity
                                style={[styles.AyatView, { backgroundColor: theme.AyatViewColor }]}
                                onPress={() => setHide(false)}
                                onLongPress={() => AddBookmark(item)}>

                                <Text style={[styles.AyatTxt, { color: theme.TextColor }]}>
                                    {`${item.text}[${item.id}] `}
                                </Text>
                                <Text
                                    style={[
                                        styles.translateTxt,
                                        { color: theme.TranslateColor }
                                    ]}>
                                    {item.translation}
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
    contain: {
        flex: 1, zIndex: 1,
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
