import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import MainScreen from '../src/screens/MainScreen';

describe('MainScreen', () => {
  it('should render the main title', () => {
    const {getByText} = render(<MainScreen />);
    const titleElement = getByText('Todo App');
    expect(titleElement).toBeDefined();
  });

  it('should search for posts when the search button is pressed', () => {
    const {getByTestId, getByPlaceholderText, getByText} = render(
      <MainScreen />,
    );
    const searchInput = getByPlaceholderText('Search...');
    const searchButton = getByTestId('search-button');
    fireEvent.changeText(searchInput, 'test');
    fireEvent.press(searchButton);
    const searchedPostsTitle = getByText('Sorry, No post found !');
    expect(searchedPostsTitle).toBeDefined();
  });
});
jest.mock('react-native-modal-dropdown', () => ({
  ModalDropdown: 'ModalDropdown',
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
