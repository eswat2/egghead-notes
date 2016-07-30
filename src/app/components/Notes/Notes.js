import React from 'react';
import NotesList from './NotesList';
import AddNote from './AddNote';

import { observer } from 'mobx-react';
import store from '../../utils/store';

const Notes = observer(() => {
  // console.log('-- render:  Notes');
  const username = store.username.value;
  return (
    <div>
      <h3>Notes for {username} </h3>
      <AddNote />
      <NotesList />
    </div>
  )
})

export default Notes;
