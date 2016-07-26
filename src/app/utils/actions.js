import { action, autorun } from 'mobx';
import fauxBase from './fauxBase';
import getGithubInfo from './helpers';
import store from './store';

const updateUser = action((username) => {
  console.log(`-- updateUser:  ${username}`);
  store.data.username = username;
});

const addNote = action((newNote) => {
  // update firebase with the new notes
  fauxBase.update('notes', store.data.username, [ ...store.data.notes, newNote ])
    .then((data) => {
      console.log('-- api::notes [ update ]');
      console.log(data);

      store.data.notes = data.values;
    });
});

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
    fauxBase.get('notes', username)
      .then((data) => {
        console.log('-- api::notes [ get ]');
        console.log(data);

        store.data.notes = data.values;
      })
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
          store.saveUser(username);
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
  updateUser
};

export default actions;
