import co from 'co';
import api from 'api';
import { isEmpty } from 'ramda';
import * as Sentry from '@sentry/browser';
import { addError } from 'actions/error';
import * as actionTypes from 'constants/actionTypes';


const updateFiles = (files) => ({
  type: actionTypes.DOCUMENT_UPDATE_FILES,
  files,
});


export const deleteFile = (fileName) => ({
  type: actionTypes.DOCUMENT_DELETE_FILE,
  fileName,
});


export const resetDocument = () => ({
  type: actionTypes.DOCUMENT_RESET,
});


const updateFileToProgress = (fileName, progress) => ({
  type: actionTypes.DOCUMENT_UPDATE_FILE_UPLOAD_PROGRESS,
  fileName, progress,
});


const uploadProgress = ({ loaded, total }, file) => (dispatch) => {
  const progress = Math.round(loaded * 100 / total);

  dispatch(updateFileToProgress(file.name, progress));
};


export const onDropFiles = (files, unsupportedFiles) => (dispatch, getState) => {
  if (!isEmpty(unsupportedFiles)) {
    unsupportedFiles.forEach((file) => console.error(`file ${file.name} is not supported`))
  }

  if (!isEmpty(files)) {
    const filesList = [];
    const { files: attach } = getState().document;

    files.forEach((file) => {
      if (
        file.size > 0 &&
        !attach.find(({ name }) => name === file.name)
      ) {
        filesList.push(file);
      }
    });

    dispatch(updateFiles(filesList));
  }
};


export const sendFiles = () => async (dispatch, getState) => {
  const { files } = getState().document;
  if (isEmpty(files)) return null;

  const { data } = await api.document.getTemporaryUrls((
    files.map(file => file.name)
  ));

  Sentry.captureEvent({
    message: `Брокер ${getState().user.data.fullName} отправил файлы`,
    level: 'log',
    extra: {
      startUploadDate: new Date().toString(),
      files: {
        totalCount: files.length,
        data: files.map(({ name, size, type }) => ({
          name, size, type,
          temporary: data.find(item => item.filename === name),
        })),
      }
    }
  });

  function* sendFilesGen() {
    for (let i = 0; i < data.length; i++) {
      const dataFile = data[i];
      const file = files.find(item => item && item.name === dataFile.filename);

      yield api.document
        .sendFile(dataFile.url, file, file.type, (progress) => dispatch(uploadProgress(progress, file)))
        .catch((err) => {
          dispatch(addError({
            err: {
              origin: err,
              extra: {
                actionMethod: 'api.document.sendFile',
              }
            }
          }));
        });
    }
  }

  await co(sendFilesGen());

  return data.map(item => item.objectKey);
};
