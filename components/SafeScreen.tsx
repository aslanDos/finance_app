import {View,StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React from 'react';

type SafeScreenProps = {
  children?: React.ReactNode;
};

export default function SafeScreen({children}:SafeScreenProps) {
  const insets = useSafeAreaInsets();

  return(
    <View style={[styles.container,{paddingTop: insets.top}]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
});
