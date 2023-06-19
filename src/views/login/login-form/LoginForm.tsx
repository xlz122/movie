import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from 'react-redux';
import { login, userinfo } from '@/api/user';
import type { Navigation, TextInputEvent, ResponseType } from '@/types/index';
import CustomAlert from '@/components/custom-alert/CustomAlert';

function LoginForm(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const store = useStore();

  // 密码显隐
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const togglePassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const [formData, setFormData] = useState({
    account: '',
    password: ''
  });

  const handleInputChange = (e: TextInputEvent, name: string) => {
    setFormData({ ...formData, [name]: e.nativeEvent.text });
  };

  // 获取用户信息
  const getUserInfo = () => {
    return new Promise((resolve, reject) => {
      userinfo()
        .then((res: ResponseType) => {
          if (res.code === 200) {
            resolve(res.data);
          }
          reject();
        })
        .catch(() => ({}));
    });
  };

  const submit = (): boolean | undefined => {
    if (!formData.account) {
      CustomAlert({ title: '提示', message: '请输入手机号' });
      return false;
    }
    if (!formData.password) {
      CustomAlert({ title: '提示', message: '请输入密码' });
      return false;
    }

    login({ ...formData })
      .then(async (res: ResponseType<{ token: string }>) => {
        if (res.code === 200) {
          store.dispatch({
            type: 'routine/setLogin',
            payload: true
          });
          store.dispatch({
            type: 'routine/setToken',
            payload: res?.data?.token
          });

          const userInfo = await getUserInfo();
          if (userInfo) {
            store.dispatch({
              type: 'routine/setUserInfo',
              payload: userInfo
            });

            navigation.goBack();
          }
        } else {
          CustomAlert({ title: '提示', message: res?.message });
        }
      })
      .catch(err => {
        if (err?.response?.data?.message) {
          CustomAlert({ title: '提示', message: err?.response?.data?.message });
        }
      });
  };

  return (
    <>
      <Text style={styles.title}>登录</Text>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <TextInput
            value={formData.account}
            onChange={e => {
              handleInputChange(e, 'account');
            }}
            placeholder="请输入手机号"
            style={styles.itemInput}
          />
        </View>
        <View style={styles.formItem}>
          <TextInput
            secureTextEntry={secureTextEntry}
            value={formData.password}
            onChange={e => {
              handleInputChange(e, 'password');
            }}
            autoComplete="off"
            placeholder="请输入密码"
            style={styles.itemInput}
          />
          <Text
            onPress={togglePassword}
            style={[
              styles.itemIcon,
              secureTextEntry ? styles.itemIcon : styles.activeIcon
            ]}
          >
            {'\ue639'}
          </Text>
        </View>
        <Pressable onPress={submit} style={styles.submit}>
          <Text style={styles.submitText}>登 录</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 45,
    marginTop: 45,
    fontWeight: '700',
    fontSize: 22,
    color: '#303133'
  },
  form: {
    paddingTop: 34,
    paddingHorizontal: 45
  },
  formItem: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 68,
    paddingTop: 22,
    borderBottomWidth: 0.4,
    borderStyle: 'solid',
    borderColor: '#eee'
  },
  itemInput: {
    flex: 1,
    height: 45
  },
  itemIcon: {
    height: 45,
    lineHeight: 45,
    fontFamily: 'iconfont',
    fontSize: 18,
    color: '#ccc'
  },
  activeIcon: {
    color: '#e54847'
  },
  submit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginTop: 34,
    backgroundColor: '#409eff',
    textAlign: 'center',
    borderRadius: 2
  },
  submitText: {
    fontSize: 14,
    color: '#fff'
  }
});

export default LoginForm;
