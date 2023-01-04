export default class ErrorRes extends Error {
  constructor (
      readonly status: number = 500,
      readonly message: string = 'Server Error'
  ) {
    super()
  }
}
