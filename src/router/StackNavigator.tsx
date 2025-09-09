import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import type { StackCardInterpolationProps, StackCardInterpolatedStyle } from '@react-navigation/stack';
import CustomHeader from '@/components/custom-header/CustomHeader';
import router from '.';

const Stack = createStackNavigator();

const forSlideFromBottom = ({ current, layouts }: StackCardInterpolationProps): StackCardInterpolatedStyle => ({
  cardStyle: {
    transform: [
      {
        translateY: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [layouts.screen.height, 0]
        })
      }
    ]
  }
});

function StackNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{
        // 自定义标头
        header: ({ options }) => <CustomHeader options={options} />,
        // 路由过渡动画
        cardStyleInterpolator: Platform.OS === 'ios' ? CardStyleInterpolators.forHorizontalIOS : forSlideFromBottom
      }}
    >
      {router.map?.((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={() => ({
              headerShown: item.headerShown,
              title: item.title
            })}
          />
        );
      })}
    </Stack.Navigator>
  );
}

export default StackNavigator;
