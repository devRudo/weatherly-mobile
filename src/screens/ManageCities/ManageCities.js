import React, { useEffect, useState } from 'react';
import {
  Text,
  Dimensions,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useDispatch, useSelector } from 'react-redux';
import { CityCard } from '../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from '../../utils/axios';
import {
  addLocation,
  setCurrentLocationId,
  setTimeOfUpdate,
  updateWeatherData,
} from '../../redux/features/locations/locationsSlice';

const ManageCities = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  const { locations } = useSelector(state => state.locations);
  const [searchData, setSearchData] = useState([]);
  const [weatherDataForFirst, setWeatherDataForFirst] = useState(null);
  const { temperatureUnit } = useSelector(state => state.settings);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const searchLocation = async () => {
    try {
      const locationDetails = await axios.get('get-location-details', {
        params: {
          city: location,
          limit: 5,
          deviceId: null,
        },
      });
      // console.log(locationDetails.data);
      if (
        locationDetails?.data &&
        Array.isArray(locationDetails?.data) &&
        locationDetails?.data?.length > 0
      ) {
        setSearchData(
          locationDetails.data.map(location => {
            return {
              ...location,
              id: `${location?.name
                ?.toLowerCase()
                ?.split(' ')
                ?.join('-')}-${location?.state
                ?.toLowerCase()
                ?.split(' ')
                ?.join('-')}-${location?.country
                ?.toLowerCase()
                ?.split(' ')
                ?.join('-')}`,
            };
          }),
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddNewLocation = async location => {
    dispatch(setTimeOfUpdate(new Date().getTime()));
    console.log(JSON.stringify(location, null, 2));
    dispatch(
      addLocation({
        ...location,
        id: `${location?.name
          ?.toLowerCase()
          ?.split(' ')
          ?.join('-')}-${location?.state
          ?.toLowerCase()
          ?.split(' ')
          ?.join('-')}-${location?.country
          ?.toLowerCase()
          ?.split(' ')
          ?.join('-')}`,
      }),
    );
    try {
      const weatherData = await axios.get('get-weather-data', {
        params: {
          lat: location?.lat,
          lon: location?.lon,
        },
      });
      console.log('weatherData', JSON.stringify(weatherData?.data, null, 2));
      dispatch(
        updateWeatherData({
          key: 'weatherData',
          weatherData: weatherData?.data,
          locationId: location?.id,
        }),
      );
      try {
        const airPollutionData = await axios.get('get-air-pollution-data', {
          params: {
            lat: location?.lat,
            lon: location?.lon,
          },
        });
        console.log(
          'air pollution data',
          JSON.stringify(airPollutionData?.data, null, 2),
        );
        dispatch(
          updateWeatherData({
            key: 'airPollution',
            weatherData: airPollutionData?.data,
            locationId: location?.id,
          }),
        );
      } catch (e) {
        console.log('getAirPollutionDataForCurrentLocationError', e);
      }
    } catch (e) {
      console.log('getWeatherForCurrentLocationError', e);
    }
  };

  // console.log(JSON.stringify(locations?.[0]?.id, null, 2));
  // console.log(JSON.stringify(searchData?.[0]?.id, null, 2));

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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              value={location}
              placeholder="Enter location"
              onChangeText={text => setLocation(text)}
              style={{
                borderColor: isDarkMode ? '#f1f1f1' : '#343a40',
                borderWidth: 1,
                borderRadius: 2,
                paddingHorizontal: 15,
                paddingVertical: 3,
                flex: 1,
                marginRight: 10,
              }}
            />
            <Button title="submit" onPress={() => searchLocation()}></Button>
          </View>
          {searchData &&
            searchData.length > 0 &&
            searchData.map(lc => {
              return (
                <View
                  key={`${lc?.name}${lc?.state}${lc?.country}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                    paddingVertical: 20,
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        // fontWeight: 'bold',
                        // color: isDarkMode ? '#000' : '#fff',
                      }}>
                      {lc?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        // fontWeight: 'bold',
                        // color: isDarkMode ? '#000' : '#fff',
                      }}>
                      {`${lc?.state}, ${lc?.country}`}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      if (
                        locations?.find(location => location?.id === lc?.id) !==
                        undefined
                      ) {
                      } else {
                        handleAddNewLocation(lc);
                      }
                    }}
                    disabled={
                      locations?.find(location => location?.id === lc?.id) !==
                      undefined
                    }>
                    {locations?.find(location => location?.id === lc?.id) !==
                    undefined ? (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text>Added</Text>
                        <Icon name="chevron-right" size={14} />
                      </View>
                    ) : (
                      <Icon
                        name="plus"
                        size={24}
                        color={isDarkMode ? '#fff' : '#000'}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          {locations?.map(location => {
            return (
              <CityCard
                navigation={navigation}
                key={location?.id}
                id={location?.id}
                city={location?.name}
                aqi={
                  location?.airPollution?.list?.[0]?.main?.aqi === 1
                    ? 'Good'
                    : location?.airPollution?.list?.[0]?.main?.aqi === 2
                    ? 'Fair'
                    : location?.airPollution?.list?.[0]?.main?.aqi === 3
                    ? 'Moderate'
                    : location?.airPollution?.list?.[0]?.main?.aqi === 4
                    ? 'Poor'
                    : location?.airPollution?.list?.[0]?.main?.aqi === 5
                    ? 'Very Poor'
                    : ''
                }
                maxTemp={
                  temperatureUnit === 'C'
                    ? location?.weatherData?.daily?.[0]?.temp?.max?.toFixed(0)
                    : convertTemp(
                        location?.weatherData?.daily?.[0]?.temp?.max,
                        'C',
                        'F',
                      )
                }
                minTemp={
                  temperatureUnit === 'C'
                    ? location?.weatherData?.daily?.[0]?.temp?.min?.toFixed(0)
                    : convertTemp(
                        location?.weatherData?.daily?.[0]?.temp?.min,
                        'C',
                        'F',
                      )
                }
                currentTemp={
                  temperatureUnit === 'C'
                    ? location?.weatherData?.current?.temp?.toFixed(0)
                    : (
                        (location?.weatherData?.current?.temp?.toFixed(0) * 9) /
                          5 +
                        32
                      ).toFixed(0)
                }
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageCities;
