import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

import url from './urls';
import { token } from '@creditclub/helpers';

import Layout from 'components/Layout';

import {
  Home,
  Login,
  Reward,
  Applications,
  CreateApplication,
} from 'components/pages';


const routes = [
  {
    component: connectedAuthWrapper({
      authenticatedSelector: () => token.isLogin(),
      wrapperDisplayName: 'loginOrLayout',
      FailureComponent: Login,
    })(Layout),

    routes: [
      {
        ...url.login,
        title: 'Вход',
        component: Login,
      },
      {
        ...url.application,
        title: 'Мои заявки',
        component: Applications,
      },
      {
        ...url.createApplication,
        title: 'Новая заявка',
        component: CreateApplication,
      },
      {
        ...url.reward,
        title: 'Вознаграждения',
        component: connectedAuthWrapper({
          authenticatedSelector: (state) => {
            const { accessRights } = state.user.data;

            return accessRights.hasPermission(accessRights.ps.WORKER_VIEW_REWARD);
          },
          wrapperDisplayName: 'homeOrReward',
          FailureComponent: Home,
        })(Reward),
      },
      {
        component: Home,
      }
    ]
  }
];

export default routes;
