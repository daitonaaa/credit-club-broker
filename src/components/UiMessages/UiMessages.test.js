import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { UiMessage } from 'actions/uiMessages';

import UiMessages from './UiMessages';


describe('UiMessages', () => {
  const mockStore = configureStore();
  const initialState = {
    uiMessages: {
      messages: [],
    }
  };
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = mount(<UiMessages store={store} />);
  });

  test('Рендер компонента', () => {
    console.log(container.debug());
    expect(container).toMatchSnapshot();
  });
});
