export const createMap = (domNode, layerID) => {
  return {
    type: 'CREATE_MAP',
    domNode,
    layerID
  }
}
