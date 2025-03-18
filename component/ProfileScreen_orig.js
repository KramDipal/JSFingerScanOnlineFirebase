import { Text, TouchableOpacity, StyleSheet, View, SafeAreaView } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import React, {useContext, Component} from "react";



import { ComponentContextStore } from "../contextProvider";

import MarqueeText from 'react-native-marquee';


export default function ProfileScreenComponent({navigation, route}){
    const { lastLogin, userId } = route.params || {};
    const componentContextStore = useContext(ComponentContextStore);
    const { title } = useContext(ComponentContextStore);

    // console.log(title);
    return(
        <View style={styles.container}>
            <TouchableOpacity
                onPress={()=>navigation.navigate('Home')}
            >
                <Text style={{color:'blue', fontSize:20}}>Go to Home Screen</Text>

            </TouchableOpacity>
            <Text style={{color:'red', fontSize:20}}>Title: {title}</Text>

            <Text>
                Last login: {lastLogin || 'Not set yet'}
            </Text>
            <Text>
                UserId: {userId || 'Not set yet'}
            </Text>


            <MarqueeTextSample/>
        </View>

    );


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      marquee: {
        fontSize: 20,
        color: '#000',
        width: '100%', // Ensure it spans the screen
      },

})