import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { Navigation } from '@/types/index';
import LoginForm from './login-form/LoginForm';
import RegisterForm from './register-form/RegisterForm';

function Login(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const close = (): void => {
    navigation.goBack();
  };

  const [state, setState] = useState({
    type: 'login',
    text: '账号注册'
  });

  const typeChange = () => {
    if (state.type === 'login') {
      setState({ type: 'register', text: '账号登录' });
      return false;
    }

    setState({ type: 'login', text: '账号注册' });
  };

  return (
    <View style={styles.page}>
      <Pressable onPress={close} style={styles.close}>
        <Text style={styles.closeIcon}>{'\ue612'}</Text>
      </Pressable>
      {state.type === 'login' && <LoginForm />}
      {state.type === 'register' && <RegisterForm />}
      <View style={styles.tool}>
        <Pressable onPress={typeChange}>
          <Text style={styles.toolText}>{state.text}</Text>
        </Pressable>
        <Pressable onPress={() => navigation.push('Forget')}>
          <Text style={styles.toolText}>找回密码</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff'
  },
  close: {
    width: 52,
    height: 52,
    paddingTop: 16,
    paddingLeft: 16
  },
  closeIcon: {
    fontFamily: 'iconfont',
    fontSize: 17,
    color: '#e54847'
  },
  tool: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 45,
    marginTop: 28
  },
  toolText: {
    fontSize: 12,
    color: '#303133'
  }
});

export default Login;
