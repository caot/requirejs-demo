require.config({
  baseUrl: "./",
  urlArgs: "v=1." + new Date().getTime(),
  paths: {
    'sum': './sum',
  },
  shim: {
    'sum': {
      deps: [],
      exports: 'sum'
    }
  }
});

define(['jquery_plugin/sum'], function (sum) {
  console.log(sum);
  sum(2, 2);
});
