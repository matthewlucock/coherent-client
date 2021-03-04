export const simpleRemoveFromArray = <T>(array: T[], item: T): void => {
  array.splice(array.indexOf(item), 1)
}

export const forceReflowOnElement = (element: HTMLElement): void => {
  // Simply retrieving element.offsetHeight forces a reflow on the element.
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  element.offsetHeight
}
