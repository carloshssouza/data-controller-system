export interface IRestrictDataList {
  personal: string[],
  sensible: string[]
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
  sensible: [
    'race',
    'ethnicity',
    'religion',
    'sex',
    'gender',
    'political_party'
  ]
} as IRestrictDataList
export default restrictDataList
