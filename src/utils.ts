// check if contains the same elements
export function areSoftEqualArrays(arr1: any[], arr2: any[]): boolean {
  return (
    arr1.length === arr2.length &&
    arr1.reduce((acc, item) => (acc ? arr2.includes(item) : false), true) &&
    arr2.reduce((acc, item) => (acc ? arr1.includes(item) : false), true)
  )
}

export function getEnumNames(e: any): Array<any> {
  return Object.keys(e).filter(key => !parseInt(key) && !Number.isInteger(parseInt(key)))
}

export function getEnumValues(e: any): Array<any> {
  return Object.values(e)
}
