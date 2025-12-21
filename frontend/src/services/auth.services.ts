import api from '../utils/axios';

// Request Data Type 定義
export interface SignupRequest {
    userAccount : string;
    password : string;
    firstName ?: string | null;
    lastName ?: string | null;
} 

export interface LoginRequest {
    userAccount: string;
    password: string;
}

// Response Data Type 定義
export interface AuthResponse {
    message : string;
    token ?: string;
    user : {
        id : number;
        userAccount : string;
        firstName : string | null;
        lastName : string | null;
    }
}

export const authService = {

    // 会員登録
    async signup(data: SignupRequest): Promise<AuthResponse>{
        const response = await api.post<AuthResponse>('/auth/signup', data)
        return response.data
    },

    // Login
    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', data)

        if(response.data.token){
            localStorage.setItem('token', response.data.token);
        }
        return response.data
    },

    logout() {
        localStorage.removeItem('token')
    }

}