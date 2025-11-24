module.exports = {
    default: {
      require: [
        'ts-node/register',
        'src/steps/**/*.ts',
        'src/support/**/*.ts'
      ],
      publishQuiet: true,
      format: ['progress', 'html:reports/cucumber-report.html'],
      paths: ['features/**/*.feature'],
      worldParameters: {}
    }
  };
  module.exports = {
  default: {
    require: [
      'ts-node/register',
      'src/steps/**/*.ts',
      'src/support/**/*.ts'
    ],
    format: ['progress'],
    paths: ['features/**/*.feature']
  }
};
