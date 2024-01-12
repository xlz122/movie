import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

type Route = RouteProp<{ params: { uri: string } }>;

function Webview(): React.ReactElement {
  const route: Route = useRoute();

  const RenderLoading = (): React.ReactElement => {
    return <Text style={styles.loading}>loading...</Text>;
  };

  return (
    <View style={styles.flex}>
      <WebView
        style={styles.webView}
        source={{ uri: route.params.uri }}
        startInLoadingState={true}
        renderLoading={() => <RenderLoading />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    position: 'relative',
    flex: 1
  },
  webView: {
    width: width,
    height: height
  },
  loading: {
    position: 'absolute',
    top: '45%',
    left: '44%'
  }
});

export default Webview;
