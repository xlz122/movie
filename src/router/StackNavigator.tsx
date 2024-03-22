import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomHeader from '@/components/custom-header/CustomHeader';
import router from './index';

const Stack = createStackNavigator();

function StackNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{
        // 自定义标头
        header: ({ options }) => {
          return <CustomHeader options={options} />;
        }
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
