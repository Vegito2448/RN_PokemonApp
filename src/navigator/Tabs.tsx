import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ColorValue, Platform, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StackNavigator from './StackNavigator';
import StackNavigatorTabs from './StackNavigatorTabs';

const Tab = createBottomTabNavigator();


const HomeIcon = ({ color }: { color: ColorValue; }) => (
  <View children={<Icon color={color} size={25} name="list-outline" />} />
);

const SearchIcon = ({ color }: { color: ColorValue; }) => (
  <View children={<Icon color={color} size={25} name="search-outline" />} />
);
function Tabs() {

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      screenOptions={{
        tabBarActiveTintColor: '#5856D6',
        tabBarLabelStyle: {
          marginBottom: (Platform.OS === 'ios') ? 0 : 10,
        },
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.92)',
          borderWidth: 0,
          elevation: 0,
          height: (Platform.OS === 'ios') ? 80 : 60,
        },
      }}
    >
      <Tab.Screen
        name="HomeNavigator"
        component={StackNavigator}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={StackNavigatorTabs}
        options={{
          tabBarLabel: 'Search Pokemon',
          tabBarIcon: SearchIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
