import { Text, TouchableOpacity, StyleSheet, View, SafeAreaView, Button } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import React, {useContext, Component} from "react";
import { ComponentContextStore } from "../contextProvider";
import MarqueeTextComp from "../utils/marquee";

import useStore from "../store";

export default function ProfileScreenComponent({navigation, route}){
    const { lastLogin, userId } = route.params || {};
    // const componentContextStore = useContext(ComponentContextStore);
    const { title } = useContext(ComponentContextStore);
    const { label, count, increment, decrement, reset } = useStore(); // Destructure state and actions

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
            <MarqueeTextComp/>


            <Text style={{fontSize:20, marginTop:25, fontWeight:'bold'}}>{label}</Text>
            <Text style={styles.text}>Count: {count}</Text>
            <Button title="Increment" onPress={increment} />
            <Button title="Decrement" onPress={decrement} />
            <Button title="Reset" onPress={reset} />

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
      text: {
        fontSize: 24,
      },
    

})