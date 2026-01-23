import axios from "axios";
import { getAuthCallbackUrl } from '@/services/ComponentUtils'
import apiClient from '@/services/ApiClient'

export function callAuthCallback(credential:string) {
    const url = getAuthCallbackUrl();
    return axios.post(url, {
        token: credential
    })
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user?: {
        id: string;
        email: string;
        username?: string;
    };
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
}


