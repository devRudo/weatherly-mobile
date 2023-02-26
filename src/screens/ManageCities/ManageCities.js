import React, { useState } from 'react';
import {
  Text,
  Dimensions,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { CityCard } from '../../components';

const ManageCities = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [location, setLocation] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: backgroundStyle.backgroundColor,
        minHeight: Dimensions.get('window').height - 68,
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{}}
        showsVerticalScrollIndicator={false}>
        <View style={{ padding: 20 }}>
          <TextInput
            value={location}
            placeholder="Enter location"
            onChangeText={text => setLocation(text)}
            style={{
              borderColor: isDarkMode ? '#f1f1f1' : '#343a40',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          />
          <CityCard
            city={'Varanasi'}
            aqi={198}
            maxTemp={32}
            minTemp={14}
            currentTemp={27}
          />
          <CityCard
            city={'Delhi'}
            aqi={198}
            maxTemp={32}
            minTemp={14}
            currentTemp={27}
          />
          <CityCard
            city={'Lucknow'}
            aqi={198}
            maxTemp={32}
            minTemp={14}
            currentTemp={27}
          />
          <CityCard
            city={'Ahemdabad'}
            aqi={198}
            maxTemp={32}
            minTemp={14}
            currentTemp={27}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageCities;
