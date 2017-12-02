import React from 'react';
import { authError, register, login, logout, getStrings, addString, editString, getString } from '../../actions/index';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ });    
  });

  afterEach(() => {
    mock.reset();
  });

  it('should dispatch the correct action for register', (done) => {
    mock.onPost('http://localhost:5000/register').reply(200, {
      username: 'nick'
    });
    store.dispatch(register({username: 'nick', password: 'nick', confirmPassword: 'nick'})).then(() => {
      expect(store.getActions()[0].type).toBe('USER_AUTHENTICATED');
      done();
    });
  });

  it('should dispatch the correct action for register if passwords do not match', (done) => {
    store.dispatch(register({username: 'nick', password: 'nick', confirmPassword: 'alex'}));
    expect(store.getActions()[0].type).toBe('AUTHENTICATION_ERROR');
    done();
  });

  it('should dispatch the correct action for login', (done) => {
    mock.onPost('http://localhost:5000/login').reply(200, {
      username: 'nick'
    });
    
    store.dispatch(login({username: 'nick', password: 'nick'})).then(() => {
      expect(store.getActions()[0].type).toBe('USER_AUTHENTICATED');
      done();
    });
  });

  it('should dispatch the correct action for login if username/password combination is incorrect', (done) => {
    mock.onPost('http://localhost:5000/login').reply(404, {
      username: 'nick'
    });
    
    store.dispatch(login({username: 'nick', password: 'alex'})).then(() => {
      expect(store.getActions()[0].type).toBe('AUTHENTICATION_ERROR');
      done();
    });
  });

  it('should dispatch the correct action for logout', (done) => {
    mock.onGet('http://localhost:5000/logout').reply(200);
    store.dispatch(logout()).then(() => {
      expect(store.getActions()[0].type).toBe('USER_UNAUTHENTICATED');
      done();
    });
  });

  it('should return the correct action for getStrings', (done) => {
    mock.onGet('http://localhost:5000/strings').reply(200);
    store.dispatch(getStrings()).then(() => {
      expect(store.getActions()[0].type).toBe('GET_STRINGS');
      done();
    });
  });

  it('should return the correct action for getString', (done) => {
    mock.onGet('http://localhost:5000/strings/555').reply(200);
    store.dispatch(getString(555)).then(() => {
      expect(store.getActions()[0].type).toBe('GET_STRING');
      done();
    });
  });

  it('should return the correct action for addString', (done) => {
    mock.onPost('http://localhost:5000/strings/',).reply(200);
    store.dispatch(addString({
      title: 'aaaa',
      content: 'aaaa',
      imageURL: 'aaaa',
      manufacturer: 'aaaa',
      coreMaterial: 'aaaa',
      outerMaterial: 'aaaa',
      tonalTraits: 'aaaa',
      author: 'aaaa'
    }, [])).then(() => {
      expect(store.getActions()[0].type).toBe('ADD_STRING');
      done();
    });
  });

  it('should return the correct action for editString', (done) => {
    mock.onPut('http://localhost:5000/strings/555',).reply(200);
    store.dispatch(editString(555,
    {
      title: 'aaaa',
      content: 'aaaa',
      imageURL: 'aaaa',
      manufacturer: 'aaaa',
      coreMaterial: 'aaaa',
      outerMaterial: 'aaaa',
      tonalTraits: 'aaaa',
      author: 'aaaa'
    }, [])).then(() => {
      expect(store.getActions()[0].type).toBe('EDIT_STRING');
      done();
    });
  });
  
});
