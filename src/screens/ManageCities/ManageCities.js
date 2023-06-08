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
      // const locationDetails = await axios.get('get-location-details', {
      //   params: {
      //     city: location,
      //     limit: 5,
      //     deviceId: null,
      //   },
      // });
      const locationDetails = {
        data: [
          {
            id: 'varanasi-uttar-pradesh-in',
            name: 'Varanasi',
            local_names: {
              ja: 'ワーラーナシー',
              eo: 'Varanasio',
              tr: 'Benâres',
              fa: 'وارانسی',
              es: 'Benarés',
              pa: 'ਵਾਰਾਣਸੀ',
              pl: 'Waranasi',
              ur: 'وارانسی',
              ml: 'വാരാണസി',
              te: 'వారణాసి',
              he: 'ואראנסי',
              ar: 'وارانسي',
              en: 'Varanasi',
              kn: 'ವಾರಾಣಸಿ',
              ta: 'வாரணாசி',
              oc: 'Benarès',
              ru: 'Варанаси',
              hi: 'वाराणसी',
            },
            lat: 25.3356491,
            lon: 83.0076292,
            country: 'IN',
            state: 'Uttar Pradesh',
          },
          {
            name: 'Varanasi',
            local_names: { ta: 'வாரணாசி', kn: 'ವಾರಣಾಸಿ' },
            lat: 13.0304962,
            lon: 77.6860657,
            country: 'IN',
            state: 'Karnataka',
          },
        ],
      };
      // console.log(locationDetails.data);
      if (
        locationDetails?.data &&
        Array.isArray(locationDetails?.data) &&
        locationDetails?.data?.length > 0
      ) {
        setSearchData(locationDetails.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddNewLocation = location => {
    dispatch(setTimeOfUpdate(new Date().getTime()));
    dispatch(addLocation(location));
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
        locationId: location?.id,
      }),
    );
    const airPollutionData = {
      coord: [50, 50],
      list: [
        {
          dt: 1605182400,
          main: {
            aqi: 4,
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
        locationId: location?.id,
      }),
    );
  };

  console.log(JSON.stringify(locations?.[0]?.id, null, 2));
  console.log(JSON.stringify(searchData?.[0]?.id, null, 2));

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
