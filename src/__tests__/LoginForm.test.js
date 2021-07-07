import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {Button} from '../forms/FormsStyles';
import CustomBrowserRouter from '../helpers/CustomBrowserRouter';
import LoginForm from '../forms/LoginForm';
import { beforeEach, describe, expect, it } from "@jest/globals";

const defaultStore = {responsive: {fakeWidth: 1200}};
const mockedStore = configureStore()(defaultStore);

export const mountWithProvider = (children) => (store = mockedStore) =>
  mount(
    <Provider store={store}>
      <CustomBrowserRouter>{children}</CustomBrowserRouter>
    </Provider>
  );

const mockStore = configureStore([]);

describe('Testing LoginForm component', () => {
  let store;
  let component;
  let mountCmp;

  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });

    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <CustomBrowserRouter>
          <LoginForm />
        </CustomBrowserRouter>
      </Provider>
    );

    mountCmp = mountWithProvider(<LoginForm />)();
  });

  it('component renders correctly', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('LoginForm exists as connected mounted component', () => {
    expect(mountCmp.find(LoginForm).length).toBe(1);
  });

  it('submit button exists', () => {
    expect(mountCmp.find(Button).length).toBe(1);
  });

  it('button should have submit type', () => {
    expect(component.root.findByType(Button).props.type).toBe('submit');
  });
});
