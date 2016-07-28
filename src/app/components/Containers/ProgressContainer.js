import React from 'react';

import { observer } from 'mobx-react';
import store from '../../utils/store';

const ProgressContainer = observer(() => {
  // console.log('-- render:  ProgressContainer');
  let klassNames = 'progress-bar progress-bar-' + store.data.ktype;
  return (
    <div className="progress" style={{height:2,borderRadius:0}}>
      <div className={klassNames} role="progressbar" style={{width: store.data.kounter + '%'}}>
      </div>
    </div>
  )
})

export default ProgressContainer;
