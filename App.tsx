import React from 'react';
import { Provider } from 'react-redux';
import store, { persistor } from './src/store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/router/StackNavigator';
import 'react-native-gesture-handler';

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
