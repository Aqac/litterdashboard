
export interface User {
    key: string;
    name: string;
    age: number;
    gender: '男' | '女';
    email: string;
    role: 'admin' | 'user' | 'guest';
    status: 'active' | 'inactive' | 'suspended' | 'pending';
}