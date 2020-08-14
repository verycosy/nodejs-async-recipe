const asyncModule = module.exports;

asyncModule.initialized = false;
asyncModule.initialize = (cb) => {
  setTimeout(() => {
    asyncModule.initialized = true;
    cb();
  }, 10000);
};

asyncModule.tellMeSomething = (cb) => {
  process.nextTick(() => {
    if (!asyncModule.initialized) {
      return cb(new Error("I don't have anything to say right now"));
    }

    cb(null, "Current time is : " + new Date());
  });
};
