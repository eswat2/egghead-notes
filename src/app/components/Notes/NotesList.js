import React from 'react'

import { observer } from 'mobx-react'
import store from '../../utils/store'

const NotesList = observer(() => {
  // console.log('-- render:  NotesList');
  const notes = store.notes.value
  return (
    <ul className="list-group">
      {notes.map((note, index) => <li className="list-group-item" key={index}>{note}</li>)}
    </ul>
  )
})

export default NotesList
