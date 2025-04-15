import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import type { RouteProp } from '@react-navigation/native';

type Route = RouteProp<{ params: { uri: string } }>;

function WebviewComponent(): React.ReactElement {
  const route: Route = useRoute();

  const RenderLoading = (): React.ReactElement => {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>loading...</Text>
      </View>
    );
  };

  return (
    <WebView
      source={{ uri: route.params.uri }}
      startInLoadingState={true}
      renderLoading={() => <RenderLoading />}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff'
  },
  loadingText: {
    margin: 'auto'
  }
});

export default WebviewComponent;
