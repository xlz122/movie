import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Pressable } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { TextInputEvent } from '@/types/index';
import styles from './picture-code.css';

type Props = {
  open: boolean;
  source: string;
  onComplete?: (code: string) => void;
  onCancel?: () => void;
  style?: ViewStyle;
};

function PicutreCode(props: Props): React.ReactElement {
  const [code, setCode] = useState('');

  const handleCodeChange = (e: TextInputEvent) => {
    setCode(e.nativeEvent.text);
  };

  useEffect(() => {
    setCode('');
  }, [props.open]);

  useEffect(() => {
    if (code.length !== 4) {
      return;
    }

    props.onComplete?.(code);
  }, [code]);

  const onCancel = () => {
    props.onCancel?.();
  };

  if (!props.open) {
    return <></>;
  }

  return (
    <View style={[styles.picutre, props.style]}>
      <Pressable onPress={onCancel} style={styles.mask} />
      <View style={styles.modal}>
        <View style={styles.modalBody}>
          <Text style={styles.title}>请输入以下验证码数字</Text>
          {Boolean(props.source) && (
            <Image resizeMode="stretch" source={{ uri: props.source }} style={styles.image} />
          )}
          <View style={styles.inputMain}>
            <TextInput
              autoFocus
              caretHidden
              maxLength={4}
              value={code}
              onChange={handleCodeChange}
              style={styles.input}
            />
            <View style={styles.code}>
              <Text style={styles.codeItem}>{code[0]}</Text>
              <Text style={styles.codeItem}>{code[1]}</Text>
              <Text style={styles.codeItem}>{code[2]}</Text>
              <Text style={styles.codeItem}>{code[3]}</Text>
            </View>
          </View>
        </View>
        <Pressable onPress={onCancel} style={styles.cancel}>
          <Text style={styles.cancelText}>取消</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default PicutreCode;
