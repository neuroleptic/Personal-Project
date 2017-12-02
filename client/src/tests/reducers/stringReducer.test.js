import stringReducer from '../../reducers/stringReducer.js'

it('should set up default values', () => {
  const state = stringReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
});

it('should return correct state when action type is GET_STRINGS', () => {
  const action = {type: 'GET_STRINGS',
                  payload: {data: [{
                    title: 'aaaa',
                    content: 'aaaa',
                    imageURL: 'aaaa',
                    manufacturer: 'aaaa',
                    coreMaterial: 'aaaa',
                    outerMaterial: 'aaaa',
                    tonalTraits: 'aaaa',
                    author: 'aaaa'
                  }]}};
  const state = stringReducer(undefined, action);
  expect(state).toEqual([{
    title: 'aaaa',
    content: 'aaaa',
    imageURL: 'aaaa',
    manufacturer: 'aaaa',
    coreMaterial: 'aaaa',
    outerMaterial: 'aaaa',
    tonalTraits: 'aaaa',
    author: 'aaaa'
  }]);
});
