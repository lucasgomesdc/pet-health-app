export function customEvent(eventCallName, data){
  var createdEvent = new CustomEvent(eventCallName, { 'detail': data });
  global.dispatchEvent(createdEvent);
};
