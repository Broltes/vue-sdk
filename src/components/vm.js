import { single } from '../modules/utils';

let vm = {
  lastTimestamp: 0,
  timestamp: 0,

  direction: 0,
  scrollTopMap: {},

  // view animation name
  animation: 'fade'
};
const delayForRoute = 100;

function fillState() {
  // set timrstamp for current route after route updated
  const delayForHistoryState = delayForRoute + 100;
  let currentState = history.state || {};

  setTimeout(function() {
    history.replaceState(Object.assign(currentState, {
      timestamp: vm.timestamp
    }), '', location.hash);
  }, delayForHistoryState);
}

function handler() {
  console.log(JSON.stringify(vm), location.hash)

  let currentState = history.state || {};
  let { timestamp } = currentState;

  if (timestamp === vm.timestamp) {
    // triggered by router-link, before hashchange
    timestamp = Date.now();
    // fill state after hashchanged
    fillState();
  }

  vm.lastTimestamp = vm.timestamp;
  vm.timestamp = timestamp || Date.now();
  vm.direction = vm.timestamp > vm.lastTimestamp ? 1 : -1;

  if (!timestamp) fillState();

  console.log(JSON.stringify(vm))
}

let initForRouter = single(function(router) {
  handler();
  router.beforeEach((to, from, next) => {
    // Triggering handler by router rather than onpopstate to solve:
    // router-link update $route before hashchange
    handler();
    // update route after vm updated
    setTimeout(next, delayForRoute);
  });

  return 1;
});

export default vm;
export {
  initForRouter
}
