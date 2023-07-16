import { Picker } from '@react-native-picker/picker';
import React from 'react';
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  ActionSheetIOS,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const CommonPicker = ({ items, value, handleChange, type }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    color: isDarkMode ? '#fff' : '#000',
  };

  const handleOpenActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...items?.map(item => item.label), 'Cancel'],
        cancelButtonIndex: items?.length,
        destructiveButtonIndex: items?.length,
        userInterfaceStyle: isDarkMode ? 'dark' : 'light',
      },
      selectedValueIndex => {
        if (selectedValueIndex !== items?.length) {
          handleChange(
            items?.find((item, itemIndex) => itemIndex === selectedValueIndex)
              ?.value,
            type,
          );
        } else {
          ActionSheetIOS.showShareActionSheetWithOptions;
        }
        // console.log(
        //   items?.find((item, itemIndex) => itemIndex === selectedValueIndex)
        //     ?.value,
        // );
      },
    );
  };

  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity
        onPress={handleOpenActionSheet}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 2,
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: backgroundStyle.color,
          }}
          numberOfLines={1}>
          {items?.find(item => item?.value === value)?.label}
        </Text>
        <Icon name="menu-down" size={30} color={backgroundStyle.color} />
      </TouchableOpacity>
    );
  } else {
    return (
      <Picker
        // mode="dropdown"
        style={{ flex: 1 }}
        dropdownIconColor={backgroundStyle.color}
        selectedValue={value}
        onValueChange={newValue => handleChange(newValue, 'temperatureUnit')}>
        {items && Array.isArray(items) && items.length > 0
          ? items.map(item => {
              return (
                <Picker.Item
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  color={backgroundStyle.color}
                />
              );
            })
          : null}
      </Picker>
    );
  }
};

export default CommonPicker;
