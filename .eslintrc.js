module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // 语句末尾分号
    'semi': [2, 'always'],
    // 字符串单引号
    'quotes': [2, 'single'],
    // 多行尾随逗号
    'comma-dangle': [2, 'never'],
    // 对象括号空格
    'arrow-spacing': [2, { before: true, after: true }],
    // 箭头函数括号
    'arrow-parens': [2, 'as-needed'],
    // 文件末尾换行
    'eol-last': [2],
    // 禁止未使用的变量
    '@typescript-eslint/no-unused-vars': [2],

    'react/no-unstable-nested-components': [0],
    'react-hooks/exhaustive-deps': [0],
    'react-native/no-inline-styles': [0]
  }
};