import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const leftText = 'hisper';
  const rightText = 'oop';
  const typingSpeed = 30;

  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [phase, setPhase] = useState('initial'); // initial, typing, closing, done

  useEffect(() => {
    let timer;
    if (phase === 'initial') {
      timer = setTimeout(() => setPhase('typing'), 1200);
    } else if (phase === 'typing') {
      if (leftCount < leftText.length || rightCount < rightText.length) {
        timer = setTimeout(() => {
          setLeftCount((prev) => (prev < leftText.length ? prev + 1 : prev));
          setRightCount((prev) => (prev < rightText.length ? prev + 1 : prev));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => setPhase('closing'), 1200);
      }
    } else if (phase === 'closing') {
      if (leftCount > 0 || rightCount > 0) {
        timer = setTimeout(() => {
          setLeftCount((prev) => (prev > 0 ? prev - 1 : prev));
          setRightCount((prev) => (prev > 0 ? prev - 1 : prev));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setPhase('done');
          navigation.navigate('Login');
        }, 600);
      }
    }
    return () => clearTimeout(timer);
  }, [phase, leftCount, rightCount]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Text style={styles.text}>
        <Text style={styles.cyan}>W</Text>
        <Text>{leftText.substring(0, leftCount)}</Text>
        <Text style={styles.cyan}>L</Text>
        <Text>{rightText.substring(0, rightCount)}</Text>
      </Text>
      <Text style={styles.tagline}>Connect | Share | Inspire</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#000',
    justifyContent:'center',
    alignItems:'center',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
  },
  cyan: {
    color: '#00FFFF',
  },
  tagline: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#00FFFF80', // A lighter cyan with some opacity
    letterSpacing: 1.5,
  }
});

export default SplashScreen;






