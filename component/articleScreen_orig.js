import React, { useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions, Text, Alert, TouchableOpacity, FlatList, Modal } from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import useStore from "../store";
import { Ionicons } from '@expo/vector-icons'

const { height } = Dimensions.get('window');

export default function ArticleScreenComp() {
  const bottomSheetRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [handlePress, setHandlePress] = useState('');
  const  [modal, setModal] = useState('');

  const { label, count, increment, decrement, reset } = useStore(); // Destructure state and actions

  // Snap points for the bottom sheet (e.g., 25% and 75% of screen height)
  const snapPoints = ['25%', '50%'];

  // Sample image URLs (replace with your own)
  const images = [
    require('../assets/images/aw.png'),
    require('../assets/images/bk.png'),
    require('../assets/images/krispy.jpg'),
    require('../assets/images/mcdo.jpg'),
    require('../assets/images/pop.png'),
    require('../assets/images/wendys.png'),
  ];

  const menu = [
    require('../assets/images/aw_menu.jpg'),
    require('../assets/images/bk_menu.jpg'),
    require('../assets/images/kk_menu.jpg'),
    require('../assets/images/mcdo_menu.jpg'),
    require('../assets/images/pop_menu.jpg'),
    require('../assets/images/wen_menu.jpg'),
  ];

  const mcdomenulist = [
    require('../assets/mcdomenulist/burgerMcdo.jpg'),
    require('../assets/mcdomenulist/mcdoCoffee.jpg'),
    require('../assets/mcdomenulist/mcdoCombo.jpg'),
    require('../assets/mcdomenulist/mcdoFries.jpg'),
    require('../assets/mcdomenulist/mcdoPC.jpg'),
  ];

  const wendysmenulist = [
    require('../assets/wendysmenulist/burger.jpg'),
    require('../assets/wendysmenulist/fries.jpg'),
    require('../assets/wendysmenulist/frosty.jpg'),
    require('../assets/wendysmenulist/salad.jpg'),
    require('../assets/wendysmenulist/combo.jpg'),
    require('../assets/wendysmenulist/tea.jpg'),
  ];

  const bkmenulist = [
    require('../assets/bkmenulist/burger.jpg'),
    require('../assets/bkmenulist/coffee.jpg'),
    require('../assets/bkmenulist/combo.jpg'),
    require('../assets/bkmenulist/fries.jpg'),
    require('../assets/bkmenulist/soda.jpg'),
  ];

  const [ menuList, setMenuList ] = useState(bkmenulist);
  const handlePressFunc = (index) => {
    // Alert.alert('Pressed ' + index);
    const menuListArray = [null, bkmenulist, null, mcdomenulist, null, wendysmenulist];
    setCurrentIndex(index);

    if(menuListArray[index] === null){
      Alert.alert('No menu list found!');
      setMenuList([]);
      return;
    }
    setMenuList(menuListArray[index]);

  }

  const handlePressModal = () => {
    Alert.alert('Modal Pressed ');
    setModal(true);
  }


  return (
    <>
        <Text style={{fontWeight:'bold', marginTop:10, marginBottom:15}}>{label}</Text>
        <View style={styles.cartStyleContainer}>
            <TouchableOpacity
                onPress={()=>handlePressModal()}
            >
                <Ionicons name="cart" size={30}/>
            </TouchableOpacity>

            <Text style={{color:'red', fontWeight:'bold', marginRight:30}}>{count}</Text>

            <TouchableOpacity onPress={reset} style={{backgroundColor:'grey', padding:5, borderRadius:5, marginRight:5}}>
                <Text>Clear</Text>
            </TouchableOpacity>
        </View>

        <GestureHandlerRootView style={styles.container}>
        <FlatList
            data={menuList}
            // keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
                
                // <TouchableOpacity 
                //     onPress={()=>Alert.alert('Pressed' + item)}
                // >
                <>
                    {/* <TouchableOpacity onPress={() => bottomSheetRef.current.expand()}> */}
                        <Image
                            key={index}
                            source={item}
                            style={styles.imageFlatlist}
                            resizeMode="cover"
                        />
                    {/* </TouchableOpacity> */}

                    <View style={{flexDirection:'row', position:'absolute', right:5, bottom:40,       alignItems:'center'}}>
                        <TouchableOpacity 
                            key={index}
                            onPress={decrement}
                            style={{marginRight:10, fontWeight:'bold', borderRadius:2, borderWidth:1, padding:5}}>                                
                            <Ionicons name="remove" size={20}/>
                        </TouchableOpacity>

                        <Text style={{fontSize:15, fontWeight:'bold', borderRadius:2, borderWidth:1, padding:10, marginRight:10, color:'blue'}}>{count}</Text>
                            
                        <TouchableOpacity 
                            onPress={increment}
                            style={{marginRight:10, fontWeight:'bold', borderRadius:2, borderWidth:1, padding:5}}>                                
                            <Ionicons name="add" size={20}/>
                        </TouchableOpacity>
                    </View>                
                </>

                // </TouchableOpacity>
            )}  
            />
        <TouchableOpacity onPress={() => bottomSheetRef.current.expand()}>
            <Text style={{fontSize:20, fontWeight:'bold', color:'red', textAlign:'center',
            padding:10, marginTop:10, marginBottom: 30
            }}>
                E x p a n d
            </Text>
        </TouchableOpacity>
        <BottomSheet
        ref={bottomSheetRef}
        index={0} // Start at the first snap point (25%)
        snapPoints={snapPoints}
        enablePanDownToClose={true} // Optional: Prevents closing by dragging down
        >

            <BottomSheetView style={styles.contentContainer}>
            <ScrollView 
                contentContainerStyle={styles.contentContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
            {images.map((images, index) => (
                <TouchableOpacity 
                    onPress={()=>handlePressFunc(index)}
                    key={index}
                >   
                <Image
                //   key={index}
                source={images}
                style={index === currentIndex ? styles.imageBlowUp : styles.image}
                resizeMode="cover"
                />
                </TouchableOpacity>

            ))}
            </ScrollView>

            <View style={styles.dotsContainer}>
                {images.map((_, index) => (
                    <View
                    key={index}
                    style={[
                        styles.dot,
                        { backgroundColor: index === currentIndex ? '#ffca2b' : '#ccc' },
                    ]}
                    />
                ))}
            </View>

            <Image
                source={menu[currentIndex]}
                style={styles.imageBelow}
                resizeMode="cover"
            />
            </BottomSheetView>
        </BottomSheet>
        </GestureHandlerRootView>


        {/* <Modal
            visible={modal}
            animationType="slide"
            transparent={true}
            onRequestClose={()=>setModal(false)}
        /> */}
    </>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Background outside the sheet
  },
  contentContainer: {
    padding: 5,
    alignItems: 'center',
  },
  imageFlatlist: {
    width: 90,
    height: 90,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth:1,
    marginRight: 10,
    marginLeft: 10,
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 25,
    borderRadius: 10,
    borderWidth:1,
    marginRight: 25,
  },
  imageBlowUp: {
    width: 90,
    height: 90,
    borderRadius: 10,
    borderWidth:1,
    marginRight:10,
    marginBottom:10,
  },
  imageBelow: {
    width: 400,
    height: 200,
    marginBottom: 25,
    borderRadius: 10,
    borderWidth:1,
    padding:5,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: 10
  },
  cartStyleContainer:{marginBottom:10, flexDirection:'row', position:'absolute', right:10, top:10, alignItems:'center'}
});