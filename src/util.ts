export const removeFromArray = <T>(array: T[], item: T): void => {
  array.splice(array.indexOf(item), 1)
}
