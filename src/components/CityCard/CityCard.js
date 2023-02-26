import React from 'react';
import { Text, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const CityCard = props => {
  const { city, minTemp, maxTemp, currentTemp, aqi } = props;
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? '#d3d3d3' : '#343a40',
        paddingHorizontal: 20,
        paddingVertical: 15,
        // borderColor: '#fff',
        // borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      }}>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: isDarkMode ? '#000' : '#fff',
          }}>
          {city}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: isDarkMode ? '#000' : '#fff' }}>
            AQI {aqi} {maxTemp}
          </Text>
          <Text
            style={{
              fontSize: 10,
              lineHeight: 12,
              color: isDarkMode ? '#000' : '#fff',
            }}>
            o
          </Text>
          <Text style={{ color: isDarkMode ? '#000' : '#fff' }}>
            {' '}
            / {minTemp}
          </Text>
          <Text
            style={{
              fontSize: 10,
              lineHeight: 12,
              color: isDarkMode ? '#000' : '#fff',
            }}>
            o
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 40,
            // fontWeight: 'bold',
            color: isDarkMode ? '#000' : '#fff',
          }}>
          {currentTemp}
        </Text>
        <Text
          style={{
            fontSize: 20,
            lineHeight: 32,
            fontWeight: 'bold',
            color: isDarkMode ? '#000' : '#fff',
          }}>
          o
        </Text>
      </View>
    </View>
  );
};

export default CityCard;
