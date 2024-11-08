 

import apiClient from "@/lib/apiclient";
import { AxiosResponse } from "axios";

export type TUserPayload  = {
  userName: string,
  email: string,
  password: string,
  name: string,
  profileImage: string,
  phoneNumber: string
}
export type TLoginPayload  = {
  userName: string,  
  password: string,  
}
export type TUserRegistrationRespnse = {
 
    accessToken:  string;
    refreshToken: string;
    expiresIn:    number;
    userId:       number;
    username:     string;
    expiresAt:    Date;
    tokenType:    string;
 

};
export const createUser = async (userData: TUserPayload):Promise<TUserRegistrationRespnse> => {
  const response = await apiClient.post<TUserRegistrationRespnse,AxiosResponse<TUserRegistrationRespnse>,TUserPayload>('/Auth/register', {
    userName: userData.userName,
    email: userData.email,
    password: userData.password,
    name: userData.name,
    profileImage: userData.profileImage,
    phoneNumber:userData.phoneNumber
  });
  return response.data;
};
export const loginUser = async ({userName,password}: TLoginPayload):Promise<TUserRegistrationRespnse> => {
  const response = await apiClient.post<TUserRegistrationRespnse,AxiosResponse<TUserRegistrationRespnse>,TLoginPayload>('/Auth/login', {
    userName,   
    password,
    
  });
  return response.data;
};
