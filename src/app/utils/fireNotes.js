import actions from './actions';

let WSS_URI = 'wss://fire-notes.herokuapp.com';
let wss = null;

let onOpen = (evt) => {
  console.log('-- wss: Open');
  actions.initStore();
  actions.startKlock();
}

let onClose = (evt) => {
  console.log('-- wss: Close');
  actions.offline();
}

let onMessage = (evt) => {
  if (evt.data === 'ping') {
    // console.log(evt.data);
    actions.ping();
  }
  else {
    console.log('-- wss: ' + evt.data);
    var data = JSON.parse(evt.data);
    // console.log(data);
    actions.newData(data);
  }
}

let onError = (evt) => {
  console.log('-- wss: Error');
}

let initWebSocket = () => {
  wss = new WebSocket(WSS_URI);

  wss.onopen    = (evt) => { onOpen(evt)    };
  wss.onclose   = (evt) => { onClose(evt)   };
  wss.onmessage = (evt) => { onMessage(evt) };
  wss.onerror   = (evt) => { onError(evt)   };
}

let getData = (id) => {
  wss.send(JSON.stringify({ type:'GET', id }));
}

let getKeys = () => {
  wss.send(JSON.stringify({ type:'KEYS' }));
}

let updateData = (id, value) => {
  wss.send(JSON.stringify({ type:'POST', id, value }))
}

initWebSocket();

let fireNotes = {
  get: getData,
  keys: getKeys,
  update: updateData
}

export default fireNotes;
