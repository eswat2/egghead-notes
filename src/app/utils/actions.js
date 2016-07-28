import { action, autorun } from 'mobx';
import fireNotes from './fireNotes';
import getGithubInfo from './helpers';
import store from './store';

const updateUser = action((username) => {
  console.log(`-- updateUser:  ${username}`);
  store.data.username = username;
});

const addNote = action((newNote) => {
  // update firebase with the new notes
  fireNotes.update(store.data.username, newNote);
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
