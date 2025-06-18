import { UserList } from "../mock/userList";
import { type User } from "../model/user";

export const GetUserList = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(UserList);
        }, 500);
    })
}

export const Login = async (username: string, password: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === "admin" && password === "admin") {
                resolve({ code: 0, message:"登录成功",token:"123123",data: { username: "admin", role: "admin" } });
            } else if (username === "user" && password === "user") {
                resolve({ code: 0, message: "登录成功", token: "123123", data: { username: "user", role: "user" } });
            } else {
                reject({ code: -1, message: "用户名或密码错误" });
            }
        }, 500);
    });
}

export const ModifyUser = async (user: User) => {
    const modifiedUser = JSON.parse(localStorage.getItem('usermodify') || '[]');
    modifiedUser.push(user);

    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem('usermodify', JSON.stringify(modifiedUser));
            resolve({ code: 0, message: "修改成功" });
        }, 500);
    });
}

export const AddUser = async (user: User) => {
    const addUser = JSON.parse(localStorage.getItem('useradd') || '[]');
    addUser.push(user);
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem('useradd', JSON.stringify(addUser));
            resolve({ code: 0, message: "添加成功" });
        }, 500);
    });
}

export const DeleteUser = async (user: User) => {
    const deleteUser = JSON.parse(localStorage.getItem('userdelete') || '[]');
    deleteUser.push(user);
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem('userdelete', JSON.stringify(deleteUser));
            resolve({ code: 0, message: "删除成功" });
        }, 500);
    });
}

export const Logout = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            resolve({ code: 0, message: "退出成功" });
        }, 0);
    });
}

export const GetUserInfo = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'tom',
                age: 35,
                gender: '男',
                email: 'tom@example.com',
                role: 'user',
                status: 'active'
            })
        }, 500);
    });
}

