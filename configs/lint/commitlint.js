module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // header最大94字符
    'header-max-length': [0, 'always', 94],

    // subject不能为空
    'subject-empty': [2, 'never'],

    // type必须在指定范围内
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'chore', 'ci', 'perf', 'refactor', 'test', 'build', 'init'],
    ],
    // type不能为空
    'type-empty': [2, 'never'],

    // type必须小写
    'type-case': [2, 'always', 'lowerCase'],

    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0],
    'subject-case': [0],
  },
  prompt: {
    messages: {
      type: '请选择提交类型:',
      customScope: '请输入修改范围(可选):',
      subject: '请简要描述提交(必填):',
      body: '请输入详细描述(可选):',
      footer: '请输入要关闭的issue(可选):',
      confirmCommit: '确认使用以上信息提交？(y/n/e/h)',
    },
    types: [
      { value: 'feat', name: 'feat:     新功能' },
      { value: 'fix', name: 'fix:      修复' },
      { value: 'docs', name: 'docs:     文档变更' },
      { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
      {
        value: 'refactor',
        name: 'refactor: 重构(既不是增加feature，也不是修复bug)',
      },
      { value: 'perf', name: 'perf:     性能优化' },
      { value: 'test', name: 'test:     增加测试' },
      { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
      { value: 'revert', name: 'revert:   回退' },
      { value: 'build', name: 'build:    打包' },
    ],
    // 跳过问题
    skipQuestions: ['body', 'footer', 'issues type', 'customScope', 'breaking', 'private', 'scope'],
    // subject文字长度默认是72
    subjectLimit: 72,
  },
}
