/**
 * Definicion de las interfaces necesarias para el modelo de la informacion de la peticion de usuarios de la base de datos
*/

export interface LoginResponse {
    session: Session;
}

export interface Session {
    id:      string;
    userId:  string;
    created: string;
    expires: string;
}

export interface RegisterResponse {
    account: Account;
}

export interface Account {
    id:                string;
    username:          string;
    email:             string;
    created:           string;
    updated:           string;
    verified:          boolean;
    verification_date: string;
    profile:           Profile;
}

export interface Profile {
}