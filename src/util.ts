export const simpleRemoveFromArray = <T>(array: T[], item: T): void => {
  array.splice(array.indexOf(item), 1)
}
