import React, { useState, useEffect, useRef } from 'react';
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
  Platform,
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
  setActiveLocationIndex,
  setCurrentLocationId,
  setTimeOfUpdate,
  updateWeatherData,
} from '../../redux/features/locations/locationsSlice';
import { updateSettings } from '../../redux/features/settings/settingsSlice';
import moment from 'moment';
import { convertTemp } from '../../utils';
import { HomePlaceholder } from '../../components';
import DeviceInfo from 'react-native-device-info';
import Swiper from 'react-native-swiper';

const Home = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [openTooltip, setOpenTooltip] = useState(false);
  const dispatch = useDispatch();
  const { locations, timeOfUpdate, currentLocationId, activeLocationIndex } =
    useSelector(state => state.locations);
  const {
    temperatureUnit,
    windSpeedUnit,
    pressureUnit,
    nightUpdates,
    soundEffects,
  } = useSelector(state => state.settings);

  const swiperRef = useRef();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentLocationIndex, setCurrenLocationIndex] = useState(
    activeLocationIndex !== undefined ? activeLocationIndex : 0,
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    color: '#fff',
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
    setCurrenLocationIndex(activeLocationIndex);
  }, [activeLocationIndex]);

  useEffect(() => {
    try {
      // console.log('coming');
      Geolocation.getCurrentPosition(
        async info => {
          // console.log('current position', info);
          try {
            // Set Current location latitude and longitude
            // Get Current location details from latitude and longitude (city, state, country)
            // Set Current location in locations
            // Get Todays weather report for current location
            // Get 5-days weather report for current location
            // Get 24 hour weather forecast for current location
            // Get Air pollution data for current location

            const locationData = await axios.get('get-rev-geo-loc-details', {
              params: {
                lat: info?.coords?.latitude,
                lon: info?.coords?.longitude,
              },
            });
            // console.log('current location data', JSON.stringify(locationData, null, 2));
            const locationDetail = {
              ...locationData?.data?.[0],
              id: `${locationData?.data?.[0]?.name
                ?.toLowerCase()
                ?.split(' ')
                ?.join('-')}-${locationData?.data?.[0]?.state
                ?.toLowerCase()
                ?.split(' ')
                ?.join('-')}-${locationData?.data?.[0]?.country
                ?.toLowerCase()
                ?.split(' ')
                ?.join('-')}`,
            };
            if (
              locations.find(
                location => location?.id === locationDetail?.id,
              ) === undefined &&
              new Date().getTime() - timeOfUpdate > 99999999999
            ) {
              dispatch(setTimeOfUpdate(new Date().getTime()));
              dispatch(addLocation(locationDetail));
              dispatch(
                setCurrentLocationId({ currentLocationId: locationDetail?.id }),
              );
              try {
                const weatherData = await axios.get('get-weather-data', {
                  params: {
                    lat: info?.coords?.latitude,
                    lon: info?.coords?.longitude,
                  },
                });
                // console.log(
                //   'weatherData',
                //   JSON.stringify(weatherData?.data, null, 2),
                // );
                dispatch(
                  updateWeatherData({
                    key: 'weatherData',
                    weatherData: weatherData?.data,
                    locationId: locationDetail?.id,
                  }),
                );
                try {
                  const airPollutionData = await axios.get(
                    'get-air-pollution-data',
                    {
                      params: {
                        lat: info?.coords?.latitude,
                        lon: info?.coords?.longitude,
                      },
                    },
                  );
                  // console.log(
                  //   'air pollution data',
                  //   JSON.stringify(airPollutionData?.data, null, 2),
                  // );
                  dispatch(
                    updateWeatherData({
                      key: 'airPollution',
                      weatherData: airPollutionData?.data,
                      locationId: locationDetail?.id,
                    }),
                  );
                } catch (e) {
                  console.log('getAirPollutionDataForCurrentLocationError', e);
                }
              } catch (e) {
                console.log('getWeatherForCurrentLocationError', e);
              }
            }
          } catch (e) {
            console.log('getLocationDetailError', e);
          }
        },
        () => {},
        {
          // enableHighAccuracy: true,
          timeout: 30000,
        },
      );
    } catch (e) {
      console.log('getCurrentLatLongError', e);
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

  // console.log('locations', locations.length);
  // // console.log(isDarkMode);
  // console.log('currentLocation', JSON.stringify(currentLocation, null, 2));
  // console.log(Platform.OS, DeviceInfo?.hasNotch());
  // console.log(currentLocationIndex);
  // console.log('activeLocationIndex', activeLocationIndex);

  return (
    <Swiper
      style={{}}
      showsButtons={false}
      index={currentLocationIndex}
      // ref={swiperRef}
      onMomentumScrollEnd={(e, state) => {
        dispatch(setActiveLocationIndex({ activeLocationIndex: state.index }));
        setCurrenLocationIndex(state.index);
      }}
      showsPagination={false}
      loop={false}>
      {locations && Array.isArray(locations) && locations.length > 0 ? (
        locations.map(location => (
          <ImageBackground
            key={location?.id}
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
                      top:
                        DeviceInfo?.hasNotch() && Platform.OS === 'ios'
                          ? 36
                          : 0,
                      left: 0,
                      width: '100%',
                      // backgroundColor: 'rgba(0,0,0,0.7)',
                      zIndex: 1,
                    }}>
                    <Icon
                      name="plus"
                      size={34}
                      color={'#f1f1f1'}
                      onPress={() => navigation.navigate('ManageCities')}
                    />
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#f1f1f1',
                        }}>
                        {location?.name}
                      </Text>
                      <View
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                        }}>
                        {locations?.map((location, index) =>
                          location?.id === currentLocationId ? (
                            <Icon
                              key={index}
                              name="navigation-variant"
                              size={14}
                              color={
                                index === currentLocationIndex
                                  ? '#f1f1f1'
                                  : '#a4a4a4'
                              }
                            />
                          ) : (
                            <Icon
                              key={index}
                              name="circle-medium"
                              size={14}
                              color={
                                index === currentLocationIndex
                                  ? '#f1f1f1'
                                  : '#a4a4a4'
                              }
                            />
                          ),
                        )}
                      </View>
                    </View>
                    <Icon
                      name="cog-outline"
                      size={34}
                      color={'#f1f1f1'}
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
                        height: Dimensions.get('window').height * 0.5,
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
                            ? locations?.[
                                currentLocationIndex
                              ]?.weatherData?.current?.temp?.toFixed(0)
                            : (
                                (locations?.[
                                  currentLocationIndex
                                ]?.weatherData?.current?.temp?.toFixed(0) *
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
                          locations?.[currentLocationIndex]?.weatherData
                            ?.current?.weather?.[0]?.main || ''
                        } ${
                          temperatureUnit === 'C'
                            ? locations?.[
                                currentLocationIndex
                              ]?.weatherData?.daily?.[0]?.temp?.max?.toFixed(0)
                            : convertTemp(
                                locations?.[currentLocationIndex]?.weatherData
                                  ?.daily?.[0]?.temp?.max,
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
                          style={{
                            fontSize: 24,
                            color: '#d3d3d3',
                            marginLeft: 5,
                          }}>
                          {temperatureUnit === 'C'
                            ? locations?.[
                                currentLocationIndex
                              ]?.weatherData?.daily?.[0]?.temp?.min?.toFixed(0)
                            : convertTemp(
                                locations?.[currentLocationIndex]?.weatherData
                                  ?.daily?.[0]?.temp?.min,
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
                          {locations?.[currentLocationIndex]?.airPollution
                            ?.list?.[0]?.main?.aqi === 1
                            ? 'Good'
                            : locations?.[currentLocationIndex]?.airPollution
                                ?.list?.[0]?.main?.aqi === 2
                            ? 'Fair'
                            : locations?.[currentLocationIndex]?.airPollution
                                ?.list?.[0]?.main?.aqi === 3
                            ? 'Moderate'
                            : locations?.[currentLocationIndex]?.airPollution
                                ?.list?.[0]?.main?.aqi === 4
                            ? 'Poor'
                            : locations?.[currentLocationIndex]?.airPollution
                                ?.list?.[0]?.main?.aqi === 5
                            ? 'Very Poor'
                            : ''}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        padding: 10,
                        flexDirection: 'column',
                        // width: Dimensions.get('window').width,
                        // height: Dimensions.get('window').height * 0.5,
                        justifyContent: 'flex-end',
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
                              <Text
                                style={{
                                  color: backgroundStyle.color,
                                }}>
                                North
                              </Text>
                              <Text
                                style={{
                                  color: backgroundStyle.color,
                                }}>
                                {windSpeedUnit === 'km/h'
                                  ? (
                                      locations?.[currentLocationIndex]
                                        ?.weatherData?.daily?.[0]?.wind_speed *
                                      3.6
                                    ).toFixed(2)
                                  : windSpeedUnit === 'm/s'
                                  ? locations?.[
                                      currentLocationIndex
                                    ]?.weatherData?.daily?.[0]?.wind_speed.toFixed(
                                      2,
                                    )
                                  : windSpeedUnit === 'mph'
                                  ? (
                                      locations?.[currentLocationIndex]
                                        ?.weatherData?.daily?.[0]?.wind_speed *
                                      2.2369
                                    ).toFixed(2)
                                  : windSpeedUnit === 'kn'
                                  ? (
                                      locations?.[currentLocationIndex]
                                        ?.weatherData?.daily?.[0]?.wind_speed *
                                      1.943844
                                    ).toFixed(2)
                                  : locations?.[
                                      currentLocationIndex
                                    ]?.weatherData?.daily?.[0]?.wind_speed.toFixed(
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
                              <Text
                                style={{
                                  alignSelf: 'center',
                                  color: backgroundStyle.color,
                                }}>
                                N
                              </Text>
                              <Text
                                style={{
                                  alignSelf: 'center',
                                  height: 10,
                                }}></Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <Text
                                  style={{
                                    color: backgroundStyle.color,
                                  }}>
                                  W
                                </Text>
                                <Text
                                  style={{
                                    color: backgroundStyle.color,
                                  }}>
                                  E
                                </Text>
                              </View>
                              <Text
                                style={{
                                  alignSelf: 'center',
                                  height: 10,
                                  color: backgroundStyle.color,
                                }}></Text>
                              <Text
                                style={{
                                  alignSelf: 'center',
                                  color: backgroundStyle.color,
                                }}>
                                S
                              </Text>
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
                                          locations?.[currentLocationIndex]
                                            ?.weatherData?.current?.wind_deg
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
                              <Text
                                style={{
                                  color: backgroundStyle.color,
                                }}>
                                {moment(
                                  locations?.[currentLocationIndex]?.weatherData
                                    ?.daily?.[0]?.sunrise * 1000,
                                ).format('hh:mm A')}
                              </Text>
                              <Text
                                style={{
                                  color: backgroundStyle.color,
                                }}>
                                {moment(
                                  locations?.[currentLocationIndex]?.weatherData
                                    ?.daily?.[0]?.sunset * 1000,
                                ).format('hh:mm A')}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  color: backgroundStyle.color,
                                }}>
                                Sunrise
                              </Text>
                              <Text
                                style={{
                                  color: backgroundStyle.color,
                                }}>
                                Sunset
                              </Text>
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
                            <Text
                              style={{
                                color: backgroundStyle.color,
                              }}>
                              Humidity
                            </Text>
                            <Text
                              style={{
                                color: backgroundStyle.color,
                              }}>
                              Real Feel
                            </Text>
                            <Text
                              style={{
                                color: backgroundStyle.color,
                              }}>
                              Clouds
                            </Text>
                            <Text
                              style={{
                                color: backgroundStyle.color,
                              }}>
                              Pressure
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              alignItems: 'flex-end',
                            }}>
                            <Text
                              style={{
                                color: backgroundStyle.color,
                              }}>
                              {
                                locations?.[currentLocationIndex]?.weatherData
                                  ?.current?.humidity
                              }
                              %
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                              <Text
                                style={{
                                  color: backgroundStyle.color,
                                }}>
                                {temperatureUnit === 'C'
                                  ? locations?.[
                                      currentLocationIndex
                                    ]?.weatherData?.current?.feels_like.toFixed(
                                      0,
                                    )
                                  : convertTemp(
                                      locations?.[currentLocationIndex]
                                        ?.weatherData?.current?.feels_like,
                                      'C',
                                      'F',
                                    )}
                              </Text>
                              <Text
                                style={{
                                  lineHeight: 12,
                                  color: backgroundStyle.color,
                                }}>
                                o
                              </Text>
                            </View>
                            <Text
                              style={{
                                color: backgroundStyle.color,
                              }}>
                              {
                                locations?.[currentLocationIndex]?.weatherData
                                  ?.current?.clouds
                              }
                              %
                            </Text>
                            <Text
                              style={{
                                color: backgroundStyle.color,
                              }}>
                              {pressureUnit === 'mbar' || pressureUnit === 'hpa'
                                ? locations?.[currentLocationIndex]?.weatherData
                                    ?.current?.pressure
                                : pressureUnit === 'mmhg'
                                ? (
                                    locations?.[currentLocationIndex]
                                      ?.weatherData?.current?.pressure *
                                    0.750062
                                  ).toFixed(0)
                                : pressureUnit === 'inhg'
                                ? (
                                    locations?.[currentLocationIndex]
                                      ?.weatherData?.current?.pressure * 0.02953
                                  ).toFixed(0)
                                : pressureUnit === 'atm'
                                ? (
                                    locations?.[currentLocationIndex]
                                      ?.weatherData?.current?.pressure *
                                    0.000986923
                                  ).toFixed(2)
                                : locations?.[currentLocationIndex]?.weatherData
                                    ?.current?.pressure}{' '}
                              {pressureUnit}
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
                            {locations?.[currentLocationIndex]?.airPollution
                              ?.list?.[0]?.main?.aqi === 1
                              ? 'Good'
                              : locations?.[currentLocationIndex]?.airPollution
                                  ?.list?.[0]?.main?.aqi === 2
                              ? 'Fair'
                              : locations?.[currentLocationIndex]?.airPollution
                                  ?.list?.[0]?.main?.aqi === 3
                              ? 'Moderate'
                              : locations?.[currentLocationIndex]?.airPollution
                                  ?.list?.[0]?.main?.aqi === 4
                              ? 'Poor'
                              : locations?.[currentLocationIndex]?.airPollution
                                  ?.list?.[0]?.main?.aqi === 5
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
                            alignItems: 'flex-end',
                          }}>
                          <Text style={{ color: '#fff', fontSize: 10 }}>
                            Data provided by
                          </Text>
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
                <HomePlaceholder navigation={navigation} />
              )}
            </SafeAreaView>
          </ImageBackground>
        ))
      ) : (
        <View></View>
      )}
    </Swiper>
  );
};

const styles = StyleSheet.create({});

export default Home;
