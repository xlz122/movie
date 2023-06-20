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

function VideoPlayer(props: Props): React.ReactElement {
  const [video, setVideo] = useState({
    paused: true
  });

  const handlePlayChange = (): void => {
    setVideo({ paused: !video.paused });
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
      {video.paused && (
        <Pressable onPress={handlePlayChange} style={styles.play}>
          <Text style={styles.playIcon}>{'\ue616'}</Text>
        </Pressable>
      )}
      {!video.paused && (
        <View style={styles.control}>
          <Pressable onPress={handlePlayChange} style={styles.controlPlay}>
            <Text style={styles.controlPlayIcon}>
              {video.paused ? '\ue616' : '\ue61b'}
            </Text>
          </Pressable>
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
      )}
    </View>
  );
}

export default VideoPlayer;
