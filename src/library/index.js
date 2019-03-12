export function customEvent(eventCallName, data){
  var createdEvent = new CustomEvent(eventCallName, { 'data': data });
  global.dispatchEvent(createdEvent);
};
