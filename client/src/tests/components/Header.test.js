import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

describe('Register Component', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Header />);    
  });

  it('should render two div tags', () => {
    expect(component.find('div').length).toBe(2);
  });

  it('should render one nav tag', () => {
    expect(component.find('nav').length).toBe(1);
  });

  it('should render one ul tag', () => {
    expect(component.find('ul').length).toBe(1);
  });

  it('should render two links when authenticated', () => {
    component.setProps({ authenticated: true });
    expect(component.find('Link').length).toBe(2);
  });

  it('should render three links when not authenticated', () => {
    component.setProps({ authenticated: false });
    expect(component.find('Link').length).toBe(3);
  });

  it('the logout link should point to /logout', () => {
    component.setProps({ authenticated: true });
    expect(component.find('Link').at(1).prop('to')).toBe('/logout');
    expect(component.find('Link').at(1).prop('children')).toBe('Log Out');
  });

  it('the login link should point to /login', () => {
    component.setProps({ authenticated: false });
    expect(component.find('Link').at(1).prop('to')).toBe('/login');
    expect(component.find('Link').at(1).prop('children')).toBe('Log In');
  });

  it('the register link should point to /register', () => {
    component.setProps({ authenticated: false });
    expect(component.find('Link').at(2).prop('to')).toBe('/register');
    expect(component.find('Link').at(2).prop('children')).toBe('Register');
  });

  it('the home link should point to /strings', () => {
    expect(component.find('Link').at(0).prop('to')).toBe('/strings');
    expect(component.find('Link').at(0).prop('children')).toBe('Home');
  });
});