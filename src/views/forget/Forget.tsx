import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from 'react-redux';
import {
  fieldAccount,
  getCaptcha,
  filedCaptcha,
  filedPhoneCode,
  modifyPassword
} from '@/api/user';
import type { Navigation, TextInputEvent, ResponseType } from '@/types/index';
import CustomAlert from '@/components/custom-alert/CustomAlert';
import PicutreCode from '@/components/picture-code/PicutreCode';
import styles from './forget.css';

function Forget(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const store = useStore();

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

  const handleClearInput = (name: string): void => {
    setParams({ ...params, [name]: '' });
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

  // 当前步骤
  const [currentStep, setCurrentStep] = useState(0);

  // 验证手机号
  const handleFieldAccount = (): void => {
    if (!params.account) {
      CustomAlert({ title: '提示', message: '请先输入手机号' });
      return;
    }
    if (params.account.length !== 11) {
      CustomAlert({ title: '提示', message: '请输入正确的手机号' });
      return;
    }

    fieldAccount({ account: params.account })
      .then((res: ResponseType) => {
        if (res?.code !== 200) {
          CustomAlert({ title: '提示', message: res?.message });
          return;
        }

        setCurrentStep(1);
      })
      .catch(() => ({}));
  };

  // 获取图形验证码
  const [captcha, setCaptcha] = useState({
    open: false,
    image: ''
  });

  const handleGetCaptcha = (): void => {
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
    filedCaptcha({ type: 'forget', phone: params.account, code })
      .then((res: ResponseType) => {
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

        setCurrentStep(2);

        handleTimeText();
        setCaptcha({ ...captcha, open: false });
        CustomAlert({ title: '提示', message: res.message });
      })
      .catch(() => ({}));
  };

  const handleCaptchaCancel = (): void => {
    setCaptcha({ ...captcha, open: false });
  };

  // 校验短信验证码
  const handleFiledPhoneCode = (): void => {
    if (!params.code) {
      CustomAlert({ title: '提示', message: '请先输入验证码' });
      return;
    }

    filedPhoneCode({ phone: params.account, code: params.code })
      .then((res: ResponseType) => {
        if (res?.code !== 200) {
          CustomAlert({ title: '提示', message: res?.message });
          return;
        }

        setCurrentStep(3);
        store.dispatch({ type: 'routine/setToken', payload: res.data?.token });
      })
      .catch(() => ({}));
  };

  // 修改密码
  const handleModifyPassword = (): void => {
    modifyPassword({ password: params.password })
      .then((res: ResponseType) => {
        if (res?.code !== 200) {
          CustomAlert({ title: '提示', message: res?.message });
          return;
        }

        store.dispatch({ type: 'routine/setLogout', payload: '' });
        navigation.replace('Login');
        CustomAlert({ title: '提示', message: res.message });
      })
      .catch(() => ({}));
  };

  const nextStep = (): void => {
    // 验证手机号
    if (currentStep === 0) {
      handleFieldAccount();
    }

    // 获取图形验证码
    if (currentStep === 1) {
      handleGetCaptcha();
    }

    // 校验短信验证码
    if (currentStep === 2) {
      handleFiledPhoneCode();
    }

    // 修改密码
    if (currentStep === 3) {
      handleModifyPassword();
    }
  };

  return (
    <View style={styles.page}>
      {currentStep === 0 && (
        <View style={styles.fieldItem}>
          <Text style={styles.itemLabel}>手机号码</Text>
          <TextInput
            value={params.account}
            onChange={handleAccountChange}
            inputMode="tel"
            placeholder="请输入注册手机号"
            placeholderTextColor="#c9c9c9"
            style={styles.itemInput}
          />
          {params.account && (
            <Pressable onPress={() => handleClearInput('account')}>
              <Text style={styles.inputClearIcon}>{'\ue637'}</Text>
            </Pressable>
          )}
        </View>
      )}
      {(currentStep === 1 || currentStep === 2) && (
        <>
          <View style={styles.fieldItem}>
            <TextInput
              value={params.code}
              onChange={handleCodeChange}
              placeholder="请输入验证码"
              placeholderTextColor="#c9c9c9"
              style={styles.itemCodeInput}
            />
            <Text onPress={handleGetCaptcha} style={styles.itemCode}>
              {codeTime.visible ? `${codeTime.time}s` : '获取验证码'}
            </Text>
          </View>
          <Text style={styles.tipText}>验证码会发送至您注册的手机号</Text>
        </>
      )}
      {currentStep === 3 && (
        <View style={styles.fieldItem}>
          <Text style={styles.itemLabel}>新密码</Text>
          <TextInput
            value={params.password}
            onChange={handlePasswordChange}
            placeholder="请输入新密码"
            placeholderTextColor="#c9c9c9"
            style={styles.itemInput}
          />
          {params.password && (
            <Pressable onPress={() => handleClearInput('password')}>
              <Text style={styles.inputClearIcon}>{'\ue637'}</Text>
            </Pressable>
          )}
        </View>
      )}
      <Pressable onPress={nextStep} style={styles.submit}>
        <Text style={styles.submitText}>
          {currentStep !== 3 ? '下一步' : '提交'}
        </Text>
      </Pressable>
      <PicutreCode
        open={captcha.open}
        image={captcha.image}
        onComplete={handleCaptchaComplete}
        onCancel={handleCaptchaCancel}
      />
    </View>
  );
}

export default Forget;
