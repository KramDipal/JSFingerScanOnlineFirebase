import React, { useRef, useState, useMemo } from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions, Text, Alert, TouchableOpacity, FlatList, Modal } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import useStore from '../store';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const { height } = Dimensions.get('window');

export default function ArticleScreenComp() {
  const bottomSheetRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1); // Default to bkmenulist
  const [menuList, setMenuList] = useState([]); // Initialize as empty
  const { label, counts, increment, decrement, reset, resetAll } = useStore();
  const [modalCheckOutVisible, setModalCheckOutVisible] = useState(false);

  const snapPoints = ['25%', '50%'];

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

  const handlePressFunc = (index) => {
    const menuListArray = [null, bkmenulist, null, mcdomenulist, null, wendysmenulist];
    setCurrentIndex(index);

    if (menuListArray[index] === null) {
      Alert.alert('No menu list found!');
      setMenuList([]);
      return;
    }
    setMenuList(menuListArray[index]);
  };

  const handlePressModal = () => {
    // Alert.alert('Check Out Item');
    setModalCheckOutVisible(true);
  };

  // Preprocess menuList dynamically based on the current menuList state
  const menuListTest = useMemo(() => {
    return menuList.map((imageSource) => ({
      source: imageSource,
      id: uuidv4(), //generate unique id for each item
    }));
  }, [menuList]); // Depend on menuList so it updates when menuList changes

  const renderItem = ({ item }) => (
    <>
      <Image
        source={item.source}
        style={styles.imageFlatlist}
        resizeMode="cover"
      />
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          right: 5,
          bottom: 40,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => decrement(item.id)}
          style={{ marginRight: 10, borderRadius: 2, borderWidth: 1, padding: 5 }}
        >
          <Ionicons name="remove" size={20} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            borderRadius: 2,
            borderWidth: 1,
            padding: 10,
            marginRight: 10,
            color: 'blue',
          }}
        >
          {counts[item.id] || 0}
        </Text>
        <TouchableOpacity
          onPress={() => increment(item.id)}
          style={{ marginRight: 10, borderRadius: 2, borderWidth: 1, padding: 5 }}
        >
          <Ionicons name="add" size={20} />
        </TouchableOpacity>
      </View>
    </>
  );

  // Calculate total count for the cart
  const totalCount = Object.values(counts).reduce((sum, count) => sum + (count || 0), 0);

  return (
    <>
      <Text style={{ fontWeight: 'bold', marginTop: 10, marginBottom: 15 }}>{label}</Text>
      <View style={styles.cartStyleContainer}>

        <TouchableOpacity onPress={() => handlePressModal()}>
          <Ionicons name="cart" size={30} />
        </TouchableOpacity>

        <Text style={{ color: 'red', fontWeight: 'bold', marginRight: 30 }}>
          {totalCount}
        </Text>

        <TouchableOpacity
          onPress={() => resetAll()} // Wrap in arrow function to prevent infinite loop
          style={{ backgroundColor: 'grey', padding: 5, borderRadius: 5, marginRight: 5 }}
        >
          <Text>Clear</Text>
        </TouchableOpacity>


      </View>

      <GestureHandlerRootView style={styles.container}>
        <FlatList
          data={menuListTest}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />

        <TouchableOpacity
          onPress={() => bottomSheetRef.current.expand()}
          style={{ alignSelf: 'center', padding: 10 }}
        >
          <Ionicons name="menu" size={30} />
        </TouchableOpacity>

        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
        >
          <BottomSheetView style={styles.contentContainer}>
            <ScrollView
              contentContainerStyle={styles.contentContainer}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {images.map((image, index) => (
                <TouchableOpacity
                  onPress={() => handlePressFunc(index)}
                  key={index}
                >
                  <Image
                    source={image}
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

      {/* <Modal visible={modalCheckOutVisible} transparent onRequestClose={() => setModalCheckOutVisible(false)}>
        <View style={styles.modalOverlay}>
           <TouchableOpacity onPress={() => setModalCheckOutVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity> 
            <Text>Total:</Text>
            <Text>{totalCount}</Text>
        </View>
      </Modal> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
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
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 25,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 25,
  },
  imageBlowUp: {
    width: 90,
    height: 90,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
  },
  imageBelow: {
    width: 400,
    height: 200,
    marginBottom: 25,
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
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
    marginBottom: 10,
  },
  cartStyleContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    top: 10,
    alignItems: 'center',
  },
  modalOverlay: {
    flex:1,
    // backgroundColor: 'rgba(97, 187, 145, 0.8)',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    margin: 50,
    marginTop: 180,
    marginBottom:150
  
  },
  modalClose: {
    position: 'absolute',
    top: 10,
    right: 25,
  },
  closeText: {
    position: 'absolute',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    left: 90,
    bottom: 130,
  },
});