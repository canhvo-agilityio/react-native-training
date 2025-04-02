import { CATEGORIES } from './category';
import { ERROR_MESSAGES } from './message';

export const PRICE_TYPE_OPTION = [
  {
    title: 'Fixed',
    value: 'fixed',
  },
  {
    title: 'Absolute',
    value: 'absolute',
  },
];

export const ADDITIONAL_DETAILS_OPTION = [
  {
    title: 'Cash on delivery',
    value: 'cash on delivery',
  },
  {
    title: 'Available',
    value: 'available',
  },
];

export const PRODUCT_FORM_FIELDS = [
  {
    key: 'name',
    label: 'Product Name',
    name: 'name',
    rules: { required: ERROR_MESSAGES.FIELD_REQUIRED },
  },
  {
    key: 'price',
    label: 'Price',
    name: 'price',
    rules: { required: ERROR_MESSAGES.FIELD_REQUIRED },
  },
  {
    key: 'offerPrice',
    label: 'Offer Price',
    name: 'offerPrice',
    rules: { required: ERROR_MESSAGES.FIELD_REQUIRED },
  },
  {
    key: 'category',
    label: 'Category Product',
    name: 'category',
    option: Object.entries(CATEGORIES).map(([_, value]) => ({
      title: value,
      value: value,
    })),
    rules: { required: ERROR_MESSAGES.FIELD_REQUIRED },
  },
  {
    key: 'location',
    label: 'Location Details',
    name: 'location',
    rules: { required: ERROR_MESSAGES.FIELD_REQUIRED },
  },
  {
    key: 'description',
    label: 'Product Description',
    name: 'description',
    rules: { required: ERROR_MESSAGES.FIELD_REQUIRED },
  },
  {
    key: 'priceType',
    label: 'Price Type',
    name: 'priceType',
    option: PRICE_TYPE_OPTION,
    rules: { required: ERROR_MESSAGES.FIELD_REQUIRED },
  },
  {
    key: 'additionalDetails',
    label: 'Additional Details',
    name: 'additionalDetails',
    option: ADDITIONAL_DETAILS_OPTION,
    rules: { required: ERROR_MESSAGES.FIELD_REQUIRED },
  },
];

export const PRODUCT_CARD_HEIGHT = 240;
