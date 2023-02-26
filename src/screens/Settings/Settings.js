import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  useColorScheme,
  StatusBar,
  Dimensions,
  Switch,
  TouchableHighlight,
  Modal,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Settings = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [nightUpdateEnabled, setNightUpdateEnabled] = useState(false);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [temperatureUnit, setTemperatureUnit] = useState('C');
  const [windSpeedUnit, setWindSpeedUnit] = useState('km/h');
  const [pressureUnit, setPressureUnit] = useState('mbar');

  const [showFeedbackAction, setShowFeedbackAction] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
        <Text>UNITS</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, flex: 2 }}>
            Temperature Units
          </Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={temperatureUnit}
            onValueChange={newValue => setTemperatureUnit(newValue)}>
            <Picker.Item label="Celsius" value="C" />
            <Picker.Item label="Fahrenheit" value="F" />
          </Picker>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, flex: 1 }}>
            Wind speed units
          </Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={windSpeedUnit}
            onValueChange={newValue => setWindSpeedUnit(newValue)}>
            <Picker.Item label="Beaufort scale" value="bs" />
            <Picker.Item label="Kilometers per hour (km/h)" value="km/h" />
            <Picker.Item label="Meters per second (m/s)" value="m/s" />
            <Picker.Item label="Miles per hour (mph)" value="mph" />
            <Picker.Item label="Knot (kn)" value="kn" />
          </Picker>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, flex: 2 }}>
            Atmospheric pressure units
          </Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={pressureUnit}
            onValueChange={newValue => setPressureUnit(newValue)}>
            <Picker.Item label="Hectopascal (hPa)" value="hpa" />
            <Picker.Item label="Millibar (mbar)" value="mbar" />
            <Picker.Item label="Millimeter of mercury (mmHg)" value="mmhg" />
            <Picker.Item label="Inch of mercury (inHg)" value="inhg" />
            <Picker.Item label="Standard atmosphere (atm)" value="atm" />
          </Picker>
        </View>
        <View
          style={{
            borderBottomColor: '#d3d3d3',
            borderBottomWidth: 1,
            marginTop: 40,
            marginBottom: 40,
          }}
        />
        <Text>OTHER SETTINGS</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            Update at night automatically
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#1f6ff8' }}
            thumbColor={nightUpdateEnabled ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setNightUpdateEnabled(!nightUpdateEnabled)}
            value={nightUpdateEnabled}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
              Sound effects
            </Text>
            <Text style={{ fontSize: 12 }}>
              Accompany weather changes by sound effects
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#1f6ff8' }}
            thumbColor={soundEffectsEnabled ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setSoundEffectsEnabled(!soundEffectsEnabled)}
            value={soundEffectsEnabled}
          />
        </View>
        <View
          style={{
            borderBottomColor: '#d3d3d3',
            borderBottomWidth: 1,
            marginTop: 40,
            marginBottom: 40,
          }}
        />
        <Text>ABOUT WEATHERLY</Text>
        <TouchableHighlight onPress={() => setShowFeedbackAction(true)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Feedback</Text>
            <Text>></Text>
          </View>
        </TouchableHighlight>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
              Privacy Policy
            </Text>
          </View>
          <Text>></Text>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showFeedbackAction}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setShowFeedbackAction(!showFeedbackAction);
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              width: Dimensions.get('screen').width - 20,
              backgroundColor: isDarkMode ? '#111' : '#f1f1f1',
              borderRadius: 20,
              // minHeight: 300,
            }}>
            <View
              style={{
                position: 'relative',
                padding: 20,
                borderBottomColor: '#d3d3d3',
                borderBottomWidth: 1,
              }}>
              <Icon
                name="note"
                style={{
                  position: 'absolute',
                  top: -30,
                  left: Dimensions.get('screen').width / 2 - 40,
                  padding: 15,
                  backgroundColor: '#111',
                  color: '#fff',
                  fontSize: 30,
                  borderRadius: 30,
                }}></Icon>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: 20,
                }}>
                <Text>Rate Weather</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                    marginVertical: 30,
                  }}>
                  <Icon name="emoticon-sad-outline" size={40} color="#c3c3c3" />
                  <Icon
                    name="emoticon-neutral-outline"
                    size={40}
                    color="#c3c3c3"
                  />
                  <Icon
                    name="emoticon-happy-outline"
                    size={40}
                    color="#c3c3c3"
                  />
                  <Icon
                    name="emoticon-excited-outline"
                    size={40}
                    color="#c3c3c3"
                  />
                </View>
                <Text>How do you feel about Weatherly?</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableWithoutFeedback
                onPress={() => setShowFeedbackAction(false)}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    paddingVertical: 20,
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: '#d3d3d3',
                  }}>
                  <Text style={{ fontSize: 16 }}>Later</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    paddingVertical: 20,
                    flex: 1,
                  }}>
                  <Text style={{ fontSize: 16 }}>Rate Now</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
