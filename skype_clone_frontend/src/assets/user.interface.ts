export interface User {
  status: number;
  message: string;
  data?: Person | (Person)[] | Token | null;
}
export interface Person {
  createdBy?: null;
  createdDate?: string;
  modifiedBy?: null;
  modifiedDate?: string;
  personId: number;
  firstName: string;
  lastName: string;
  skypeName: string;
  emailId: string;
  password: string;
  location?: null;
  birthday?: string;
  skypeNumber?: null;
  profileImageId?: null;
  statusId?: null;
  activeStatus?: number;
  deleteFlag?: number;
  groupListId?: null;
  mailVerified: number;
  status?: any;
  profileImage?: any;
}

// export interface LoginToken {
//   status: number;
//   message: string;
//   data: Token;
// }
export interface Token {
  token: string;
  user: Person;
}
