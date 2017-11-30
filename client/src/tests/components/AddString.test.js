import React from 'react';
import { shallow } from 'enzyme';
import { AddString } from '../../components/AddString';

describe('Register Component', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddString />);    
  });

  it('should render one h1 tag', () => {
    expect(component.find('h1').length).toBe(1);
  });

  it('should render one form tag', () => {
    expect(component.find('form').length).toBe(1);
  });

  it('should render the h1 tag with correct text', () => {
    expect(component.find('h1').text()).toBe('Add a new string');
  });

  it('should render eight input tags', () => {
    expect(component.find('input').length).toBe(8);    
  });

  it('should render seven label tags', () => {
    expect(component.find('label').length).toBe(7);    
  });

  it('should set title on input change', () => {
    const value = 'test';
    component.find('input').at(0).simulate('change', {
      target: { value }
    });
    expect(component.state('title')).toBe(value);
  });

  it('should set content on input change', () => {
    const value = 'test';
    component.find('input').at(1).simulate('change', {
      target: { value }
    });
    expect(component.state('content')).toBe(value);
  });

  it('should set imageURL on input change', () => {
    const value = 'test';
    component.find('input').at(2).simulate('change', {
      target: { value }
    });
    expect(component.state('imageURL')).toBe(value);
  });

  it('should set manufacturer on input change', () => {
    const value = 'test';
    component.find('input').at(3).simulate('change', {
      target: { value }
    });
    expect(component.state('manufacturer')).toBe(value);
  });

  it('should set coreMaterial on input change', () => {
    const value = 'test';
    component.find('input').at(4).simulate('change', {
      target: { value }
    });
    expect(component.state('coreMaterial')).toBe(value);
  });

  it('should set outerMaterial on input change', () => {
    const value = 'test';
    component.find('input').at(5).simulate('change', {
      target: { value }
    });
    expect(component.state('outerMaterial')).toBe(value);
  });

  it('should set tonalTraits on input change', () => {
    const value = 'test';
    component.find('input').at(6).simulate('change', {
      target: { value }
    });
    expect(component.state('tonalTraits')).toBe(value);
  });

  it('should call addString when form is submitted', () => {
    const addString = jest.fn();
    const props = {
      addString
    }
    component = shallow(<AddString { ...props }/>);    
    
    component.find('form').simulate('submit', { preventDefault() {} });
    expect(addString).toHaveBeenCalled();
  });

  it('should call addString with the correct arguments', () => {
    const addString = jest.fn();
    const history = { };
    const props = {
      addString,
      history
    }

    const string = {
      title: '',
      content: '',
      imageURL: '',
      manufacturer: '',
      coreMaterial: '',
      outerMaterial: '',
      tonalTraits: ''
    };

    component = shallow(<AddString { ...props }/>);    
    
    component.find('form').simulate('submit', { preventDefault() {} });
    expect(addString).toHaveBeenLastCalledWith(string, history);
  });
});