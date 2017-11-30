import React from 'react';
import { shallow } from 'enzyme';
import { LogIn } from '../../components/LogIn';

describe('LogIn Component', () => {
  let component;
  beforeEach(() => {
    component = shallow(<LogIn />);    
  });

  it('should render one h1 tag', () => {
    expect(component.find('h1').length).toBe(1);
  });

  it('should render three input tags', () => {
    expect(component.find('input').length).toBe(3);
  });

  it('should render two label tags', () => {
    expect(component.find('label').length).toBe(2);
  });

  it('should render one form tag', () => {
    expect(component.find('form').length).toBe(1);
  });

  it('should render three div tags', () => {
    expect(component.find('div').length).toBe(3);
  });

  it('should set username on input change', () => {
    const value = 'nick';
    component.find('input').at(0).simulate('change', {
      target: { value }
    });
    expect(component.state('username')).toBe(value);
  });

  it('should set password on input change', () => {
    const value = 'nick';
    component.find('input').at(1).simulate('change', {
      target: { value }
    });
    expect(component.state('password')).toBe(value);
  });

  it('should render an alert if there is an error', () => {
    component.setProps({ error: 'Incorrect email/password combo' });
    expect(component.find('h3').length).toBe(1);
  });

  it('should call login when form is submitted', () => {
    const login = jest.fn();
    const props = {
      login
    }
    component = shallow(<LogIn { ...props }/>);    
    
    component.find('form').simulate('submit', { preventDefault() {} });
    expect(login).toHaveBeenCalled();
  });
});