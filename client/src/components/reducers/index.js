import { combineReducers } from 'redux';;
const getProductsReducer = (products = [], { type, payload }) => {
  switch (type) {
    case 'GET_PRODUCTS':
      return payload;
    default:
      return products
  }
}

const updateLineItemsReducer = (lineItems = [], { type, payload }) => {
  switch (type) {
    case 'UPDATE_LINE_ITEMS':
      // let isItemExist = false;

      // const lineItemsCopy = lineItems.map(lineItem => {
      //   if (lineItem.variant_id === payload.variant_id) {
      //     lineItem.quantity += 1;
      //     isItemExist = true
      //   }
      //   return lineItem;
      // });

      // if (!isItemExist) {
      //   lineItemsCopy.push(payload);
      // }

      // return lineItemsCopy
      return payload;
    default:
      return lineItems;
  }
}

const cartCountReducer = (count = 0, { type, payload }) => {
  switch (type) {
    case 'UPDATE_LINE_ITEMS':
      return payload.length;

    default:
      return count;
  }
}

export default combineReducers({
  products: getProductsReducer,
  lineItems: updateLineItemsReducer,
  cartCount: cartCountReducer
})