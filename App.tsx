/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
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

import {LineChart} from 'react-native-chart-kit';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Tooltip from 'react-native-walkthrough-tooltip';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [openTooltip, setOpenTooltip] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <ImageBackground
        source={require('./src/assets/img/bg.jpg')}
        resizeMode="cover"
        style={{flex: 1}}>
        <SafeAreaView
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
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
            <Icon name="plus" size={34} color={isDarkMode ? '#fff' : '#000'} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: isDarkMode ? '#fff' : '#000',
              }}>
              Varanasi
            </Text>
            <Icon
              name="cog-outline"
              size={34}
              color={isDarkMode ? '#fff' : '#000'}
            />
          </View>
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}>
            <View
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height * 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{fontSize: 80, fontWeight: 'bold', color: '#d3d3d3'}}>
                  19
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
                  C
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 24, color: '#d3d3d3'}}>Haze 32</Text>
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
                <Text style={{fontSize: 24, color: '#d3d3d3', marginLeft: 5}}>
                  14
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
                <Icon name="face-mask-outline" size={22} color="#d3d3d3"></Icon>
                <Text style={{color: '#d3d3d3', marginLeft: 10}}>AQI 169</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                padding: 10,
                flexDirection: 'column',
              }}>
              <View
                style={{
                  width: '100%',
                  // height: 300,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  borderRadius: 15,
                  padding: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="calendar"
                      size={12}
                      color="#a3a3a3"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        borderRadius: 12,
                        padding: 4,
                      }}></Icon>
                    <Text style={{marginLeft: 10, color: '#a3a3a3'}}>
                      5-day forecast
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#a3a3a3'}}>More details</Text>
                    <Icon
                      name="menu-right"
                      size={18}
                      color="#a3a3a3"
                      style={{}}></Icon>
                  </View>
                </View>
                {[
                  {
                    text1: 'Today Cloudy',
                    low: -2,
                    high: 11,
                    iconName: 'weather-partly-cloudy',
                  },
                  {
                    text1: 'Tomorrow Rain and snow mixed',
                    low: -3,
                    high: 8,
                    iconName: 'weather-partly-rainy',
                  },
                  {
                    text1: 'Mon Rain and snow mixed',
                    low: -2,
                    high: 8,
                    iconName: 'weather-partly-rainy',
                  },
                ].map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 20,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon
                        name={item.iconName}
                        size={24}
                        color="#fff"
                        style={{}}></Icon>
                      <Text
                        style={{marginLeft: 10, color: '#fff', fontSize: 18}}>
                        {item.text1}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#fff', fontSize: 16}}>
                          {item.high}
                        </Text>
                        <Text
                          style={{
                            fontSize: 8,
                            lineHeight: 12,
                            fontWeight: 'bold',
                            color: '#fff',
                          }}>
                          o
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            marginLeft: 5,
                            marginRight: 5,
                            color: '#fff',
                          }}>
                          /
                        </Text>
                        <Text style={{fontSize: 16, color: '#fff'}}>
                          {item.low}
                        </Text>
                        <Text
                          style={{
                            fontSize: 8,
                            lineHeight: 12,
                            fontWeight: 'bold',
                            color: '#fff',
                          }}>
                          o
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                    marginTop: 30,
                  }}>
                  <Text
                    style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
                    5-day forecast
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  // height: 300,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  borderRadius: 15,
                  padding: 15,
                  marginTop: 8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="clock-time-nine"
                      size={20}
                      color="rgba(255,255,255,0.2)"
                      style={{}}></Icon>
                    <Text style={{marginLeft: 10, color: '#a3a3a3'}}>
                      24-hour forecast
                    </Text>
                  </View>
                  {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#a3a3a3'}}>More details</Text>
                    <Icon
                      name="menu-right"
                      size={18}
                      color="#a3a3a3"
                      style={{}}></Icon>
                  </View> */}
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{marginTop: 20}}>
                  <LineChart
                    data={{
                      labels: [
                        'Now',
                        '12:00',
                        '13:00',
                        '14:00',
                        '15:00',
                        '16:00',
                        '17:00',
                        '18:00',
                        '19:00',
                        '20:00',
                        '21:00',
                        '22:00',
                        '23:00',
                        '24:00',
                        '00:00',
                        '01:00',
                        '02:00',
                        '03:00',
                        '04:00',
                        '05:00',
                        '06:00',
                        '07:00',
                        '08:00',
                        '09:00',
                        '10:00',
                        '11:00',
                      ],
                      datasets: [
                        {
                          data: [
                            8, 10, 11, 13, 11, 10, 9, 12, 8, 8, 6, 4, 3, 4, 3,
                            0, 0, -2, -2, -3, 0, 2, 3, 3, 4, 5, 6, 5, 6, 7, 9,
                            11, 11,
                          ],
                        },
                      ],
                    }}
                    width={Dimensions.get('window').width * 5} // from react-native
                    height={220}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      backgroundGradientFromOpacity: 0,
                      backgroundGradientToOpacity: 0,
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `green`,
                      labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                      propsForDots: {
                        r: '3',
                        fill: '#fff',
                      },
                    }}
                    bezier
                    style={{}}
                  />
                </ScrollView>
              </View>
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
                      <Text>5.8 km/h</Text>
                    </View>
                    <View
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: 45,
                        borderWidth: 1,
                        borderColor: '#a3a3a3',
                        justifyContent: 'center',
                        padding: 5,
                        position: 'relative',
                      }}>
                      <Text style={{alignSelf: 'center'}}>N</Text>
                      <Text style={{alignSelf: 'center'}}></Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text>W</Text>
                        <Text>E</Text>
                      </View>
                      <Text style={{alignSelf: 'center'}}></Text>
                      <Text style={{alignSelf: 'center'}}>S</Text>
                      <View
                        style={{
                          width: 90,
                          height: 90,
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon
                          name="arrow-projectile"
                          color={'#fff'}
                          size={45}
                          style={{transform: [{rotate: '130deg'}]}}></Icon>
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
                      <Text>06:54</Text>
                      <Text>18:15</Text>
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
                  <View style={{justifyContent: 'space-between'}}>
                    <Text>Humidity</Text>
                    <Text>Real Feel</Text>
                    <Text>UV</Text>
                    <Text>Pressure</Text>
                    <Text>Chance of rain</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text>30%</Text>
                    <Text>8o</Text>
                    <Text>5</Text>
                    <Text>1038mbar</Text>
                    <Text>0%</Text>
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
                  <Text style={{color: '#fff', marginLeft: 10}}>AQI 169</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: '#d3d3d3', fontSize: 14, marginLeft: 10}}>
                    Full air quality forecast
                  </Text>
                  <Icon
                    name="menu-right"
                    size={18}
                    color="#a3a3a3"
                    style={{}}></Icon>
                </View>
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
                    source={require('./src/assets/img/open_weather_logo.png')}
                    resizeMode="contain"
                    style={{width: 60, height: 30, marginLeft: 20}}
                  />
                </View>
                <Tooltip
                  isVisible={openTooltip}
                  content={
                    <Text
                      style={{color: '#000'}}
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
                    style={{alignSelf: 'flex-start'}}>
                    <Icon name="information" color={'#d3d3d3'} size={24}></Icon>
                  </TouchableHighlight>
                </Tooltip>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
{
  /* <a href="https://www.freepik.com/free-vector/realistic-clouds-with-falling-rain_18309129.htm#page=6&query=vector%20weather&position=10&from_view=search&track=robertav1">Image by starline</a> on Freepik */
}
