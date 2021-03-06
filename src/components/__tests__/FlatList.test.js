import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import FlatList from '../FlatList';

it('should render <FlatList>', () => {
  const component = renderer.create(<FlatList />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
