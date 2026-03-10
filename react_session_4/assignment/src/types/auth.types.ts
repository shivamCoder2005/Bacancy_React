export type Role = "USER" | "ADMIN";

export type UserAuthType = {
    name: string;
    role: Role;
    isLoggdin: boolean;
};

export type AuthContextType = {
    loginUser: (name: string, role: Role) => void;
    logoutUser: () => void;
} & UserAuthType;

export type UserLoginType = {
    name: string
    password: string
    role: Role
}

export type UserSignupType = UserLoginType