import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  useColorScheme,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

const AirQualityIndex = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();

  const { locations, timeOfUpdate, currentLocationId } = useSelector(
    state => state.locations,
  );
  const [currentLocation, setCurrentLocation] = useState(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    if (
      locations &&
      Array.isArray(locations) &&
      locations.length > 0 &&
      currentLocationId
    ) {
      setCurrentLocation(
        locations.filter(location => location.id === currentLocationId)[0],
      );
    }
  }, [locations, currentLocationId]);

  console.log(JSON.stringify(currentLocation?.airPollution?.list, null, 2));

  return (
    <SafeAreaView
      style={{
        backgroundColor: backgroundStyle.backgroundColor,
        minHeight: Dimensions.get('window').height,
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          padding: 20,
        }}>
        <Text
          style={{
            fontSize: 40,
            color:
              currentLocation?.airPollution?.list?.[0]?.main?.aqi === 1
                ? 'green'
                : currentLocation?.airPollution?.list?.[0]?.main?.aqi === 2
                ? 'darkgreen'
                : currentLocation?.airPollution?.list?.[0]?.main?.aqi === 3
                ? '#1f6350'
                : currentLocation?.airPollution?.list?.[0]?.main?.aqi === 4
                ? '#e74648'
                : currentLocation?.airPollution?.list?.[0]?.main?.aqi === 5
                ? '#fe0000'
                : '#1f6350',
          }}>
          {currentLocation?.airPollution?.list?.[0]?.main?.aqi === 1
            ? 'Good'
            : currentLocation?.airPollution?.list?.[0]?.main?.aqi === 2
            ? 'Fair'
            : currentLocation?.airPollution?.list?.[0]?.main?.aqi === 3
            ? 'Moderate'
            : currentLocation?.airPollution?.list?.[0]?.main?.aqi === 4
            ? 'Poor'
            : currentLocation?.airPollution?.list?.[0]?.main?.aqi === 5
            ? 'Very Poor'
            : ''}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View>
            <Text>
              {currentLocation?.airPollution?.list?.[0]?.components?.[
                'pm2_5'
              ]?.toFixed(1)}
            </Text>
            <Text>PM2.5</Text>
          </View>
          <View>
            <Text>
              {currentLocation?.airPollution?.list?.[0]?.components?.[
                'pm10'
              ]?.toFixed(1)}
            </Text>
            <Text>PM10</Text>
          </View>
          <View>
            <Text>
              {currentLocation?.airPollution?.list?.[0]?.components?.[
                'so2'
              ]?.toFixed(1)}
            </Text>
            <Text>SO2</Text>
          </View>
          <View>
            <Text>
              {currentLocation?.airPollution?.list?.[0]?.components?.[
                'no2'
              ]?.toFixed(1)}
            </Text>
            <Text>NO2</Text>
          </View>
          <View>
            <Text>
              {currentLocation?.airPollution?.list?.[0]?.components?.[
                'o3'
              ]?.toFixed(1)}
            </Text>
            <Text>O3</Text>
          </View>
          <View>
            <Text>
              {currentLocation?.airPollution?.list?.[0]?.components?.co?.toFixed(
                1,
              )}
            </Text>
            <Text>CO</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AirQualityIndex;
