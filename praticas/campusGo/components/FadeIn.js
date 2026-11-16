import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';
export default function FadeIn({ children, delay = 0 }) {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => { Animated.timing(opacity, { toValue: 1, duration: 450, delay, useNativeDriver: true }).start(); }, [opacity, delay]);
  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}
