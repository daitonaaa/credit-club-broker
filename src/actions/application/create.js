// DO NOT HAVE REDUCER

import api from 'api';

import { Slack, phoneUtils } from '@creditclub/helpers';

import {
  sendFiles,
  resetDocument,
} from 'actions/document';
import { addUiMessage } from 'actions/uiMessages';


export const createApplication = (form) => (dispatch, getState) => {
  return new Promise(async (resolve) => {
    const user = getState().user.data;
    const objectKeys = await dispatch(sendFiles());

    const { yaCounter55205317: metrika } = window;

    const applicationForm = {
      objectKeys,
      comment: form.comment.trim(),
      marketingData: {
        channel: 'Брокер',
      },
      person: {
        ...form.person,
        email: form.email,
        phone: phoneUtils.unParse(form.phone),
      }
    };

    await api.application.create(applicationForm)
      .catch(() => {
        Slack.sendNotification('Новый лид от брокера', {
          brokerId: user.id,
          brokerName: user.fullName,
          ...applicationForm.person,
        })
      });

    dispatch(addUiMessage({
      type: 'static',
      text: 'Ваша заявка обрабатывается, скоро она появится в списке заявок'
    }));

    if (metrika) {
      metrika.reachGoal('broker-lead');
    }

    dispatch(resetDocument());
    resolve();
  })
};
