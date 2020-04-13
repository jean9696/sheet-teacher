const bundlewatchConfig = {
  files: [
    {
      path: "./build-bundlewatch/**/*.js",
      maxSize: "800 kB"
    },
    {
      path: "./build-bundlewatch/**/*main*.js",
      maxSize: "400 kB"
    }
  ],
  ci: {
    repoBranchBase: 'dev',
    trackBranches: ['dev'],
  },
}
module.exports = bundlewatchConfig