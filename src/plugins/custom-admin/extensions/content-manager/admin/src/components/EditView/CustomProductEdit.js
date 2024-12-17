// custom-plugin/extensions/content-manager/admin/src/components/EditView/CustomProductEdit.js

import React from 'react';
import { get } from 'lodash';

const CustomProductEdit = ({ onChange, values }) => {
  const outOfStock = get(values, 'outofstock', false);

  const handleOutOfStockChange = (newValue) => {
    onChange('outofstock', newValue);

    if (newValue) {
      onChange('quantity', null); // Set quantity to null when outofstock is true
    }
  };

  return (
    <>
      <Inputs.Checkbox
        name="outofstock"
        onChange={handleOutOfStockChange}
        value={outOfStock}
      />
      {!outOfStock && (
        <Inputs.Number
          name="quantity"
          onChange={onChange}
          value={get(values, 'quantity', '')}
        />
      )}
    </>
  );
};

export default CustomProductEdit;
