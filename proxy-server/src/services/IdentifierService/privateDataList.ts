export interface IPrivateDataList {
  personal: string[],
  sensible: string[]
}

const privateDataList = {
  personal: [
    'name',
    'last_name',
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
}
export default privateDataList
