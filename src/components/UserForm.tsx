import { Button, Form, Input, Radio, Select, Spin, type FormProps,Space} from "antd";
import { type User } from "../model/user";
import { useLocation, useNavigate } from "react-router";
import { AddUser, ModifyUser } from "../api";
import { useState } from "react";
import {faker} from "@faker-js/faker";

interface UserFormProps {
    mode: 'create' | 'edit';
    profileMode?: boolean;
}

type UserInfo = Omit<User, 'key'>;

export default function UserForm({mode,profileMode = false}: UserFormProps) {

    const [loading, setLoading] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();

    const initialValues = mode === 'edit' ? location.state as User : {
        role: 'user',
        status: 'active',
    };
    

    const onFinish:FormProps<UserInfo>['onFinish'] = async (values) => {
        setLoading(true);
        if (profileMode) {
            // 个人中心模式
            const user: User = {
                key: location.state.key,
                ...values
            }
            setTimeout(() => {
                localStorage.setItem('userinfo', JSON.stringify(user));
                setLoading(false);
                navigate('/main/profile');
            }, 500);
        } else {
                if (mode === 'edit') {
                // 编辑模式
                const user: User = {
                    key: location.state.key,
                    ...values
                }
                try {
                    await ModifyUser(user);
                    setLoading(false);
                    navigate('/admin/users');
                } catch (error) {
                    console.error(error);
                    setLoading(false);
                }
            } else {
                const user: User = {
                    key: faker.string.uuid(),
                    ...values
                }
                try {
                    await AddUser(user);
                    setLoading(false);
                    navigate('/admin/users');
                } catch (error) {
                    console.error(error);
                    setLoading(false);
                }
            }
        }
    }

    return (
        <div className="size-full">
            <Spin spinning={loading}>
                <div className="mx-auto w-[600px] mt-10">
                    <Form
                        name="userForm"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600, marginTop: '20px' }}
                        autoComplete="off"
                        initialValues={initialValues}
                        onFinish={onFinish}
                    >
                        <Form.Item<UserInfo>
                            label="姓名"
                            name="name"
                            rules={[{ required: true, message: '请输入姓名!' }]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item<UserInfo>
                            label="年龄"
                            name="age"
                            rules={[{ required: true, message: '请输入年龄!' }]}
                        >
                            <Input type="number" min={1} max={120}/>
                        </Form.Item>
                        <Form.Item<UserInfo>
                            label="性别"
                            name="gender"
                            rules={[{ required: true, message: '请选择性别!' }]}
                        >
                            <Radio.Group
                                block
                                options={[
                                    { label: '男', value: '男' },
                                    { label: '女', value: '女' }
                                ]}
                            />
                        </Form.Item>
                        <Form.Item<UserInfo>
                            label="邮箱"
                            name="email"
                            rules={[{ required: true, message: '请输入邮箱!' }, { type: 'email', message: '请输入有效的邮箱!' }]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item<UserInfo>
                            label="角色"
                            name="role"
                        >
                            <Select
                                disabled={profileMode}
                                options={[
                                    { label: '管理员', value: 'admin' },
                                    { label: '用户', value: 'user' },
                                    { label: '访客', value: 'guest' }
                                ]}
                            />
                        </Form.Item>
                        <Form.Item<UserInfo>
                            label="状态"
                            name="status"
                            
                        >
                            <Select
                                disabled={profileMode}
                                options={[
                                    { label: '激活', value: 'active' },
                                    { label: '未激活', value: 'inactive' },
                                    { label: '暂停', value: 'suspended' },
                                    { label: '待处理', value: 'pending' }
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label={null}>
                            <Space size={40}>
                                    <Button type="primary" htmlType="submit">
                                    保存
                                </Button>
                                <Button>
                                    取消
                                </Button>
                                </Space>
                        </Form.Item>
                    </Form>
                </div>
            </Spin>
        </div>
    )

}