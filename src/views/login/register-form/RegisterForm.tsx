import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getCaptcha, filedCaptcha, register } from '@/api/user';
import type { Navigation, TextInputEvent, ResponseType } from '@/types/index';
import CustomAlert from '@/components/custom-alert/CustomAlert';
import PicutreCode from '@/components/picture-code/PicutreCode';

function RegisterForm(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const [params, setParams] = useState({
    account: '',
    password: '',
    code: ''
  });

  const handleAccountChange = (e: TextInputEvent): void => {
    setParams({ ...params, account: e.nativeEvent.text });
  };

  const handlePasswordChange = (e: TextInputEvent): void => {
    setParams({ ...params, password: e.nativeEvent.text });
  };

  const handleCodeChange = (e: TextInputEvent): void => {
    setParams({ ...params, code: e.nativeEvent.text });
  };

  // 验证码倒计时
  const [codeTime, setCodeTime] = useState({
    visible: false,
    time: 120
  });
  const timer = useRef<NodeJS.Timeout>();

  const handleTimeText = (): void => {
    timer.current && clearInterval(timer.current);

    setCodeTime({ ...codeTime, visible: true });

    timer.current = setInterval(() => {
      setCodeTime(state => {
        if (state.time <= 1) {
          clearInterval(timer.current);
          return { visible: false, time: 120 };
        }

        return { visible: true, time: state.time - 1 };
      });
    }, 1000);
  };

  useEffect(() => {
    return () => timer.current && clearInterval(timer.current);
  }, []);

  // 获取图形验证码
  const [captcha, setCaptcha] = useState({
    open: false,
    image: ''
  });

  const handleGetCaptcha = (): void => {
    if (!params.account) {
      CustomAlert({ title: '提示', message: '请先输入手机号' });
      return;
    }
    if (params.account.length !== 11) {
      CustomAlert({ title: '提示', message: '请输入正确的手机号' });
      return;
    }

    getCaptcha()
      .then((res: ResponseType<string>) => {
        if (res?.code !== 200) {
          CustomAlert({ title: '提示', message: res?.message });
          return;
        }

        setCaptcha({ ...captcha, open: true, image: res.data ?? '' });
      })
      .catch(() => ({}));
  };

  // 校验图形验证码并发送短信验证码
  const handleCaptchaComplete = (code: string): void => {
    filedCaptcha({ type: 'register', phone: params.account, code })
      .then((res: ResponseType) => {
        // 手机号已注册
        if (res?.code === 403) {
          setCaptcha({ ...captcha, open: false });
          CustomAlert({ title: '提示', message: res.message });
          return;
        }
        // 短信验证上限
        if (res?.code === 450) {
          setCaptcha({ ...captcha, open: false });
          CustomAlert({ title: '提示', message: res.message });
          return;
        }
        if (res?.code !== 200) {
          handleGetCaptcha();
          CustomAlert({ title: '提示', message: res?.message });
          return;
        }

        handleTimeText();
        setCaptcha({ ...captcha, open: false });
        CustomAlert({ title: '提示', message: res.message });
      })
      .catch(() => ({}));
  };

  const handleCaptchaCancel = (): void => {
    setCaptcha({ ...captcha, open: false });
  };

  const handleSubmit = async (): Promise<void> => {
    if (!params.account) {
      CustomAlert({ title: '提示', message: '请先输入手机号' });
      return;
    }
    if (!params.password) {
      CustomAlert({ title: '提示', message: '请先输入密码' });
      return;
    }
    if (!params.code) {
      CustomAlert({ title: '提示', message: '请先输入验证码' });
      return;
    }

    register({ ...params })
      .then((res: ResponseType) => {
        if (res?.code !== 200) {
          CustomAlert({ title: '提示', message: res?.message ?? '注册失败' });
          return;
        }

        navigation.replace('Login');
        CustomAlert({ title: '提示', message: res.message });
      })
      .catch(() => ({}));
  };

  return (
    <>
      <Text style={styles.title}>注册</Text>
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
            value={params.password}
            onChange={handlePasswordChange}
            autoComplete="off"
            placeholder="请设置初始密码(6-12位)"
            placeholderTextColor="#c9c9c9"
            style={styles.itemInput}
          />
        </View>
        <View style={styles.formItem}>
          <TextInput
            value={params.code}
            onChange={handleCodeChange}
            placeholder="请输入验证码"
            placeholderTextColor="#c9c9c9"
            style={styles.itemInput}
          />
          <Text onPress={handleGetCaptcha} style={styles.itemCode}>
            {codeTime.visible ? `${codeTime.time}s` : '获取验证码'}
          </Text>
        </View>
        <Pressable onPress={handleSubmit} style={styles.submit}>
          <Text style={styles.submitText}>注 册</Text>
        </Pressable>
      </View>
      <PicutreCode
        open={captcha.open}
        image={captcha.image}
        onComplete={handleCaptchaComplete}
        onCancel={handleCaptchaCancel}
      />
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
  itemCode: {
    fontSize: 12,
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

export default RegisterForm;
