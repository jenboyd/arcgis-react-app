export const createMap = (domNode, filter) => {
  return {
    type: 'CREATE_MAP',
    domNode,
    filter
  }
}
