import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { navigationRef } from './RootNavigation.js';
import { EventRegister } from 'react-native-event-listeners';

import theme from './Config/Theme.js';
import themeContext from './Config/ThemeContext';

import HomePage from './Screens/HomePage';
import Surah from './Screens/Surah';
import Bookmark from './Screens/Bookmark';
import BookmarkSurah from './Screens/BookmarkSurah';
import Splash from './Screens/Splash';

const Stack = createNativeStackNavigator();




export default function App() {
  const [NightMod, setNightMod] = useState();

  useEffect(() => {
    let Bool = async () => {
      let boolean = await AsyncStorage.getItem( "Boolean");
      if (boolean) {
        boolean = JSON.parse(boolean);
        setNightMod(boolean);
      }
    }
    Bool()
  
      let eventListener = EventRegister.addEventListener(
        "changeColor",
        async (data) => {
          await AsyncStorage.setItem( "Boolean", JSON.stringify(data) )
          setNightMod(data);
          // console.log(data)
        }
      );
    // return () => {
    //   EventRegister.removeEventListener(eventListener);
    // }
  }, [])

  return (
    <themeContext.Provider value={NightMod === true ? theme.dark : theme.light}>

      <NavigationContainer ref={navigationRef} >
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />




          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{
              headerShown: false,
              headerStyle: { backgroundColor: 'green' },
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
              headerTitle: 'القرآن الكريم',
              headerTitleStyle: {
                fontSize: 22,
              },
              headerRight: () => {
                return (
                  <TouchableOpacity onPress={() => navigationRef.navigate('Bookmark')}>
                    <Icon
                      name="dots-vertical"
                      size={28}
                      color={'#fff'}
                      style={{ top: 2 }}
                    />
                  </TouchableOpacity>
                )
              }
            }}
          />
          <Stack.Screen
            name="Surah"
            component={Surah}
            options={{
              headerShown: false,
              headerStyle: { backgroundColor: 'green' },
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
              headerTitle: 'القرآن الكريم',
              headerTitleStyle: {
                fontSize: 22,
              },
            }}
          />

          <Stack.Screen
            name="Bookmark"
            component={Bookmark}
            options={{
              headerShown: false,
              headerStyle: { backgroundColor: 'green' },
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
              headerTitle: 'Bookmark',
              headerTitleStyle: {
                fontSize: 20,
                fontFamily: 'Overpass-Bold'
              },
              headerRight: () => {
                return (
                  <TouchableOpacity onPress={() => deleteData()}>
                    <Icon
                      name="delete"
                      size={22}
                      color={'#fff'}
                      style={{ top: 2 }}
                    />
                  </TouchableOpacity>
                )
              }
            }}
          />

          <Stack.Screen
            name="BookmarkSurah"
            component={BookmarkSurah}
            options={{
              headerShown: false,
              headerStyle: { backgroundColor: 'green' },
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
              headerTitle: 'Bookmark',
              headerTitleStyle: {
                fontSize: 20,
                fontFamily: 'Overpass-Bold'
              },
              headerRight: () => {
                return (
                  <TouchableOpacity onPress={() => deleteData()}>
                    <Icon
                      name="delete"
                      size={22}
                      color={'#fff'}
                      style={{ top: 2 }}
                    />
                  </TouchableOpacity>
                )
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
}
