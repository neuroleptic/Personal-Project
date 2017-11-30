import React from 'react';
import { shallow } from 'enzyme';
import { StringDetail } from '../../components/StringDetail';

describe('StringDetail Component', () => {
  let component;
  let props
  beforeEach(() => {
    const getString = jest.fn(); 
    props = {
      getString,
      username: 'nick',
      match : {
        params: {
          id: 1
        }
      },
      selectedString: {
        _id: '"5a1c4b4779bf621960b46866"',
        author: {
          _id: "5a1c4b4779bf621960b5555",
          username: "nick"
        },
        title: 'ffffffffff',
        content: 'ffffffffff',
        imageURL: "https://thumb1.shutterstock.com/display_pic_with_logo/167220022/531838210/stock-photo-violin-profile-violin-four-stringed-musical-instrument-of-high-tone-531838210.jpg",
        manufacturer: 'ffffffffff',
        coreMaterial: 'ffffffffff',
        outerMaterial: 'ffffffffff',
        tonalTraits: 'ffffffffff',
        rating: 4,
        reviews: [
          {
            text: 'aaaa',
            rating: 3,
            author: {
              _id: "5a1c4b4779bf621960b5555",
              username: 'nick'
            }
          },
          {
            text: 'bbbbb',
            rating: 5,
            author: {
              _id: "5a1c4b4779bf621960b88888",
              username: 'hans'
            }
          }
        ]
      }
    }

    component = shallow(<StringDetail {...props}/>);
    
  });

  it('should render one h1 tag', () => {
    expect(component.find('h1').length).toBe(1);
  });

  it('should render the h1 tag with correct text', () => {
    expect(component.find('h1').text()).toBe(props.selectedString.title);
  });

  it('should render three StarRatings components', () => {
    expect(component.find('StarRatings').length).toBe(3);
  });

  it('should render the correct average rating', () => {
    expect(component.find('StarRatings').at(0).prop('rating')).toBe(4);
  });

  it('should render the edit string link if authorized', () => {
    expect(component.find('Link').at(0).prop('to')).toBe(`/strings/${props.selectedString._id}/edit`);  
  });

  it('should not render the edit string link if unauthorized', () => {
    component.setProps({ username: 'hans' });
    expect(component.find('Link').at(0).prop('to')).not.toBe(`/strings/${props.selectedString._id}/edit`);  
  });

  it('should render the delete string link if authorized', () => {
    expect(component.find('input').at(0).props().value).toBe('Delete String');  
  });

  it('should not render the delete string link if unauthorized', () => {
    component.setProps({ username: 'hans' });    
    expect(component.find('input').at(0).props().value).not.toBe('Delete String');  
  });

  it('should render one img tag', () => {
    expect(component.find('img').length).toBe(1);
  });

  it('the img tag should point to the correct url', () => {
    expect(component.find('img').props().src).toBe('https://thumb1.shutterstock.com/display_pic_with_logo/167220022/531838210/stock-photo-violin-profile-violin-four-stringed-musical-instrument-of-high-tone-531838210.jpg');
  });

  it('should render the content paragraph with the right text', () => {
    expect(component.find('p').at(0).text()).toBe(`Content: ffffffffff`)
  });

  it('should render the manufacturer paragraph with the right text', () => {
    expect(component.find('p').at(1).text()).toBe(`Manufacturer: ffffffffff`)
  });

  it('should render the Core material paragraph with the right text', () => {
    expect(component.find('p').at(2).text()).toBe(`Core material: ffffffffff`)
  });

  it('should render the Outer material paragraph with the right text', () => {
    expect(component.find('p').at(3).text()).toBe(`Outer material: ffffffffff`)
  });

  it('should render the Tonal traits paragraph with the right text', () => {
    expect(component.find('p').at(4).text()).toBe(`Tonal traits: ffffffffff`)
  });

  it('should call deleteString when form is submitted', () => {
    const deleteString = jest.fn();
    props.deleteString = deleteString

    component = shallow(<StringDetail { ...props }/>);    
    
    component.find('form').at(0).simulate('submit', { preventDefault() {} });
    expect(deleteString).toHaveBeenCalled();
  });

  it('should call deleteString with the correct arguments', () => {
    const deleteString = jest.fn();
    props.deleteString = deleteString
    props.history = {}

    component = shallow(<StringDetail { ...props }/>);    
    
    component.find('form').at(0).simulate('submit', { preventDefault() {} });
    expect(deleteString).toHaveBeenLastCalledWith(props.match.params.id, props.history);
  });
});