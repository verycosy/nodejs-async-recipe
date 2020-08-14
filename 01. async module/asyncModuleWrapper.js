const asyncModule = require("./asyncModule");
const asyncModuleWrapper = module.exports;

asyncModuleWrapper.initialized = false;
asyncModuleWrapper.initialize = function () {
  activeState.initialize.apply(activeState, arguments);
};

asyncModuleWrapper.tellMeSomething = function () {
  activeState.tellMeSomething.apply(activeState, arguments);
};

let pending = [];
const notInitializedState = {
  initialize: function (callback) {
    asyncModule.initialize(function () {
      asyncModuleWrapper.initialized = true;
      activeState = initializedState;

      pending.forEach(function (req) {
        asyncModule[req.method].apply(null, req.args);
      });

      pending = [];
      callback();
    });
  },
  tellMeSomething: function (callback) {
    return pending.push({
      method: "tellMeSomething",
      args: arguments,
    });
  },
};

let initializedState = asyncModule;
let activeState = notInitializedState;
