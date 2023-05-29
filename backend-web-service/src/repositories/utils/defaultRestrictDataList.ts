export interface IRestrictDataList {
  personal: string[],
  sensitive: string[]
}

const restrictDataList = {
  personal: [
    'name',
    'last_name',
    'password',
    'cpf',
    'birth_date',
    'rg',
    'email',
    'address',
    'credit_card',
    'ip',
    'phone',
    'cookies',
    'income',
    'image_profile',
    'location'
  ],
  sensitive: [
    'race',
    'ethnicity',
    'religion',
    'sex',
    'gender',
    'political_party'
  ]
} as IRestrictDataList
export default restrictDataList
