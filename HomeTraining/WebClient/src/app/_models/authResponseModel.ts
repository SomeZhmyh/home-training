import { BaseModel } from "./BaseModel";


export interface AuthReponseModel extends BaseModel {
  
  name: string;
  surname: string;
  midname: string;
  username: string;
  password: string;
  token: string;
  roles: string[];
}
