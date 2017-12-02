import authReducer from '../../reducers/authReducer.js'

it('should set up default values', () => {
  const state = authReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual({});
});

it('should return correct state when action type is USER_AUTHENTICATED', () => {
  const action = {type: 'USER_AUTHENTICATED',
                  payload: {data: { username: 'nick'}}};
  const state = authReducer(undefined, action);
  expect(state).toEqual({ authenticated: true, username: 'nick', error: '' });
});

it('should return correct state when action type is USER_UNAUTHENTICATED', () => {
  const action = {type: 'USER_UNAUTHENTICATED'};
  const state = authReducer(undefined, action);
  expect(state).toEqual({ authenticated: false, username: ''});
});

it('should return correct state when action type is AUTHENTICATION_ERROR', () => {
  const action = {type: 'AUTHENTICATION_ERROR', payload: 'Passwords do not match'};
  const state = authReducer(undefined, action);
  expect(state).toEqual({ error: 'Passwords do not match'});
});