import { action, autorun, useStrict } from 'mobx';
import fireNotes from './fireNotes';
import getGithubInfo from './helpers';
import store from './store';

useStrict(true);

const USER_KEY   = 'AppStore.username';
const trunc_path = (str, pattern) => {
  return (str.indexOf(pattern) !== -1) ? str.slice(str.indexOf(pattern) + pattern.length) : null;
}

const updateUser = action('-- updateUser', (username) => {
  let user = username.toLowerCase();
  console.log(`-- updateUser:  ${user}`);
  store.username.value = user;
});

const addNote = action('-- addNote', (newNote) => {
  // update firebase with the new notes
  fireNotes.update(store.username.value, newNote);
});

const initStore = action('-- initStore', () => {
  let user = localStorage.getItem(USER_KEY);
  let parm = trunc_path(location.pathname, '/profile/');
  let who  = ( user ? (parm && parm !== user ? parm : user) : null );
  console.log(`-- initStore:  ${who}`);
  // console.log(location);
  // console.log(parm);
  store.username.value = (who ? who.toLowerCase() : null);

  store.kounter.value = 0;
  store.ktype.value   = 'info';
});

let ticker = 0;
let ticks  = 0;
let klock  = null;

const ping = action('-- ping', () => {
  let kount = store.kounter.value;
  if (ticker === 5) {
    ticker = 0;
    store.kounter.value = (kount === 100) ? 0 : kount + 1;
  }
  else {
    ticker++;
  }
  ticks++;
});

const offline = action('-- offline', () => {
  store.kounter.value = 100;
  store.ktype.value   = 'danger';
});

const newData = action('-- newData', (data) => {
  if (data.type === 'KEYS') {
    store.keys.value = data.keys;
  }
  if (data.type === 'DATA') {
    if (data.id === store.username.value) {
      store.notes.value = data.values;
    }
  }
});

const setPopState = action('-- setPopState', (data) => {
  store.popState.value = data;
});

let last_kount = 0;

const _verifyWSS = action('-- verifyWSS', () => {
  // console.log('-- verifyWSS:  ' + ticks + ', ' + last_kount);
  if (ticks > 0 && ticks !== last_kount) {
    last_kount = ticks;
  }
  else {
    clearInterval(klock);
    offline();
  }
});

const startKlock = () => {
  klock = setInterval(() => {
    _verifyWSS();
  }, 10000);
}

const _saveUser = (username) => {
  // NOTE:  this is not an action since it doesn't manipulate the store...
  if (username !== null) {
    console.log(`-- saveUser:  ${username}`);
    localStorage.setItem(USER_KEY, username);
  }
}

const _pushState = action('-- pushState', (username) => {
  if (store.popState.value == null) {
    history.pushState({ username }, username, `/profile/${username}`);
  } else {
    store.popState.value = null;
  }
});

const _fetchNotes = action('-- fetchNotes', (username) => {
  console.log(`-- fetchNotes:  ${username}`);
  store.notes.value = [];
  if (username) {
    fireNotes.get(username);
  }
});

const newUserInfo = action('-- newUserInfo', (username, data) => {
  store.bio.value   = data.bio;
  store.repos.value = data.repos;
  store.error.value = data.error;

  if (!store.error.value) {
    _saveUser(username);
    _pushState(username);

    if (!store.tags.value.includes(username)) {
      let list = [ ...store.tags.value, username ].sort();
      store.tags.value = list;
    }
  }
});

const _fetchGithub = action('-- fetchGithub', (username) => {
  console.log(`-- fetchGithub:  ${username}`);
  store.bio.value   = {};
  store.repos.value = [];
  if (username) {
    getGithubInfo(username).then((data) => { newUserInfo(username, data); });
  }
  else {
    store.popState.value = null;
  }
});

const _popHandler = action('-- popHandler', (pop) => {
  if (pop) {
    updateUser(pop.username)
  }
});

// eslint-disable-next-line
const autoGithub = autorun(() => _fetchGithub(store.username.value) );
// eslint-disable-next-line
const autoNotes  = autorun(() => _fetchNotes(store.username.value) );
// eslint-disable-next-line
const autoPop    = autorun(() => _popHandler(store.popState.value) );

const actions = {
  addNote,
  initStore,
  newData,
  newUserInfo,
  offline,
  ping,
  setPopState,
  startKlock,
  updateUser
};

export default actions;
