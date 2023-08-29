import React, { useEffect, useState } from 'react';
import { Platform, StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useDebounce from '../hooks/useDebouncedValue';
interface Props {
  style?: StyleProp<ViewStyle>;
  onDebounce: (value: string) => void;
}

const SearchInput = ({ style = {}, onDebounce }: Props) => {
  const [textValue, setTextValue] = useState('');
  const debouncedValue = useDebounce(textValue, 1500);
  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);
  return (
    <View
      style={{
        ...styles.container,
        ...style as object,
      }}
    >
      <View
        style={{
          ...styles.textBackground,
        }}
      >
        <TextInput
          placeholder="Search Pokemon"
          style={{
            ...styles.textInput,
          }}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon
          name="search-outline"
          size={30}
          color="grey"
        />

      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  textBackground: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    top: Platform.OS === 'ios' ? 0 : 2,
  },
});
