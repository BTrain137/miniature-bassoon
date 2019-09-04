// Actions Creators

export const getProducts = products => {
  return {
    type: 'GET_PRODUCTS',
    payload: products
  }
}

export const updateLineItems = lineItems => {
  return {
    type: 'UPDATE_LINE_ITEMS',
    payload: lineItems
  }
}

