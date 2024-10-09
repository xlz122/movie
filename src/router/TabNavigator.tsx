import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const tabbar = [
  {
    name: 'Find',
    label: '首页',
    title: '首页',
    icon: '\ue908',
    selectIcon: '\ue908',
    // 标题栏
    headerShown: false,
    component: require('../tabpage/home/Home').default
  },
  {
    name: 'Movies',
    label: '分类',
    title: '分类',
    icon: '\ue636',
    selectIcon: '\ue636',
    headerShown: false,
    component: require('../tabpage/movies/Movies').default
  },
  {
    name: 'Videos',
    label: '短片',
    title: '短片',
    icon: '\ue617',
    selectIcon: '\ue617',
    headerShown: false,
    component: require('../tabpage/videos/Videos').default
  },
  {
    name: 'Mine',
    label: '我的',
    title: '我的',
    icon: '\ue909',
    selectIcon: '\ue909',
    headerShown: false,
    component: require('../tabpage/mine/Mine').default
  }
];

function TabNavigator(): React.ReactElement {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 50
        },
        tabBarItemStyle: {
          height: 44
        },
        tabBarLabelStyle: {
          fontSize: 11
        },
        tabBarInactiveTintColor: '#b7bac3',
        tabBarActiveTintColor: '#e54847'
      }}
    >
      {tabbar.map?.((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              title: item.title,
              tabBarLabel: item.label,
              tabBarIcon: ({ focused }) => {
                return (
                  <Text style={focused ? styles.selectIcon : styles.icon}>
                    {focused ? item.selectIcon : item.icon}
                  </Text>
                );
              },
              headerShown: item.headerShown
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'iconfont',
    fontSize: 22,
    color: '#b7bac3'
  },
  selectIcon: {
    fontFamily: 'iconfont',
    fontSize: 22,
    color: '#e54847'
  }
});

export default TabNavigator;
