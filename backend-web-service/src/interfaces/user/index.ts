interface UserCreateData {
    name: string;
    email: string;
    password: string;
    type: string
  }

interface UserUpdateData {
    name?: string;
    password?: string;
}

export {
  UserCreateData,
  UserUpdateData
}
