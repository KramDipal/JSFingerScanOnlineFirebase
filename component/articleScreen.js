import React, { useRef, useState, useMemo } from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions, Text, Alert, TouchableOpacity, FlatList, Modal } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import useStore from '../store';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import MarqueeTextComp from '../utils/marquee.order.screen';

const { height } = Dimensions.get('window');

export default function ArticleScreenComp() {
  const bottomSheetRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  const [modalVisible, setModalVisible] = useState(false); // State for Modal visibility

  const { label, counts, increment, decrement, resetAll, total } = useStore();

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

  // Mapping of image sources to item names (adjust names as needed)
  const itemNames = {
    [require('../assets/bkmenulist/burger.jpg')]: 'BK Burger',
    [require('../assets/bkmenulist/coffee.jpg')]: 'BK Coffee',
    [require('../assets/bkmenulist/combo.jpg')]: 'BK Combo',
    [require('../assets/bkmenulist/fries.jpg')]: 'BK Fries',
    [require('../assets/bkmenulist/soda.jpg')]: 'BK Soda',
    [require('../assets/mcdomenulist/burgerMcdo.jpg')]: 'McDo Burger',
    [require('../assets/mcdomenulist/mcdoCoffee.jpg')]: 'McDo Coffee',
    [require('../assets/mcdomenulist/mcdoCombo.jpg')]: 'McDo Combo',
    [require('../assets/mcdomenulist/mcdoFries.jpg')]: 'McDo Fries',
    [require('../assets/mcdomenulist/mcdoPC.jpg')]: 'McDo Pancake',
    [require('../assets/wendysmenulist/burger.jpg')]: 'Wendy’s Burger',
    [require('../assets/wendysmenulist/fries.jpg')]: 'Wendy’s Fries',
    [require('../assets/wendysmenulist/frosty.jpg')]: 'Wendy’s Frosty',
    [require('../assets/wendysmenulist/salad.jpg')]: 'Wendy’s Salad',
    [require('../assets/wendysmenulist/combo.jpg')]: 'Wendy’s Combo',
    [require('../assets/wendysmenulist/tea.jpg')]: 'Wendy’s Iced Tea',
  };

    // Mapping of image sources to item names (adjust names as needed)
    const itemPrice = {
      [require('../assets/bkmenulist/burger.jpg')]: '100',
      [require('../assets/bkmenulist/coffee.jpg')]: '200',
      [require('../assets/bkmenulist/combo.jpg')]: '300',
      [require('../assets/bkmenulist/fries.jpg')]: '400',
      [require('../assets/bkmenulist/soda.jpg')]: '500',
      [require('../assets/mcdomenulist/burgerMcdo.jpg')]: '150',
      [require('../assets/mcdomenulist/mcdoCoffee.jpg')]: '160',
      [require('../assets/mcdomenulist/mcdoCombo.jpg')]: '170',
      [require('../assets/mcdomenulist/mcdoFries.jpg')]: '180',
      [require('../assets/mcdomenulist/mcdoPC.jpg')]: '190',
      [require('../assets/wendysmenulist/burger.jpg')]: '210',
      [require('../assets/wendysmenulist/fries.jpg')]: '220',
      [require('../assets/wendysmenulist/frosty.jpg')]: '230',
      [require('../assets/wendysmenulist/salad.jpg')]: '240',
      [require('../assets/wendysmenulist/combo.jpg')]: '250',
      [require('../assets/wendysmenulist/tea.jpg')]: '260',
    };
  
  // Default menulist
  const [menuList, setMenuList] = useState(bkmenulist);

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
    setModalVisible(true); // Show the Modal
  };

  const menuListTest = useMemo(() => {
    return menuList.map((imageSource) => ({
      source: imageSource,
      id: uuidv4(),
    }));
  }, [menuList]);



  const renderItem = ({ item }) => (
    
    <>
      <View style={{ flexDirection: 'row' }}>
        <Image source={item.source} style={styles.imageFlatlist} resizeMode="cover" />
        <View style={{marginTop:25}}>
          <Text style={{fontWeight:'bold'}}>{itemNames[item.source]}</Text>
          <Text style={{fontWeight:'bold'}}>Php {itemPrice[item.source]}</Text>    
        </View>    
      </View>


      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          right: 5,
          bottom: 40,
          alignItems: 'center',
        }}
      >

        {/* Increment and Decrement */}
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
          onPress={() => increment(item.id, Number(itemPrice[item.source]))}
          style={{ marginRight: 10, borderRadius: 2, borderWidth: 1, padding: 5 }}
        >
          <Ionicons name="add" size={20} />
        </TouchableOpacity>
        {/* Increment and Decrement */}

      </View>
    </>
  );

  // Calculate total count and price
  const totalCount = Object.values(counts).reduce((sum, count) => sum + (count || 0), 0);
  const totalAmount = Object.values(total).reduce((sum, total) => sum + (total || 0), 0);

  // Render cart items in the Modal
  const cartItems = menuListTest
    .filter((item) => counts[item.id] > 0) // Only show items with count > 0
    .map((item) => ({
      name: itemNames[item.source] || 'Unknown Item',
      count: counts[item.id] || 0,
    }));

  return (
    <>
    <MarqueeTextComp/>
      <Text style={{ fontWeight: 'bold', margin: 10, marginBottom: 25 }}>{label}</Text>

      <View style={styles.cartStyleContainer}>

        <TouchableOpacity onPress={handlePressModal}>
          <Ionicons name="cart" size={30} />
        </TouchableOpacity>

        <Text style={{ color: 'red', fontWeight: 'bold', marginRight: 10 }}>
          {totalCount}
        </Text>

        <Text style={{ color: 'black', fontWeight: 'bold', marginRight: 10 }}>
          {/* Php {totalPrice} */}
          Php {totalAmount}
        </Text>

        <TouchableOpacity
          onPress={() => resetAll()}
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
                <TouchableOpacity onPress={() => handlePressFunc(index)} key={index}>
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

      {/* Modal for Cart */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cart</Text>
            {cartItems.length > 0 ? (
              <>
                <FlatList
                  data={cartItems}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                      <Text style={{fontSize:15}}>{item.name}</Text>
                      <Text>Qty: {item.count}</Text>
                    </View>
                  )}
                />
                <Text style={styles.modalTotal}>Total Items: {totalCount}</Text>
                <Text style={styles.modalTotal}>Total Price: Php {totalAmount}.00</Text>
              </>
            ) : (
              <Text style={styles.emptyCart}>Your cart is empty.</Text>
            )}  
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Check Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    top: 40,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 5,
  },
  modalTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  emptyCart: {
    fontSize: 16,
    color: 'gray',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ffca2b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});