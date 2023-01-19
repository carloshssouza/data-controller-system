import privateData from './privateDataList'
function findMatchingKeys (obj: any, keys: string[]) {
  if (Array.isArray(obj)) {
    return [...new Set(obj.flatMap((subObj) => findMatchingKeys(subObj, keys)))]
  } else {
    const matchingKeys = new Map<string, boolean>()
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (keys.indexOf(prop) !== -1) {
          if (!matchingKeys.has(prop)) {
            matchingKeys.set(prop, true)
          }
        }
        if (typeof obj[prop] === 'object') {
          for (const key of findMatchingKeys(obj[prop], keys)) {
            if (!matchingKeys.has(key)) {
              matchingKeys.set(key, true)
            }
          }
        }
      }
    }
    return [...matchingKeys.keys()]
  }
}

const obj = {
  cpf: 'teste',
  rg: 'estee',
  data: {
    name: 'carlos'
  },
  id: 'ok',
  sex: 'male',
  data2: [
    {
      email: 'carlos@email.com',
      phone: '1234'
    },
    {
      email: 'carlos@email.com',
      phone: '12343'
    }
  ]

}
const resultPersonal = findMatchingKeys(obj, privateData.personal)
const resultSensible = findMatchingKeys(obj, privateData.sensible)

console.log(resultPersonal)
console.log(resultSensible)
