import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Linking,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Tooltip from 'react-native-walkthrough-tooltip';
import Geolocation from '@react-native-community/geolocation';
import axios from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUniqueId } from 'react-native-device-info';
import {
  addLocation,
  setCurrentLocationId,
  setTimeOfUpdate,
  updateWeatherData,
} from '../../redux/features/locations/locationsSlice';
import { updateSettings } from '../../redux/features/settings/settingsSlice';
import moment from 'moment';
import { convertTemp } from '../../utils';
import { HomePlaceholder } from '../../components';

const Home = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [openTooltip, setOpenTooltip] = useState(false);
  const dispatch = useDispatch();
  const { locations, timeOfUpdate, currentLocationId } = useSelector(
    state => state.locations,
  );
  const {
    temperatureUnit,
    windSpeedUnit,
    pressureUnit,
    nightUpdates,
    soundEffects,
  } = useSelector(state => state.settings);

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

  useEffect(() => {
    try {
      Geolocation.getCurrentPosition(
        async info => {
          // console.log(info);
          try {
            // Set Current location latitude and longitude
            // Get Current location details from latitude and longitude (city, state, country)
            // Set Current location in locations
            // Get Todays weather report for current location
            // Get 5-days weather report for current location
            // Get 24 hour weather forecast for current location
            // Get Air pollution data for current location

            // const locationData = await axios.get('get-rev-geo-loc-details', {
            //   params: {
            //     lat: info?.coords?.latitude,
            //     lon: info?.coords?.longitude,
            //   },
            // });
            // console.log(locationData);
            // dispatch(addLocation(locationData.data[0]))

            const locationDetail = {
              id: 'varanasi-uttar-pradesh-in',
              name: 'Varanasi',
              local_names: {
                ur: 'وارانسی',
                eo: 'Varanasio',
                pl: 'Waranasi',
                ta: 'வாரணாசி',
                ar: 'وارانسي',
                oc: 'Benarès',
                hi: 'वाराणसी',
                kn: 'ವಾರಾಣಸಿ',
                ml: 'വാരാണസി',
                ru: 'Варанаси',
                es: 'Benarés',
                ja: 'ワーラーナシー',
                fa: 'وارانسی',
                tr: 'Benâres',
                en: 'Varanasi',
                pa: 'ਵਾਰਾਣਸੀ',
                he: 'ואראנסי',
                te: 'వారణాసి',
              },
              lat: 25.3356491,
              lon: 83.0076292,
              country: 'IN',
              state: 'Uttar Pradesh',
            };
            if (
              locations.find(
                location => location?.id === locationDetail?.id,
              ) === undefined &&
              new Date().getTime() - timeOfUpdate > 600000
            ) {
              dispatch(setTimeOfUpdate(new Date().getTime()));
              dispatch(addLocation(locationDetail));
              dispatch(
                setCurrentLocationId({ currentLocationId: locationDetail?.id }),
              );
              const weatherData = {
                lat: 25.4113,
                lon: 82.9907,
                timezone: 'Asia/Kolkata',
                timezone_offset: 19800,
                current: {
                  dt: 1678888086,
                  sunrise: 1678840679,
                  sunset: 1678883785,
                  temp: 27.03,
                  feels_like: 27.91,
                  pressure: 1008,
                  humidity: 57,
                  dew_point: 17.79,
                  uvi: 0,
                  clouds: 57,
                  visibility: 3000,
                  wind_speed: 0.51,
                  wind_deg: 0,
                  weather: [
                    {
                      id: 721,
                      main: 'Haze',
                      description: 'haze',
                      icon: '50n',
                    },
                  ],
                },
                daily: [
                  {
                    dt: 1678861800,
                    sunrise: 1678840679,
                    sunset: 1678883785,
                    moonrise: 1678821120,
                    moonset: 1678858980,
                    moon_phase: 0.75,
                    temp: {
                      day: 35.36,
                      min: 20.21,
                      max: 36.87,
                      night: 24.97,
                      eve: 29.69,
                      morn: 20.33,
                    },
                    feels_like: {
                      day: 32.79,
                      night: 24.2,
                      eve: 29.23,
                      morn: 19.2,
                    },
                    pressure: 1010,
                    humidity: 13,
                    dew_point: 3.41,
                    wind_speed: 4.5,
                    wind_deg: 301,
                    wind_gust: 6.26,
                    weather: [
                      {
                        id: 800,
                        main: 'Clear',
                        description: 'clear sky',
                        icon: '01d',
                      },
                    ],
                    clouds: 7,
                    pop: 0,
                    uvi: 9.2,
                  },
                  {
                    dt: 1678948200,
                    sunrise: 1678927017,
                    sunset: 1678970212,
                    moonrise: 1678911360,
                    moonset: 1678949040,
                    moon_phase: 0.79,
                    temp: {
                      day: 35.76,
                      min: 23.13,
                      max: 37.84,
                      night: 25.96,
                      eve: 34.49,
                      morn: 23.13,
                    },
                    feels_like: {
                      day: 32.98,
                      night: 25.96,
                      eve: 31.97,
                      morn: 22.02,
                    },
                    pressure: 1010,
                    humidity: 9,
                    dew_point: -1.65,
                    wind_speed: 6.17,
                    wind_deg: 262,
                    wind_gust: 12.49,
                    weather: [
                      {
                        id: 804,
                        main: 'Clouds',
                        description: 'overcast clouds',
                        icon: '04d',
                      },
                    ],
                    clouds: 100,
                    pop: 0,
                    uvi: 7.29,
                  },
                  {
                    dt: 1679034600,
                    sunrise: 1679013354,
                    sunset: 1679056640,
                    moonrise: 1679001360,
                    moonset: 1679039520,
                    moon_phase: 0.83,
                    temp: {
                      day: 32.25,
                      min: 21.59,
                      max: 34.43,
                      night: 21.59,
                      eve: 25.29,
                      morn: 24.47,
                    },
                    feels_like: {
                      day: 30.58,
                      night: 21.53,
                      eve: 25.18,
                      morn: 23.94,
                    },
                    pressure: 1011,
                    humidity: 25,
                    dew_point: 10.04,
                    wind_speed: 4.26,
                    wind_deg: 280,
                    wind_gust: 6.42,
                    weather: [
                      {
                        id: 500,
                        main: 'Rain',
                        description: 'light rain',
                        icon: '10d',
                      },
                    ],
                    clouds: 96,
                    pop: 0.88,
                    rain: 1.75,
                    uvi: 6.75,
                  },
                  {
                    dt: 1679121000,
                    sunrise: 1679099691,
                    sunset: 1679143067,
                    moonrise: 1679091060,
                    moonset: 1679130060,
                    moon_phase: 0.87,
                    temp: {
                      day: 31.58,
                      min: 18.58,
                      max: 34.44,
                      night: 23.58,
                      eve: 32.99,
                      morn: 18.58,
                    },
                    feels_like: {
                      day: 30.35,
                      night: 23.04,
                      eve: 30.93,
                      morn: 18.56,
                    },
                    pressure: 1010,
                    humidity: 30,
                    dew_point: 12.27,
                    wind_speed: 3.22,
                    wind_deg: 176,
                    wind_gust: 5.75,
                    weather: [
                      {
                        id: 500,
                        main: 'Rain',
                        description: 'light rain',
                        icon: '10d',
                      },
                    ],
                    clouds: 40,
                    pop: 0.42,
                    rain: 0.53,
                    uvi: 9.02,
                  },
                  {
                    dt: 1679207400,
                    sunrise: 1679186027,
                    sunset: 1679229493,
                    moonrise: 1679180280,
                    moonset: 1679220660,
                    moon_phase: 0.91,
                    temp: {
                      day: 31.25,
                      min: 20.24,
                      max: 32.59,
                      night: 21.89,
                      eve: 30.87,
                      morn: 20.24,
                    },
                    feels_like: {
                      day: 29.81,
                      night: 21.65,
                      eve: 29.36,
                      morn: 19.89,
                    },
                    pressure: 1010,
                    humidity: 28,
                    dew_point: 10.8,
                    wind_speed: 3.84,
                    wind_deg: 97,
                    wind_gust: 5.53,
                    weather: [
                      {
                        id: 500,
                        main: 'Rain',
                        description: 'light rain',
                        icon: '10d',
                      },
                    ],
                    clouds: 100,
                    pop: 0.57,
                    rain: 0.48,
                    uvi: 5.55,
                  },
                  {
                    dt: 1679293800,
                    sunrise: 1679272364,
                    sunset: 1679315920,
                    moonrise: 1679269260,
                    moonset: 1679311020,
                    moon_phase: 0.94,
                    temp: {
                      day: 30.65,
                      min: 20.05,
                      max: 33.31,
                      night: 22.17,
                      eve: 29.28,
                      morn: 20.05,
                    },
                    feels_like: {
                      day: 29.56,
                      night: 22.04,
                      eve: 28.31,
                      morn: 19.91,
                    },
                    pressure: 1009,
                    humidity: 32,
                    dew_point: 12.02,
                    wind_speed: 4.56,
                    wind_deg: 249,
                    wind_gust: 6.22,
                    weather: [
                      {
                        id: 500,
                        main: 'Rain',
                        description: 'light rain',
                        icon: '10d',
                      },
                    ],
                    clouds: 98,
                    pop: 0.74,
                    rain: 2.51,
                    uvi: 6,
                  },
                  {
                    dt: 1679380200,
                    sunrise: 1679358700,
                    sunset: 1679402346,
                    moonrise: 1679358000,
                    moonset: 1679401320,
                    moon_phase: 0,
                    temp: {
                      day: 28.67,
                      min: 19.46,
                      max: 32.18,
                      night: 19.46,
                      eve: 30.87,
                      morn: 19.56,
                    },
                    feels_like: {
                      day: 28.28,
                      night: 19.6,
                      eve: 29.51,
                      morn: 19.58,
                    },
                    pressure: 1009,
                    humidity: 40,
                    dew_point: 13.93,
                    wind_speed: 5.01,
                    wind_deg: 327,
                    wind_gust: 9.67,
                    weather: [
                      {
                        id: 500,
                        main: 'Rain',
                        description: 'light rain',
                        icon: '10d',
                      },
                    ],
                    clouds: 91,
                    pop: 1,
                    rain: 5.32,
                    uvi: 6,
                  },
                  {
                    dt: 1679466600,
                    sunrise: 1679445036,
                    sunset: 1679488773,
                    moonrise: 1679446500,
                    moonset: 1679491500,
                    moon_phase: 0.02,
                    temp: {
                      day: 29.65,
                      min: 18.98,
                      max: 32.65,
                      night: 23.97,
                      eve: 30.88,
                      morn: 18.98,
                    },
                    feels_like: {
                      day: 29,
                      night: 23.49,
                      eve: 29.29,
                      morn: 19.15,
                    },
                    pressure: 1010,
                    humidity: 37,
                    dew_point: 13.53,
                    wind_speed: 4.2,
                    wind_deg: 331,
                    wind_gust: 5.47,
                    weather: [
                      {
                        id: 802,
                        main: 'Clouds',
                        description: 'scattered clouds',
                        icon: '03d',
                      },
                    ],
                    clouds: 33,
                    pop: 0.12,
                    uvi: 6,
                  },
                ],
              };
              dispatch(
                updateWeatherData({
                  key: 'weatherData',
                  weatherData: weatherData,
                  locationId: locationDetail?.id,
                }),
              );
              const airPollutionData = {
                coord: [50, 50],
                list: [
                  {
                    dt: 1605182400,
                    main: {
                      aqi: 1,
                    },
                    components: {
                      co: 201.94053649902344,
                      no: 0.01877197064459324,
                      no2: 0.7711350917816162,
                      o3: 68.66455078125,
                      so2: 0.6407499313354492,
                      pm2_5: 0.5,
                      pm10: 0.540438711643219,
                      nh3: 0.12369127571582794,
                    },
                  },
                ],
              };
              dispatch(
                updateWeatherData({
                  key: 'airPollution',
                  weatherData: airPollutionData,
                  locationId: locationDetail?.id,
                }),
              );
            }
          } catch (e) {
            console.log(e);
          }
        },
        () => {},
        {
          enableHighAccuracy: true,
        },
      );
    } catch (e) {
      console.log(e);
    }
    getUniqueId()
      .then(uId => {
        dispatch(
          updateSettings({
            key: 'deviceId',
            value: uId,
          }),
        );
      })
      .catch(err => console.log(err));

    return () => {};
  }, []);

  // console.log(locations);
  // console.log(isDarkMode);
  // console.log('currentLocation', currentLocation);

  return (
    <ImageBackground
      source={require('../../assets/img/bg.jpg')}
      resizeMode="cover"
      style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        {currentLocation ? (
          <>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                backgroundColor: backgroundStyle.backgroundColor,
                zIndex: 1,
              }}>
              <Icon
                name="plus"
                size={34}
                color={isDarkMode ? '#fff' : '#000'}
                onPress={() => navigation.navigate('ManageCities')}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: isDarkMode ? '#fff' : '#000',
                }}>
                {currentLocation?.name}
              </Text>
              <Icon
                name="cog-outline"
                size={34}
                color={isDarkMode ? '#fff' : '#000'}
                onPress={() => navigation.navigate('Settings')}
              />
            </View>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={{}}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height * 0.6,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 80,
                      fontWeight: 'bold',
                      color: '#d3d3d3',
                    }}>
                    {temperatureUnit === 'C'
                      ? currentLocation?.weatherData?.current?.temp?.toFixed(0)
                      : (
                          (currentLocation?.weatherData?.current?.temp?.toFixed(
                            0,
                          ) *
                            9) /
                            5 +
                          32
                        ).toFixed(0)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 24,
                      lineHeight: 50,
                      fontWeight: 'bold',
                      color: '#d3d3d3',
                    }}>
                    o
                  </Text>
                  <Text
                    style={{
                      fontSize: 30,
                      lineHeight: 50,
                      fontWeight: 'bold',
                      marginLeft: 5,
                      color: '#d3d3d3',
                    }}>
                    {temperatureUnit}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 24, color: '#d3d3d3' }}>{`${
                    currentLocation?.weatherData?.current?.weather?.[0]?.main ||
                    ''
                  } ${
                    temperatureUnit === 'C'
                      ? currentLocation?.weatherData?.daily?.[0]?.temp?.max?.toFixed(
                          0,
                        )
                      : convertTemp(
                          currentLocation?.weatherData?.daily?.[0]?.temp?.max,
                          'C',
                          'F',
                        )
                  }`}</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 16,
                      fontWeight: 'bold',
                      color: '#d3d3d3',
                    }}>
                    o
                  </Text>
                  <Text
                    style={{
                      fontSize: 24,
                      marginLeft: 5,
                      color: '#d3d3d3',
                    }}>
                    /
                  </Text>
                  <Text
                    style={{ fontSize: 24, color: '#d3d3d3', marginLeft: 5 }}>
                    {temperatureUnit === 'C'
                      ? currentLocation?.weatherData?.daily?.[0]?.temp?.min?.toFixed(
                          0,
                        )
                      : convertTemp(
                          currentLocation?.weatherData?.daily?.[0]?.temp?.min,
                          'C',
                          'F',
                        )}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 16,
                      fontWeight: 'bold',
                      color: '#d3d3d3',
                    }}>
                    o
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    marginTop: 20,
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderRadius: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="face-mask-outline"
                    size={22}
                    color="#d3d3d3"></Icon>
                  <Text style={{ color: '#d3d3d3', marginLeft: 10 }}>
                    AQI{' '}
                    {currentLocation?.airPollution?.list?.[0]?.main?.aqi === 1
                      ? 'Good'
                      : currentLocation?.airPollution?.list?.[0]?.main?.aqi ===
                        2
                      ? 'Fair'
                      : currentLocation?.airPollution?.list?.[0]?.main?.aqi ===
                        3
                      ? 'Moderate'
                      : currentLocation?.airPollution?.list?.[0]?.main?.aqi ===
                        4
                      ? 'Poor'
                      : currentLocation?.airPollution?.list?.[0]?.main?.aqi ===
                        5
                      ? 'Very Poor'
                      : ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  padding: 10,
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    marginTop: 8,
                    flexDirection: 'row',
                    gap: 8,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      gap: 8,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        borderRadius: 15,
                        padding: 15,
                        flex: 1,
                      }}>
                      <View>
                        <Text>North</Text>
                        <Text>
                          {windSpeedUnit === 'km/h'
                            ? (
                                currentLocation?.weatherData?.daily?.[0]
                                  ?.wind_speed * 3.6
                              ).toFixed(2)
                            : windSpeedUnit === 'm/s'
                            ? currentLocation?.weatherData?.daily?.[0]?.wind_speed.toFixed(
                                2,
                              )
                            : windSpeedUnit === 'mph'
                            ? (
                                currentLocation?.weatherData?.daily?.[0]
                                  ?.wind_speed * 2.2369
                              ).toFixed(2)
                            : windSpeedUnit === 'kn'
                            ? (
                                currentLocation?.weatherData?.daily?.[0]
                                  ?.wind_speed * 1.943844
                              ).toFixed(2)
                            : currentLocation?.weatherData?.daily?.[0]?.wind_speed.toFixed(
                                2,
                              )}{' '}
                          {windSpeedUnit}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 40,
                          borderWidth: 1,
                          borderColor: '#a3a3a3',
                          justifyContent: 'center',
                          padding: 5,
                          position: 'relative',
                        }}>
                        <Text style={{ alignSelf: 'center' }}>N</Text>
                        <Text
                          style={{ alignSelf: 'center', height: 10 }}></Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text>W</Text>
                          <Text>E</Text>
                        </View>
                        <Text
                          style={{ alignSelf: 'center', height: 10 }}></Text>
                        <Text style={{ alignSelf: 'center' }}>S</Text>
                        <View
                          style={{
                            width: 80,
                            height: 80,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Icon
                            name="arrow-projectile"
                            color={'#fff'}
                            size={36}
                            style={{
                              transform: [
                                {
                                  rotate: `${
                                    -45 +
                                    currentLocation?.weatherData?.current
                                      ?.wind_deg
                                  }deg`,
                                },
                              ],
                            }}></Icon>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        borderRadius: 15,
                        padding: 15,
                        flex: 1,
                      }}>
                      <View>
                        <Text>
                          {moment(
                            currentLocation?.weatherData?.daily?.[0]?.sunrise *
                              1000,
                          ).format('hh:mm A')}
                        </Text>
                        <Text>
                          {moment(
                            currentLocation?.weatherData?.daily?.[0]?.sunset *
                              1000,
                          ).format('hh:mm A')}
                        </Text>
                      </View>
                      <View>
                        <Text>Sunrise</Text>
                        <Text>Sunset</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      // alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      borderRadius: 15,
                      padding: 15,
                      flex: 1,
                    }}>
                    <View style={{ justifyContent: 'space-between' }}>
                      <Text>Humidity</Text>
                      <Text>Real Feel</Text>
                      <Text>Clouds</Text>
                      <Text>Pressure</Text>
                      <Text>Chance of rain</Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                      }}>
                      <Text>
                        {currentLocation?.weatherData?.current?.humidity}%
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text>
                          {temperatureUnit === 'C'
                            ? currentLocation?.weatherData?.current?.feels_like.toFixed(
                                0,
                              )
                            : convertTemp(
                                currentLocation?.weatherData?.current
                                  ?.feels_like,
                                'C',
                                'F',
                              )}
                        </Text>
                        <Text
                          style={{
                            lineHeight: 12,
                          }}>
                          o
                        </Text>
                      </View>
                      <Text>
                        {currentLocation?.weatherData?.current?.clouds}%
                      </Text>
                      <Text>
                        {pressureUnit === 'mbar' || pressureUnit === 'hpa'
                          ? currentLocation?.weatherData?.current?.pressure
                          : pressureUnit === 'mmhg'
                          ? (
                              currentLocation?.weatherData?.current?.pressure *
                              0.750062
                            ).toFixed(0)
                          : pressureUnit === 'inhg'
                          ? (
                              currentLocation?.weatherData?.current?.pressure *
                              0.02953
                            ).toFixed(0)
                          : pressureUnit === 'atm'
                          ? (
                              currentLocation?.weatherData?.current?.pressure *
                              0.000986923
                            ).toFixed(2)
                          : currentLocation?.weatherData?.current
                              ?.pressure}{' '}
                        {pressureUnit}
                      </Text>
                      <Text>
                        {currentLocation?.weatherData?.current?.rain || 0}%
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    // height: 300,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    borderRadius: 15,
                    padding: 20,
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon name="leaf" size={22} color="#fff"></Icon>
                    <Text style={{ color: '#fff', marginLeft: 10 }}>
                      AQI{' '}
                      {currentLocation?.airPollution?.list?.[0]?.main?.aqi === 1
                        ? 'Good'
                        : currentLocation?.airPollution?.list?.[0]?.main
                            ?.aqi === 2
                        ? 'Fair'
                        : currentLocation?.airPollution?.list?.[0]?.main
                            ?.aqi === 3
                        ? 'Moderate'
                        : currentLocation?.airPollution?.list?.[0]?.main
                            ?.aqi === 4
                        ? 'Poor'
                        : currentLocation?.airPollution?.list?.[0]?.main
                            ?.aqi === 5
                        ? 'Very Poor'
                        : ''}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AirQualityIndex')}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#d3d3d3',
                        fontSize: 14,
                        marginLeft: 10,
                      }}>
                      Full air quality forecast
                    </Text>
                    <Icon
                      name="menu-right"
                      size={18}
                      color="#a3a3a3"
                      style={{}}></Icon>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginTop: 8,
                    padding: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text>Data provided by</Text>
                    <Image
                      source={require('../../assets/img/open_weather_logo.png')}
                      resizeMode="contain"
                      style={{ width: 60, height: 30, marginLeft: 10 }}
                    />
                  </View>
                  <Tooltip
                    isVisible={openTooltip}
                    content={
                      <Text
                        style={{ color: '#000' }}
                        onPress={() =>
                          Linking.openURL(
                            'https://www.freepik.com/free-vector/realistic-clouds-with-falling-rain_18309129.htm#page=6&query=vector%20weather&position=10&from_view=search&track=robertav1',
                          )
                        }>
                        Background Image by starline on Freepik
                      </Text>
                    }
                    placement="top"
                    onClose={() => setOpenTooltip(false)}>
                    <TouchableHighlight
                      onPress={() => setOpenTooltip(true)}
                      style={{ alignSelf: 'flex-start' }}>
                      <Icon
                        name="information"
                        color={'#d3d3d3'}
                        size={24}></Icon>
                    </TouchableHighlight>
                  </Tooltip>
                </View>
              </View>
            </ScrollView>
          </>
        ) : (
          <HomePlaceholder />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({});

export default Home;
