import React from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useDispatch } from 'react-redux';
import { setCurrentLocationId } from '../../redux/features/locations/locationsSlice';

const CityCard = props => {
  const { city, minTemp, maxTemp, currentTemp, aqi, id, navigation } = props;
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setCurrentLocationId({ currentLocationId: id }));
        navigation.navigate('Home');
      }}
      style={{
        backgroundColor: isDarkMode ? '#d3d3d3' : '#343a40',
        paddingHorizontal: 20,
        paddingVertical: 15,
        // borderColor: '#fff',
        // borderWidth: 1,
        borderRadius: 2,
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
    </TouchableOpacity>
  );
};

export default CityCard;
