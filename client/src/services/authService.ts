import api from "./api";

export const register = (userData: {
  name: string;
  email: string;
  password: string;
  fileImageProfile: File | null;
}) => {
  const formData = new FormData();
  formData.append('name', userData.name);
  formData.append('email', userData.email);
  formData.append('password', userData.password);
  
  if (userData.fileImageProfile) {
    formData.append('fileImageProfile', userData.fileImageProfile);
  }

  return api.post('https://localhost:7147/api/User/Register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};



export interface UserLoginDto {
  UserName: string;
  Password: string;
  Email: string;
}

export const login = async (credentials: UserLoginDto) => {
  const formData = new FormData();
  formData.append('UserName', credentials.UserName);
  formData.append('Password', credentials.Password);
  formData.append('Email', credentials.Email);
  const response = await api.post('https://localhost:7147/api/User/login', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data as { token: string };
};