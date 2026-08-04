import React, { useEffect, useRef } from "react";
import { Image, Animated } from "react-native";
import styles from "./SplashScreen.styles.js";

import Logo from "../../../assets/splash-icon.png";
import Sunburst from "../../../assets/sunburst.png";
import Sunburst2 from "../../../assets/sunburst2.png";

const BURST_DELAY = 1000;    // ms before the sunburst starts appearing
const BURST_DURATION = 800;  // ms for its fade + zoom
const EXIT_DELAY = 7500;     // ms before the whole screen starts leaving
const EXIT_DURATION = 500;   // ms for the screen fade-out

export default function SplashScreen({ navigation }) {
  const screenOpacity = useRef(new Animated.Value(1)).current;
  const burstOpacity = useRef(new Animated.Value(0)).current;
  const burstScale = useRef(new Animated.Value(1.3)).current;
  const topBurstOpacity = useRef(Animated.multiply(burstOpacity, 0.15)).current;

  useEffect(() => {
    const showBurst = setTimeout(() => {
      Animated.parallel([
        Animated.timing(burstOpacity, {
          toValue: 1,
          duration: BURST_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(burstScale, {
          toValue: 1,
          duration: BURST_DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    }, BURST_DELAY);

    const exitTimer = setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: EXIT_DURATION,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace("Onboarding");
      });
    }, EXIT_DELAY);

    return () => {
      clearTimeout(showBurst);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>

      {/* Top Left */}
      <Animated.Image
        source={Sunburst2}
        style={[
          styles.topBurst,
          { opacity: topBurstOpacity, transform: [{ scale: burstScale }] },
        ]}
        resizeMode="contain"
      />

      {/* Logo */}
      <Image source={Logo} style={styles.logo} resizeMode="contain" />

      {/* Bottom Right */}
      <Animated.Image
        source={Sunburst}
        style={[
          styles.bottomBurst,
          { opacity: burstOpacity, transform: [{ scale: burstScale }] },
        ]}
        resizeMode="contain"
      />

    </Animated.View>
  );
}