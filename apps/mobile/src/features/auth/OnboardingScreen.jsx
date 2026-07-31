import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./OnboardingScreen.styles.js";
import { onboardingSlides } from "./OnboardingData.js";

const { width } = Dimensions.get("window");
const ENTER_DURATION = 500; // matches SplashScreen's EXIT_DURATION

export default function OnboardingScreen({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const isLastSlide = activeIndex === onboardingSlides.length - 1;

  useEffect(() => {
    Animated.timing(screenOpacity, {
      toValue: 1,
      duration: ENTER_DURATION,
      useNativeDriver: true,
    }).start();
  }, []);

  const goToRoleSelector = () => navigation.navigate("Role");
  const goToLogin = () => navigation.navigate("Login");

  const handleNext = () => {
    if (!isLastSlide) {
      listRef.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      goToRoleSelector();
    }
  };

  const onScrollEnd = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <View style={styles.imagePlaceholder}>
        <Image source={item.image} style={styles.image} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <Animated.View style={{ flex: 1, opacity: screenOpacity }}>
      <SafeAreaView style={styles.container}>
        <FlatList
          ref={listRef}
          data={onboardingSlides}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
        />

        <View style={styles.dots}>
          {onboardingSlides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === activeIndex && styles.dotActive]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>
            {isLastSlide ? "GET STARTED" : "NEXT"}
          </Text>
        </TouchableOpacity>

        {!isLastSlide && (
          <TouchableOpacity onPress={goToRoleSelector}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </Animated.View>
  );
}
