import React from 'react';
import { shallow } from 'enzyme';
import { Register } from '../../components/Register';

describe('Register Component', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Register />);    
  });

  it('should render one h1 tag', () => {
    expect(component.find('h1').length).toBe(1);
  });

  it('should render one form tag', () => {
    expect(component.find('form').length).toBe(1);
  });

  it('should render four div tags', () => {
    expect(component.find('div').length).toBe(4);
  });

  it('should render three label tags', () => {
    expect(component.find('label').length).toBe(3);
  });

  it('should render four input tags', () => {
    expect(component.find('input').length).toBe(4);
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

  it('should set confirmPassword on input change', () => {
    const value = 'nick';
    component.find('input').at(2).simulate('change', {
      target: { value }
    });
    expect(component.state('confirmPassword')).toBe(value);
  });

  it('should render an alert if passwords do not match', () => {
    component.setProps({ error: 'Passwords do not match' });
    expect(component.find('h3').length).toBe(1);
  });

  it('should call register when form is submitted', () => {
    const register = jest.fn();
    const props = {
      register
    }
    component = shallow(<Register { ...props }/>);    
    
    component.find('form').simulate('submit', { preventDefault() {} });
    expect(register).toHaveBeenCalled();
  });
});