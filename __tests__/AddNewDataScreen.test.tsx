import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import AddNewDataScreen from '../src/screens/AddNewDataScreen';

describe('AddNewDataScreen', () => {
  it('renders correctly', () => {
    const {getByText} = render(<AddNewDataScreen />);
    const titleElement = getByText('Add New Data');
    expect(titleElement).toBeDefined();
  });

  it('submits form correctly', async () => {
    const {getByTestId, getByText} = render(<AddNewDataScreen />);
    const idInput = getByTestId('id-input');
    const userIdInput = getByTestId('user-id-input');
    const titleInput = getByTestId('title-input');
    const bodyInput = getByTestId('body-input');
    const submitBtn = getByText('Submit');

    fireEvent.changeText(idInput, '1');
    fireEvent.changeText(userIdInput, '1');
    fireEvent.changeText(titleInput, 'Test Title');
    fireEvent.changeText(bodyInput, 'Test Body');

    fireEvent.press(submitBtn);
  });
});
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
