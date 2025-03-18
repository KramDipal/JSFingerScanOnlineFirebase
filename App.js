import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreenComponent from './component/homescreen';
import ProfileScreenComponent from './component/ProfileScreen';
import ArticleScreenComp from './component/articleScreen';
import OrderScreenComp from './component/orderscreen';
import { Ionicons } from '@expo/vector-icons'

import React, {useState} from 'react';

import CompContextStoreProvider from './contextProvider';

const Tab = createBottomTabNavigator();


export default function App() {
    const [lastlogin, setLastLogin] = useState('');

    return (
        <CompContextStoreProvider>
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='Home'
            >
            <Tab.Screen 
                name="Home" 
                component={HomeScreenComponent}
                options={{
                    tabBarIcon: ({color,size})=> (
                    <Ionicons name="home" color={color} size={size}/>
                  )}} 
            
            />
            {/* {() => <HomeScreenComponent lastlogin={lastlogin}/>}
            </Tab.Screen> */}


            <Tab.Screen 
                name="Profile" 
                component={ProfileScreenComponent}
                options={{
                    tabBarIcon: ({color,size})=> (
                    <Ionicons name="person" color={color} size={size}/>
                  )}} 
             />

             
            <Tab.Screen 
                name="Order" 
                component={ArticleScreenComp}
                options={{
                    tabBarIcon: ({color,size})=> (
                    <Ionicons name="book" color={color} size={size}/>
                  )}} 
             />

            {/* <Tab.Screen 
                name="Order2" 
                component={OrderScreenComp}
                options={{
                    tabBarIcon: ({color,size})=> (
                    <Ionicons name="book" color={color} size={size}/>
                  )}} 
             /> */}

            </Tab.Navigator>

            
        </NavigationContainer>
        </CompContextStoreProvider>
      );


};