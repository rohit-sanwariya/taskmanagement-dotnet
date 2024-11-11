 

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
export interface TUserDetail 
 {
  id: number;
  name: string;
  profileImage: string;
  createdAt: string; 
  updatedAt: string;  
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string | null;  
  lockoutEnabled: boolean;
  accessFailedCount: number;
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

export const getLoggedInUserDetail = async () => {
  const authLoginstr = localStorage.getItem('authLogin');
  const authLogin:TUserRegistrationRespnse|null = authLoginstr ? JSON.parse(authLoginstr) : null;
  const accessToken = authLogin ? authLogin.accessToken : null;
  try {
    if(!accessToken){
      throw Error("token expired");
    }
    const response = await apiClient.get<TUserDetail,AxiosResponse<TUserDetail>>('/Users/loggedinuserdetail', {
      headers: {      
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,  
      }
    });
    
    // Access the response data
    const userDetail = response.data;

    return userDetail;  
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};