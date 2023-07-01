const async = require("async");
function userDetails() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("userDetails"), 4000);
  });
}
const promiseFn = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Hello World"), 3000);
  });
};
const demo = async (req, res) => {
  async.waterfall(
    [
      function (callback) {
        userDetails().then((resp) => {
          callback(null, "first", { resp: resp });
        });
      },
      function (arg1, arg2, callback) {
        promiseFn().then((resp) => {
          console.log(arg1, arg2, "second function called");
          callback(null, resp, { resp: arg2 });
        });
        // callback(null, "second", { id: 2 });
      },
      function (arg1, arg2, callback) {
        console.log(arg1, arg2, "third function called");
        callback(null, arg1, { resp: arg2 });
      },
    ],
    function (err, arg1, arg2) {
      console.log(err, arg1, arg2, "hello world");
      // Result now equals 'complete'
    }
  );
};
demo();

const demo1 = async (req, res) => {
  async.series(
    [
      function (callback) {
        userDetails().then((data) => {
          callback(null, data + "onedata");
        });
        // do something...
      },
      function (callback) {
        promiseFn().then((data) => {
          callback(null, data + "dataSecond");
        });
        // do something...
      },
    ],
    // callback(optional)
    function (err, results) {
      console.log(results, "results");
      /* Results is now equal to
       ['one', 'two'] and this is
       returned from all the tasks
       executed above.*/
    }
  );
};
// demo1();

function demo2() {
  async.parallel(
    [
      function (callback) {
        userDetails().then((data) => {
          callback(null, data + "first");
        });
      },
      function (callback) {
        promiseFn().then((data) => {
          callback(null, data + "second");
        });
      },
      function (callback) {
        // The arg1 now equals 'two'
        callback(null, "third");
      },
    ],
    function (err, result) {
      console.log(err, result, "demo2");
      // Result now equals 'complete'
    }
  );
}
// demo2();
