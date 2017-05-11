let vm = {
  lastTimestamp: 0,
  timestamp: 0,

  direction: 0,
  scrollTopMap: {}
};

function fillState() {
  let currentState = history.state || {};
  history.replaceState(Object.assign(currentState, {
    timestamp: vm.timestamp
  }), '', location.hash);
}

function handler() {
  console.log(JSON.stringify(vm), location.hash)

  let currentState = history.state || {};
  let { timestamp } = currentState;

  if (timestamp === vm.timestamp) {
    // triggered by router-link, before hashchange
    timestamp = Date.now();
    // fill state after hashchanged
    setTimeout(fillState, 99);
  }

  vm.lastTimestamp = vm.timestamp;
  vm.timestamp = timestamp || Date.now();
  vm.direction = vm.timestamp > vm.lastTimestamp ? 1 : -1;

  if (!timestamp) fillState();

  console.log(JSON.stringify(vm))
}

let routerInited;
function initForRouter(router) {
  if (routerInited) return;

  handler();
  router.beforeEach((to, from, next) => {
    // Triggering handler by router rather than onpopstate to solve:
    // router-link update $route before hashchange
    handler();
    setTimeout(next);
  });
  routerInited = 1;
}

export default vm;
export {
  initForRouter
}
