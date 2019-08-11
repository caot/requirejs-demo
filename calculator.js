require.config({
  baseUrl: "./",
  urlArgs: "v=1." + new Date().getTime(),
  paths: {
    'sum': 'sum',
  },
  shim: {
    'sum': {
      deps: [],
      exports: 'sum'
    }
  }
});

define(['sum'], function (sum) {
  console.log(sum);
  sum(2, 2);
});
