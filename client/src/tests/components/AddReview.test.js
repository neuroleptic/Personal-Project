import React from 'react';
import { shallow } from 'enzyme';
import { AddReview } from '../../components/AddReview';

describe('Register Component', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddReview />);    
  });

  it('should render one h1 tag', () => {
    expect(component.find('h1').length).toBe(1);
  });

  it('should render the h1 tag with correct text', () => {
    expect(component.find('h1').text()).toBe('Add a review');
  });

  it('should render one form tag', () => {
    expect(component.find('form').length).toBe(1);
  });

  it('should render three div tags', () => {
    expect(component.find('div').length).toBe(3);
  });

  it('should render one span tag', () => {
    expect(component.find('span').length).toBe(1);
  });

  it('should render one label tag', () => {
    expect(component.find('label').length).toBe(1);
  });

  it('should render one StarRatings component', () => {
    expect(component.find('StarRatings').length).toBe(1);
  });

  it('should set text on input change', () => {
    const value = 'test';
    component.find('input').at(0).simulate('change', {
      target: { value }
    });
    expect(component.state('text')).toBe(value);
  });

  it('should set rating when changeRating is called', () => {
    component.find('StarRatings').prop('changeRating')(1);
    expect(component.state('rating')).toBe(1);
  });

  it('should call addReview when form is submitted', () => {
    const addReview = jest.fn();
    const props = {
      addReview,
      match: {
        params: {

        }
      }
    }
    component = shallow(<AddReview { ...props }/>);    
    
    component.find('form').simulate('submit', { preventDefault() {} });
    expect(addReview).toHaveBeenCalled();
  });

  it('should call addReview with the correct arguments', () => {
    const addReview = jest.fn();
    const history = { };
    const match = {
      params: {
        id: 1
      }
    }
    const props = {
      addReview,
      match,
      history
    }
    const review = {
      text: '',
      rating: 3
    }
    component = shallow(<AddReview { ...props }/>);    
    
    component.find('form').simulate('submit', { preventDefault() {} });
    expect(addReview).toHaveBeenLastCalledWith(match.params.id, review, history);
  });
});