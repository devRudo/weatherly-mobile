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
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Tooltip from 'react-native-walkthrough-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import {
  Fade,
  Loader,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Shine,
  ShineOverlay,
} from 'rn-placeholder';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const HomePlaceholder = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [openTooltip, setOpenTooltip] = useState(false);
  const {
    temperatureUnit,
    windSpeedUnit,
    pressureUnit,
    nightUpdates,
    soundEffects,
  } = useSelector(state => state.settings);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
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
        <View style={{ flex: 1, marginLeft: 120 }}>
          <Placeholder
            Animation={props => (
              <Shine {...props} style={{ backgroundColor: '#343a40' }} />
            )}>
            <PlaceholderLine width={50} height={2} />
          </Placeholder>
        </View>
        <Icon
          name="cog-outline"
          size={34}
          color={isDarkMode ? '#fff' : '#000'}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          minHeight: Dimensions.get('window').height,
        }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            display: 'flex',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height * 0.6,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <Placeholder
            Animation={props => (
              <Shine {...props} style={{ backgroundColor: '#343a40' }} />
            )}
            style={{
              display: 'flex',
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height * 0.6,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <PlaceholderMedia
              style={[
                {
                  width: responsiveWidth(25),
                  height: responsiveHeight(10),
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  marginLeft:
                    Dimensions.get('window').width / 2 -
                    responsiveWidth(25) / 2,
                },
              ]}
            />
            <PlaceholderLine
              width={responsiveWidth(8)}
              height={10}
              style={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                marginTop: 20,
                marginLeft:
                  Dimensions.get('window').width / 2 - responsiveWidth(17),
              }}
            />
          </Placeholder>
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
              <Placeholder
                Animation={props => (
                  <Shine {...props} style={{ backgroundColor: '#343a40' }} />
                )}>
                <PlaceholderMedia
                  style={[
                    {
                      width: '100%',
                      height: responsiveHeight(10),
                      backgroundColor: 'rgba(0,0,0,0.7)',
                    },
                  ]}
                />
              </Placeholder>
              <Placeholder
                Animation={props => (
                  <Shine {...props} style={{ backgroundColor: '#343a40' }} />
                )}>
                <PlaceholderMedia
                  style={[
                    {
                      width: '100%',
                      height: responsiveHeight(10),
                      backgroundColor: 'rgba(0,0,0,0.7)',
                    },
                  ]}
                />
              </Placeholder>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // alignItems: 'center',
                // backgroundColor: 'rgba(0,0,0,0.7)',
                flex: 1,
              }}>
              <Placeholder
                Animation={props => (
                  <Shine {...props} style={{ backgroundColor: '#343a40' }} />
                )}>
                <PlaceholderMedia
                  style={[
                    {
                      width: '100%',
                      height: responsiveHeight(21),
                      backgroundColor: 'rgba(0,0,0,0.7)',
                    },
                  ]}
                />
              </Placeholder>
            </View>
          </View>
          <View
            style={{
              // height: 300,
              // backgroundColor: 'rgba(0,0,0,0.7)',
              // borderRadius: 15,
              // padding: 20,
              marginTop: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Placeholder
              Animation={props => (
                <Shine {...props} style={{ backgroundColor: '#343a40' }} />
              )}>
              <PlaceholderLine
                style={[
                  {
                    width: '100%',
                    height: responsiveHeight(2),
                    backgroundColor: 'rgba(0,0,0,0.7)',
                  },
                ]}
              />
            </Placeholder>
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
                source={require('../../../assets/img/open_weather_logo.png')}
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
                <Icon name="information" color={'#d3d3d3'} size={24}></Icon>
              </TouchableHighlight>
            </Tooltip>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default HomePlaceholder;
