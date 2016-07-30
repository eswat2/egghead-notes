import { action, autorun } from 'mobx';
import fireNotes from './fireNotes';
import getGithubInfo from './helpers';
import store from './store';

const USER_KEY   = 'AppStore.username';
const trunc_path = (str, pattern) => {
  return (str.indexOf(pattern) !== -1) ? str.slice(str.indexOf(pattern) + pattern.length) : null;
}

const updateUser = action((username) => {
  let user = username.toLowerCase();
  console.log(`-- updateUser:  ${user}`);
  store.username.value = user;
});

const addNote = action((newNote) => {
  // update firebase with the new notes
  fireNotes.update(store.username.value, newNote);
});

const initStore = action(() => {
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

const ping = action(() => {
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

const offline = action(() => {
  store.kounter.value = 100;
  store.ktype.value   = 'danger';
});

const newData = action((data) => {
  if (data.type === 'KEYS') {
    store.keys.value = data.keys;
  }
  if (data.type === 'DATA') {
    if (data.id === store.username.value) {
      store.notes.value = data.values;
    }
  }
});

let last_kount = 0;

const _verifyWSS = action(() => {
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

const _pushState = action((username) => {
  if (store.popState.value == null) {
    history.pushState({ username }, username, `/profile/${username}`);
  } else {
    store.popState.value = null;
  }
});

const _fetchNotes = action((username) => {
  console.log(`-- fetchNotes:  ${username}`);
  store.notes.value = [];
  if (username) {
    fireNotes.get(username);
  }
});

const _fetchGithub = action((username) => {
  console.log(`-- fetchGithub:  ${username}`);
  store.bio.value   = {};
  store.repos.value = [];
  if (username) {
    getGithubInfo(username)
      .then((data) => {
        console.log('-- api::githubInfo');
        console.log(data);

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
      })
  }
  else {
    store.popState.value = null;
  }
});

const _popHandler = action((pop) => {
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
  updateUser,
  initStore,
  ping,
  offline,
  newData,
  startKlock
};

export default actions;
