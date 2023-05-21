interface UserCreateData {
    name: string;
    accountName: string;
    password: string;
    type: string
    extraPermissions: string[]
  }

interface UserUpdateData {
    name?: string;
    password?: string;
    extraPermissions?: string[]
}

export {
  UserCreateData,
  UserUpdateData
}
