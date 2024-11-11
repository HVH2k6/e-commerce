interface IUser {
  id: number;
  fullname: string;
  email: string;
  password: string;
  description?: string;
  role_id?: number;
  name_role: string;

  avatar: string;
}

export default IUser