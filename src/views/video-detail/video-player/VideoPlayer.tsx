import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { timeStampToDuration } from '@/utils/utils';
import styles from './video-player.css';

type Props = {
  detail: {
    id?: number;
    poster?: string;
    duration?: number;
  };
};

function Video(props: Props): React.ReactElement {
  const [play, setPlay] = useState({
    status: false
  });

  const playStatusChange = (): void => {
    setPlay({ status: true });
  };

  return (
    <View style={styles.videoPlayer}>
      {props.detail.poster && (
        <Image
          source={{ uri: props.detail.poster }}
          resizeMode={'stretch'}
          style={[styles.coverImage]}
        />
      )}
      {!play.status && (
        <Pressable onPress={playStatusChange} style={styles.play}>
          <Text style={styles.playIcon}>{'\ue616'}</Text>
        </Pressable>
      )}
      {play.status && (
        <>
          <View style={styles.control}>
            <View style={styles.controlPlay}>
              <Text style={styles.controlPlayIcon}>{'\ue616'}</Text>
            </View>
            <Text style={styles.controlTime}>00:00</Text>
            <View style={styles.controlProgress} />
            <Text style={styles.controlTime}>
              {timeStampToDuration(props.detail?.duration || 0)}
            </Text>
            <View style={styles.controlClarity}>
              <Text style={styles.controlClarityText}>高清</Text>
            </View>
            <View style={styles.controlFull}>
              <Text style={styles.controlFullIcon}>{'\ue69a'}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

export default Video;
