import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProductForm, { ProductFormType } from '../index';
import { useImageHandler } from '@/hooks';

jest.mock('@/hooks', () => ({
  useImageHandler: jest.fn(),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('ProductForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockUseImageHandler = {
    images: [],
    cameraRef: null,
    facing: 'back',
    showCamera: false,
    openCamera: jest.fn(),
    takePicture: jest.fn(),
    pickImage: jest.fn(),
    removeImage: jest.fn(),
    toggleCamera: jest.fn(),
    toggleCameraFacing: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useImageHandler as jest.Mock).mockReturnValue(mockUseImageHandler);
  });

  const defaultProps = {
    isLoading: false,
    isEdit: false,
    data: {
      name: '',
      category: '',
      price: '',
      offerPrice: '',
      location: '',
      description: '',
      priceType: '',
      additionalDetails: '',
      images: [],
    },
    onSubmit: mockOnSubmit,
  };

  it('should render the ProductForm component correctly', () => {
    const container = render(<ProductForm {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should call onSubmit with form data when the form is valid', async () => {
    const { getByTestId, getByText } = render(
      <ProductForm
        {...defaultProps}
        data={{
          ...defaultProps.data,
          name: 'Test Product',
          category: 'Category 1',
          price: '100',
          offerPrice: '80',
          location: 'Test Location',
          description: 'Test Description',
          priceType: 'Fixed',
          additionalDetails: 'Test Details',
          images: ['image1.jpg'],
        }}
      />,
    );

    fireEvent.changeText(getByTestId('Product Name'), 'Test Product');
    fireEvent.changeText(getByText('Category 1'), 'Category 1');
    fireEvent.changeText(getByTestId('Price'), '100');
    fireEvent.changeText(getByTestId('Offer Price'), '80');
    fireEvent.changeText(getByTestId('Location Details'), 'Test Location');
    fireEvent.changeText(
      getByTestId('Product Description'),
      'Test Description',
    );
    fireEvent.press(getByTestId('submit-button'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'Test Product',
        category: 'Category 1',
        price: '100',
        offerPrice: '80',
        location: 'Test Location',
        description: 'Test Description',
        priceType: 'Fixed',
        additionalDetails: 'Test Details',
        images: ['image1.jpg'],
      });
    });
  });

  it('should call removeImage when the remove button is pressed', () => {
    (useImageHandler as jest.Mock).mockReturnValue({
      ...mockUseImageHandler,
      images: ['image1.jpg'],
    });

    const { getByTestId } = render(<ProductForm {...defaultProps} />);

    fireEvent.press(getByTestId('remove-image-button-image1.jpg'));

    expect(mockUseImageHandler.removeImage).toHaveBeenCalledWith('image1.jpg');
  });
});
