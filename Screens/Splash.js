import { StyleSheet, Text, View,Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'

export default function Splash({navigation}) {

   useEffect( () => {
    setTimeout(() => {
        navigation.replace("Home")
    },4000)
   }, []) 


  return (
    <View style={{flex: 1, backgroundColor: '#fff'}} >
        <StatusBar translucent={true} backgroundColor={"transparent"} />
        <Image 
            style={{width: '100%',height: '100%', resizeMode: 'contain'}}
            source={require('../assets/logo.png')}
            // require('./my-icon.png')
            // source={{uri : "https://o.remove.bg/downloads/a5c0ac38-2eb6-4b7a-9816-0bcfefd856cf/1cf3d16909dacbbd1e87cf4cde324ae9-removebg-preview.png"}}
        />
    </View>
  )
}

const styles = StyleSheet.create({})