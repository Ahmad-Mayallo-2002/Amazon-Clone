export interface SignUpUserRequest {
  username: string;
  email: string;
  phone: string;
  password: string;
  reEnterPassword: string;
}

export interface SignUpVendorRequest extends SignUpUserRequest {
  storeName: string;
  storeDescription: string;
}
