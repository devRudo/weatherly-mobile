import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, useColorScheme } from 'react-native';
import { Home, Settings, ManageCities } from '../screens';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RootStack = createNativeStackNavigator();

export default function Navigator({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Homne">
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: backgroundStyle.backgroundColor,
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: isDarkMode ? '#fff' : '#000',
            },
            headerTintColor: isDarkMode ? '#fff' : '#000',
            animation: 'slide_from_left',
          }}
        />
        <RootStack.Screen
          name="ManageCities"
          component={ManageCities}
          options={{
            title: 'Manage Cities',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: backgroundStyle.backgroundColor,
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: isDarkMode ? '#fff' : '#000',
            },
            headerTintColor: isDarkMode ? '#fff' : '#000',
            animation: 'slide_from_left',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
