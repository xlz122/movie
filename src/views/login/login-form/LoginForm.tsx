import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from 'react-redux';
import { login, userinfo } from '@/api/user';
import type { Navigation, TextInputEvent, ResponseType } from '@/types/index';
import CustomAlert from '@/components/custom-alert/CustomAlert';

function LoginForm(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const store = useStore();

  // 安全文本显隐
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureTextEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const [params, setParams] = useState({
    account: '',
    password: ''
  });

  const handleAccountChange = (e: TextInputEvent): void => {
    setParams({ ...params, account: e.nativeEvent.text });
  };

  const handlePasswordChange = (e: TextInputEvent): void => {
    setParams({ ...params, password: e.nativeEvent.text });
  };

  // 获取用户信息
  const getUserInfo = (): Promise<unknown> => {
    return new Promise(resolve => {
      userinfo()
        .then((res: ResponseType) => {
          if (res?.code !== 200) {
            return;
          }

          resolve(res.data ?? {});
        })
        .catch(() => ({}));
    });
  };

  const handleSubmit = (): void => {
    if (!params.account) {
      CustomAlert({ title: '提示', message: '请先输入手机号' });
      return;
    }
    if (!params.password) {
      CustomAlert({ title: '提示', message: '请先输入密码' });
      return;
    }

    login({ ...params })
      .then(async (res: ResponseType) => {
        if (res?.code !== 200) {
          CustomAlert({ title: '提示', message: res?.message ?? '登录失败' });
          return;
        }

        store.dispatch({ type: 'routine/setLogin', payload: true });
        store.dispatch({ type: 'routine/setToken', payload: res.data?.token });

        const userInfo = await getUserInfo();
        store.dispatch({ type: 'routine/setUserInfo', payload: userInfo });
        navigation.goBack();
      })
      .catch(error => {
        CustomAlert({ title: '提示', message: error.response?.data?.message });
      });
  };

  return (
    <>
      <Text style={styles.title}>登录</Text>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <TextInput
            value={params.account}
            onChange={handleAccountChange}
            inputMode="tel"
            placeholder="请输入手机号"
            placeholderTextColor="#c9c9c9"
            style={styles.itemInput}
          />
        </View>
        <View style={styles.formItem}>
          <TextInput
            secureTextEntry={secureTextEntry}
            value={params.password}
            onChange={handlePasswordChange}
            autoComplete="off"
            placeholder="请输入密码"
            placeholderTextColor="#c9c9c9"
            style={styles.itemInput}
          />
          <Text
            onPress={toggleSecureTextEntry}
            style={secureTextEntry ? styles.itemIcon : styles.activeIcon}
          >
            {'\ue639'}
          </Text>
        </View>
        <Pressable onPress={handleSubmit} style={styles.submit}>
          <Text style={styles.submitText}>登 录</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 22,
    color: '#303133'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
    marginTop: 46
  },
  formItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.48,
    borderStyle: 'solid',
    borderColor: '#eeeeee'
  },
  itemInput: {
    flex: 1,
    height: 40
  },
  itemIcon: {
    fontFamily: 'iconfont',
    fontSize: 18,
    color: '#cccccc'
  },
  activeIcon: {
    fontFamily: 'iconfont',
    fontSize: 18,
    color: '#e54847'
  },
  submit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginTop: 10,
    backgroundColor: '#409eff',
    borderRadius: 6
  },
  submitText: {
    fontSize: 14,
    color: '#ffffff'
  }
});

export default LoginForm;
