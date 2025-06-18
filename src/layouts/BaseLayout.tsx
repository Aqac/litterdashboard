import { Layout, Menu, Button, Avatar, Space,Tooltip} from "antd"
import { useState } from "react";
import avatarUrl from '../assets/avatar.jpg';
import { LogoutOutlined } from "@ant-design/icons";

import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

interface BaseLayoutProps {
    menutitle: string;
    onLogout?: () => void;
    children?: React.ReactNode;
}

export default function BaseLayout({menutitle,onLogout,children}: BaseLayoutProps) {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
                <div className="w-full text-red-200 text-center italic font-bold mt-5 mb-10 h-12">
                    {
                        collapsed ? 
                        (
                            <div className="text-3xl">Logo</div>
                        )
                        :
                        (
                            <div className="text-5xl">Logo</div>
                        )
                    }
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            label: menutitle,
                            icon: <UserOutlined />,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{backgroundColor:'#fff'}}>
                    <div className="flex items-center">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                            fontSize: '16px',
                            width: 32,
                            height: 32,
                            }}
                        />
                        <div className="ml-auto mr-20">
                            <Space align="center">
                                <Avatar size={32} shape="circle" src={avatarUrl}/>
                                <Tooltip placement="right" title="退出登录">
                                    <Button type="text" size="small" shape="circle" icon={<LogoutOutlined/>}
                                        onClick={() => onLogout?.() }
                                    />
                                </Tooltip>
                            </Space>
                        </div>
                    </div>
                </Header>
                <Content style={{padding:'20px'}}>
                    <div className="bg-white size-full rounded-2xl p-5">
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}