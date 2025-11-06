import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type AuthInputProps = TextInputProps & {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  hint?: string;
  secure?: boolean;
  value: string; // ← добавили
  onChangeText: (text: string) => void; // ← добавили
};

export default function AuthInput({
                                    label,
                                    icon,
                                    hint,
                                    secure,
                                    value,
                                    onChangeText,
                                    ...props
                                  }: AuthInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      {/* Label */}
      <Text
        style={[
          styles.label,
          focused || value ? styles.labelActive : undefined,
        ]}
      >
        {focused ? label : undefined}
      </Text>

      {/* Input row */}
      <View
        style={[
          styles.inputContainer,
          { borderBottomColor: focused ? '#007AFF' : '#333' },
        ]}
      >
        <TextInput
          {...props}
          secureTextEntry={secure}
          value={value}
          onChangeText={onChangeText}
          placeholder={focused ? undefined : props.placeholder}
          style={styles.input}
          placeholderTextColor={focused ? '#007AFF' : '#888'}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Ionicons
          name={icon}
          size={20}
          color={focused ? '#007AFF' : '#888'}
          style={styles.icon}
        />
      </View>

      {/* Hint */}
      {(focused || value) && hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 25,
  },
  label: {
    color: '#000',
    fontSize: 14,
    marginBottom: 4,
  },
  labelActive: {
    color: '#007AFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#333',
    paddingBottom: 4,
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: 16,
    paddingVertical: 6,
  },
  icon: {
    marginLeft: 8,
  },
  hint: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});
