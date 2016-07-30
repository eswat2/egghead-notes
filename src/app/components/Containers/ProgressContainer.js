import React from 'react';

import { observer } from 'mobx-react';
import store from '../../utils/store';

const ProgressContainer = observer(() => {
  // console.log('-- render:  ProgressContainer');
  let klassNames = 'progress-bar progress-bar-' + store.ktype.value;
  return (
    <div className="progress" style={{height:2,borderRadius:0}}>
      <div className={klassNames} role="progressbar" style={{width: store.kounter.value + '%'}}>
      </div>
    </div>
  )
})

export default ProgressContainer;
