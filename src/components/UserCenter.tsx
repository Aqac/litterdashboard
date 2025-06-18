import { Button, Spin } from "antd"
import { useEffect, useState } from "react";
import {type User} from "../model/user";
import { useNavigate } from "react-router";
import { GetUserInfo } from "../api";

type UserInfo = Omit<User, 'key'>;

export default function UserCenter() {

    const navigate = useNavigate();

    const [userinfo, setUserinfo] = useState<UserInfo>();
    const [loading, setLoading] = useState<boolean>(true);

    const onChange = () => {
        navigate('/main/change', { state: userinfo });
    }

    const mergeUserInfo = (userinfo: UserInfo) => {
        const user = JSON.parse(localStorage.getItem('userinfo') || '{}') as UserInfo;
        return {
            ...userinfo,
            ...user
        }
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
            setLoading(true);
            try {
                const userinfo = await GetUserInfo() as UserInfo;
                setUserinfo(mergeUserInfo(userinfo));
                setLoading(false);
            } catch (error) {
                console.error("获取用户信息失败:", error);
                setLoading(false);
            }
        }
        fetchUserInfo();
    },[])

    return (
        <Spin spinning={loading}>
            <div>
                <p className="text-2xl font-bold mb-5">欢迎来到个人中心</p>
                <div className="flex flex-col gap-4 mb-5">
                    <h1 className="text-2xl font-bold">姓名: {userinfo?.name}</h1>
                    <h1 className="text-2xl font-bold">性别：{userinfo?.gender}</h1>
                    <h1 className="text-2xl font-bold">年龄：{userinfo?.age}</h1>
                    <h1 className="text-2xl font-bold">邮箱：{userinfo?.email}</h1>
                    <h1 className="text-2xl font-bold">角色：普通用户</h1>
                    <h1 className="text-2xl font-bold">账户状态：激活</h1>
                </div>
                <Button type="primary" onClick={onChange}>
                    修改个人信息
                </Button>
            </div>
        </Spin>
    )
}