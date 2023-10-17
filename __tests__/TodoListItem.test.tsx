import React from 'react';
import {render} from '@testing-library/react-native';
import TodoListItem from '../src/components/TodoListItem';

describe('TodoListItem', () => {
  const mockInfo = {
    id: 1,
    title: 'Test Title',
    body: 'Test Body',
    userId: 1,
  };
  const onDeletePost = (itemId: number) => {
    console.log(itemId);
  };
  it('render correctly', () => {
    const {getByText} = render(
      <TodoListItem info={mockInfo} onDeletePost={onDeletePost} />,
    );
    const titleElement = getByText('Title:');
    const bodyElement = getByText('Body:');
    expect(titleElement).toBeDefined();
    expect(bodyElement).toBeDefined();
  });
});
jest.mock('../src/components/DropdownMenu', () => {
  const MockDropdownMenu = jest.fn(() => null);
  return MockDropdownMenu;
});

jest.mock('react-native-modal-dropdown', () => ({
  ModalDropdown: 'ModalDropdown',
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
