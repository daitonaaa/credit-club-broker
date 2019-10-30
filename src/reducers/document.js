import Immutable from 'immutable';

import { immutableize } from '@creditclub/helpers';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  files: [],
  filesUploadProgress: [],
});


const document = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.DOCUMENT_UPDATE_FILES:
      return state
        .update('files', files => files.push(...action.files))
        .update('filesUploadProgress', list => list.push(
          ...action.files.map(item => ({ fileName: item.name, progress: 0 }))
        ));

    case actionTypes.DOCUMENT_DELETE_FILE: {
      const fileIndex = state.get('files').findIndex(
        item => item.name === action.fileName
      );

      const progressIndex = state.get('filesUploadProgress').findIndex(
        item => item.get('fileName') === action.fileName
      );

      return state
        .deleteIn(['files', fileIndex])
        .deleteIn(['filesUploadProgress', progressIndex]);
    }

    case actionTypes.DOCUMENT_UPDATE_FILE_UPLOAD_PROGRESS: {
      let itemIndex = state.get('filesUploadProgress').findIndex(
        item => item.get('fileName') === action.fileName
      );

      return state.setIn(['filesUploadProgress', itemIndex, 'progress'], action.progress);
    }

    case actionTypes.DOCUMENT_RESET:
      return initialState;

    default:
      return state;
  }
};


export default immutableize(document);
