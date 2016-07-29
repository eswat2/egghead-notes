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
  store.data.username = user;
});

const addNote = action((newNote) => {
  // update firebase with the new notes
  fireNotes.update(store.data.username, newNote);
});

const initStore = action(() => {
  let user = localStorage.getItem(USER_KEY);
  let parm = trunc_path(location.pathname, '/profile/');
  let who  = ( user ? (parm && parm !== user ? parm : user) : null );
  console.log(`-- initStore:  ${who}`);
  // console.log(location);
  // console.log(parm);
  store.data.username = (who ? who.toLowerCase() : null);

  store.data.kounter = 0;
  store.data.ktype   = 'info';
});

let ticker = 0;
let ticks  = 0;
let klock  = null;

const ping = action(() => {
  let kount = store.data.kounter;
  if (ticker === 5) {
    ticker = 0;
    store.data.kounter = (kount === 100) ? 0 : kount + 1;
  }
  else {
    ticker++;
  }
  ticks++;
});

const offline = action(() => {
  store.data.kounter = 100;
  store.data.ktype   = 'danger';
});

const newData = action((data) => {
  if (data.id === store.data.username) {
    store.data.notes = data.values;
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
  if (store.data.popState == null) {
    history.pushState({ username }, username, `/profile/${username}`);
  } else {
    store.data.popState = null;
  }
});

const _fetchNotes = action((username) => {
  console.log(`-- fetchNotes:  ${username}`);
  store.data.notes = [];
  if (username) {
    fireNotes.get(username);
  }
});

const _fetchGithub = action((username) => {
  console.log(`-- fetchGithub:  ${username}`);
  store.data.bio   = {};
  store.data.repos = [];
  if (username) {
    getGithubInfo(username)
      .then((data) => {
        console.log('-- api::githubInfo');
        console.log(data);

        store.data.bio   = data.bio;
        store.data.repos = data.repos;
        store.data.error = data.error;

        if (!store.data.error) {
          _saveUser(username);
          _pushState(username);

          if (!store.data.tags.includes(username)) {
            let list = [ ...store.data.tags, username ].sort();
            store.data.tags = list;
          }
        }
      })
  }
  else {
    store.data.popState = null;
  }
});

const _popHandler = action((pop) => {
  if (pop) {
    updateUser(pop.username)
  }
});

// eslint-disable-next-line
const autoGithub = autorun(() => _fetchGithub(store.data.username) );
// eslint-disable-next-line
const autoNotes  = autorun(() => _fetchNotes(store.data.username) );
// eslint-disable-next-line
const autoPop    = autorun(() => _popHandler(store.data.popState) );

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
