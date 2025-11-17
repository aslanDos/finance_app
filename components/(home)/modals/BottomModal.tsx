import React, { useEffect } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const { height } = Dimensions.get("window");
const SNAP_HEIGHT = height * 0.75;

interface BottomSheetProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function BottomModal({ children, onClose }: BottomSheetProps) {
  const translateY = useSharedValue(SNAP_HEIGHT);
  const overlayOpacity = useSharedValue(0);
  const startY = useSharedValue(0);

  useEffect(() => {
    overlayOpacity.value = withTiming(0.5, { duration: 250 });
    translateY.value = withSpring(0, { damping: 20 });
  }, []);

  const closeSheet = () => {
    overlayOpacity.value = withTiming(0, { duration: 200 });
    translateY.value = withTiming(SNAP_HEIGHT, { duration: 300 }, () => {
      runOnJS(onClose)();
    });
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      startY.value = translateY.value;
    })
    .onUpdate((e) => {
      const next = Math.min(
        Math.max(startY.value + e.translationY, 0),
        SNAP_HEIGHT
      );
      translateY.value = next;
    })
    .onEnd((e) => {
      const shouldClose =
        translateY.value > SNAP_HEIGHT * 0.35 || e.velocityY > 1000;
      if (shouldClose) runOnJS(closeSheet)();
      else translateY.value = withSpring(0, { damping: 18 });
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const handleAreaStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, SNAP_HEIGHT * 0.5],
      [1, 0],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <TouchableWithoutFeedback onPress={closeSheet}>
        <Animated.View style={[styles.overlay, overlayStyle]} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.container, sheetStyle]}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.handleArea, handleAreaStyle]}>
            <View style={styles.dragHandle} />
          </Animated.View>
        </GestureDetector>

        <View style={styles.content}>{children}</View>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: SNAP_HEIGHT,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: -2 },
      },
      android: { elevation: 10 },
    }),
  },
  handleArea: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  dragHandle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#C7C7CC",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
