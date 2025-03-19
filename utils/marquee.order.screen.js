import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function MarqueeTextComp({ navigation, route }) {
  return (
    // <SafeAreaView style={styles.safeArea}>
      <MarqueeText text="Order now !!! Dial 888-000-111" />
      
    // </SafeAreaView>
  );
}

const MarqueeText = ({ text, speed = 10 }) => {
  const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const textWidth = text.length * 10; // Rough estimate, adjust if needed

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: -textWidth,
        duration: textWidth * speed, // Speed controls duration
        useNativeDriver: true, // Native performance
      })
    );
    animation.start();
    return () => animation.stop();
  }, [text, speed, textWidth]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.tickerText, { transform: [{ translateX }] }]}>
        {text}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: SCREEN_WIDTH * 0.9,
    overflow: 'hidden',
  },
  tickerText: {
    marginTop:10,
    fontSize: 20,
    color: 'green',
  },
});