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

  const handleAccountChange = (e: TextInputEvent) => {
    setParams({ ...params, account: e.nativeEvent.text });
  };

  const handlePasswordChange = (e: TextInputEvent) => {
    setParams({ ...params, password: e.nativeEvent.text });
  };

  const handleCodeChange = (e: TextInputEvent) => {
    setParams({ ...params, code: e.nativeEvent.text });
  };

  // 验证码计时
  const [codeTime, setCodeTime] = useState({
    visible: false,
    time: 120
  });
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleTimeText = () => {
    timer.current && clearInterval(timer.current);

    setCodeTime({ ...codeTime, visible: true });

    timer.current = setInterval(() => {
      setCodeTime((state) => {
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

  // 图形验证码
  const [captcha, setCaptcha] = useState({
    open: false,
    source: ''
  });

  const handleGetCaptcha = async () => {
    if (!params.account) {
      CustomAlert({ title: '提示', message: '请先输入手机号' });
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(params.account)) {
      CustomAlert({ title: '提示', message: '请输入正确的手机号' });
      return;
    }

    const res: ResponseType<string> = await getCaptcha();
    if (res?.code !== 200) {
      CustomAlert({ title: '提示', message: res?.message });
      return;
    }

    setCaptcha({ ...captcha, open: true, source: res.data ?? '' });
  };

  // 校验图形验证码并发送短信验证码
  const handleCaptchaComplete = async (code: string) => {
    const res: ResponseType = await filedCaptcha({ type: 'register', phone: params.account, code });
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
  };

  const handleCaptchaCancel = () => {
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

    const res: ResponseType = await register({ ...params });
    if (res?.code !== 200) {
      CustomAlert({ title: '提示', message: res?.message ?? '注册失败' });
      return;
    }

    navigation.replace('Login');
    CustomAlert({ title: '提示', message: res.message });
  };

  return (
    <View style={styles.registerForm}>
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
        source={captcha.source}
        onComplete={handleCaptchaComplete}
        onCancel={handleCaptchaCancel}
        style={{ position: 'absolute', top: -86, left: -38 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  registerForm: {
    marginTop: 42,
    marginHorizontal: 38
  },
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
