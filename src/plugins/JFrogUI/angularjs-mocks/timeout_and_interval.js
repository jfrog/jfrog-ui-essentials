AngularTimeoutServiceMock.cancel = function (handler) {
  clearTimeout(handler);
}
export function AngularTimeoutServiceMock(cb, to = 0) {
  return setTimeout(cb, to);
}

AngularIntervalServiceMock.cancel = function (handler) {
  clearInterval(handler);
}
export function AngularIntervalServiceMock(cb, to = 0) {
  return setInterval(cb, to);
}

