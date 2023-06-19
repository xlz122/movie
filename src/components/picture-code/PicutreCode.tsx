import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Pressable } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { TextInputEvent } from '@/types/index';
import styles from './picutre-code.css';

type Props = {
  image: string;
  complete?: (code: string) => void;
  close?: () => void;
  picutreStyle?: ViewStyle;
  maskStyle?: ViewStyle;
};

function PicutreCode(props: Props): React.ReactElement {
  const [code, setCode] = useState('');

  const handleInputChange = (e: TextInputEvent) => {
    setCode(e.nativeEvent.text);
  };

  useEffect(() => {
    setCode('');
  }, [props.image]);

  useEffect(() => {
    if (code.length === 4) {
      props.complete && props.complete(code);
    }
  }, [code]);

  const close = () => {
    props.close && props.close();
  };

  return (
    <View style={[styles.picutre, props.picutreStyle]}>
      <Pressable onPress={close} style={[styles.mask, props?.maskStyle]} />
      <View style={styles.modal}>
        <View style={styles.modalBody}>
          <Text style={styles.title}>请输入以下验证码数字</Text>
          <Image
            source={{ uri: props.image }}
            resizeMode={'stretch'}
            style={styles.coverImage}
          />
          <View style={styles.inputMain}>
            <TextInput
              value={code}
              onChange={handleInputChange}
              autoFocus
              caretHidden
              maxLength={4}
              placeholder=""
              style={styles.inputItem}
            />
            <View style={styles.inputText}>
              <Text style={styles.inputTextItem}>{code[0]}</Text>
              <Text style={styles.inputTextItem}>{code[1]}</Text>
              <Text style={styles.inputTextItem}>{code[2]}</Text>
              <Text style={styles.inputTextItem}>{code[3]}</Text>
            </View>
          </View>
        </View>
        <Pressable onPress={close} style={styles.cancel}>
          <Text style={styles.cancelText}>取消</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default PicutreCode;
