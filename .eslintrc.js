module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // 禁止使用var
    'no-var': [2],
    // 禁止未使用的变量
    '@typescript-eslint/no-unused-vars': [2],
    // 字符串单引号
    'quotes': [2, 'single'],
    // 对象末尾逗号
    'comma-dangle': [2, 'never'],
    // 语句末尾分号
    'semi': [2, 'always'],
    // 箭头函数前后空格
    'arrow-spacing': [2, { before: true, after: true }],
    // 箭头函数参数括号
    'arrow-parens': [2, 'as-needed'],
    // 全等(===、!==)
    'eqeqeq': [2],
    // 空格缩进
    'indent': [2, 2],
    // 文件末尾换行
    'eol-last': [2],

    'react/no-unstable-nested-components': [0],
    'react-hooks/exhaustive-deps': [0],
    'react-native/no-inline-styles': [0]
  }
};
