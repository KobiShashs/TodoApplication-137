import axios from 'axios';
import { UserModel } from '../Models/UserModel';
import { CredentialsModel } from '../Models/CredentialsModel';
import globals from '../Services/Globals';

export async function registerRequest(credentials: CredentialsModel) {
    return await axios.post<any>(globals.urls.users + '/register', credentials);
};

export async function login(credentials: CredentialsModel) {
    return await axios.post<UserModel>(globals.urls.users + '/login', credentials);
};