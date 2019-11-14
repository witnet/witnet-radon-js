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

export function dummyHash(str: string) {
  let hash: number = 0
  let chr: number
  if (str.length === 0) return hash
  for (let i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}
