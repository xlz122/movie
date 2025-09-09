import React, { useState } from 'react';
import { StatusBar, View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Navigation } from '@/types/index';
import LoginForm from './login-form/LoginForm';
import RegisterForm from './register-form/RegisterForm';

function Login(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const inset = useSafeAreaInsets();

  const handleClose = () => {
    navigation.goBack();
  };

  const [formType, setFormType] = useState('login');

  const formTypeChange = () => {
    if (formType === 'login') {
      setFormType('register');
      return;
    }

    setFormType('login');
  };

  useFocusEffect(() => {
    StatusBar.setBarStyle('dark-content');
  });

  return (
    <View style={[styles.page, { paddingTop: inset.top }]}>
      <Pressable onPress={handleClose} style={styles.close}>
        <Text style={styles.closeIcon}>{'\ue612'}</Text>
      </Pressable>
      {formType === 'login' && <LoginForm />}
      {formType === 'register' && <RegisterForm />}
      <View style={styles.tool}>
        <Pressable onPress={formTypeChange}>
          <Text style={styles.toolText}>{formType === 'login' ? '账号注册' : '账号登录'}</Text>
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
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff'
  },
  close: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 42,
    height: 42
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
    marginTop: 22,
    marginHorizontal: 38
  },
  toolText: {
    fontSize: 12,
    color: '#303133'
  }
});

export default Login;
