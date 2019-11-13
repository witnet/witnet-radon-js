import { areSoftEqualArrays, getEnumNames, getEnumValues } from '../src/utils'

describe('areSoftEqualArrays', () => {
  it('check if two diffrent arrays return false', () => {
    const arr1 = [1, 2]
    const arr2 = [3, 4]
    expect(areSoftEqualArrays(arr1, arr2)).toBe(false)
  })

  it('check if two sorted arrays contains the same items', () => {
    const arr1 = [1, 2, 3, 4, 5]
    const arr2 = [1, 2, 3, 4, 5]
    expect(areSoftEqualArrays(arr1, arr2)).toBe(true)
  })

  it('check if two unsorted arrays contains the same items', () => {
    const arr1 = [1, 3, 5, 4, 2]
    const arr2 = [5, 2, 3, 4, 1]
    expect(areSoftEqualArrays(arr1, arr2)).toBe(true)
  })

  it('check if two different arrays contains the same items', () => {
    const arr1 = [1, 2, 3, 4, 5]
    const arr2 = [1, 2, 3, 4, 6]
    expect(areSoftEqualArrays(arr1, arr2)).toBe(false)
  })

  it('check if two different arrays with repeated items contains the same items', () => {
    const arr1 = [1, 3, 5, 4, 5]
    const arr2 = [5, 2, 3, 4, 1]
    expect(areSoftEqualArrays(arr1, arr2)).toBe(false)
  })

  it('check if two different sized arrays contains the same items', () => {
    const arr1 = [1, 3, 5, 4]
    const arr2 = [5, 2, 3, 4, 1]
    expect(areSoftEqualArrays(arr1, arr2)).toBe(false)
  })
})

describe('getEnumNames', () => {
  it('initialized', () => {
    enum Animal {
      Dog,
      Cat,
    }

    expect(getEnumNames(Animal)).toStrictEqual(['Dog', 'Cat'])
  })

  it('non initialized', () => {
    enum Animal {
      Dog = 'dog',
      Cat = 'cat',
    }

    expect(getEnumNames(Animal)).toStrictEqual(['Dog', 'Cat'])
  })
})

describe('getEnumValues', () => {
  it('initialized', () => {
    enum Animal {
      Dog = 'dog',
      Cat = 'cat',
    }

    expect(getEnumValues(Animal)).toStrictEqual(['dog', 'cat'])
  })

  it('non initialized', () => {
    enum Animal {
      Dog,
      Cat,
    }

    expect(getEnumValues(Animal)).toStrictEqual(['Dog', 'Cat', 0, 1])
  })
})
