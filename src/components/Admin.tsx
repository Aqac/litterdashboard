import { Button, Space, Table, Tag, Input,Popconfirm } from "antd"
import { type TableProps } from "antd"
import { type User } from "../model/user"
import { useEffect, useState } from "react";
import { GetUserList,DeleteUser } from "../api";
import { useNavigate } from "react-router";

const { Search } = Input;


export default function Admin() {

    const navigate = useNavigate();

    const [data,setData] = useState<User[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const [cacheData,setCacheData] = useState<User[]>([]);

    const edit = (record: User) => {
        navigate(`/admin/users/${record.key}`, { state: record });
    }

    const create = () => {
        navigate('/admin/users/new', { state: {} });
    }

    const ondelete = (record: User) => {
        (async () => {
            setLoading(true);
            try {
                await DeleteUser(record);
                const newData = data.filter(item => item.key !== record.key);
                setData(newData);
            } catch (error) {
                console.error("删除用户失败:", error);
            } finally {
                setLoading(false);
            }
        })()
    }

    const columns: TableProps<User>['columns'] = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend'],
            showSorterTooltip: false,
            width:'10%',
            render: (text) => <a>{text}</a>
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            showSorterTooltip: false,
            width:'10%',
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: '性别',
            dataIndex: 'gender',
            width: '10%',
            key: 'gender',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            width: '25%',
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
            width: '10%',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (_,{status}) => {
                let color;
                switch (status) {
                    case 'active':
                        color = 'green';
                        break;
                    case 'inactive':
                        color = 'volcano';
                        break;
                    case 'suspended':
                        color = 'geekblue';
                        break;
                    case 'pending':
                        color = 'orange';
                        break;
                    default:
                        color = 'grey';
                }
                return (
                    <Tag color={color} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                )
            }
        },
        {
            title: '操作',
            key: 'action',
            width: '25%',
            render: (_,record) => (
                <Space>
                    <a onClick={() => edit(record)}>编辑</a>
                    <Popconfirm
                        title="确定要删除该用户吗？"
                        okText="确定"
                        cancelText="取消"
                        onConfirm={() => ondelete(record)}
                    >
                        <a>删除</a>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    const onSearch = (value: string) => {
        if (value === '') {
            setData(cacheData);
            return
        }
        const parts = value.split(':');
        const newData = [...cacheData];
        if (parts.length !==2) {
            const filteredData = newData.filter(item => {
                return item.name.includes(value);
            })
            setData(filteredData);
        } else {
            const [key, val] = parts;
            const filteredData = newData.filter(item => {
                if (key === 'name') {
                    return item.name.includes(val);
                } else if (key === 'email') {
                    return item.email.includes(val);
                } else if (key === 'role') {
                    return item.role.includes(val);
                } else if (key === 'status') {
                    return item.status.includes(val);
                }
                return false;
            });
            setData(filteredData);
        }

    }

    const mergeUser = (data: User[]):User[] => {
        const modifiedUsers = JSON.parse(localStorage.getItem('usermodify') || '[]') as User[];
        const addedUsers = JSON.parse(localStorage.getItem('useradd') || '[]') as User[];
        const deletedUsers = JSON.parse(localStorage.getItem('userdelete') || '[]') as User[];
        modifiedUsers.forEach((user: User) => {
            const index = data.findIndex(item => item.key === user.key);
            if (index !== -1) {
                data[index] = user;
            }
        })
        deletedUsers.forEach((user: User) => {
            const index = addedUsers.findIndex(item => item.key === user.key);
            const index2 = data.findIndex(item => item.key === user.key);
            if (index !== -1) {
                addedUsers.splice(index, 1);
            }
            if (index2 !== -1) {
                data.splice(index2, 1);
            }
            
        })
        return [...data, ...addedUsers];
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await GetUserList();
                setData(mergeUser(data as User[]));
                setCacheData(mergeUser(data as User[]));
            } catch (error) {
                console.error("获取用户数据失败:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    },[])

    return (
        <div className="size-full">
            <div className="h-12 mb-5 flex">
                <Button type="primary" size="large" onClick={create}>
                    新增用户
                </Button>
                <div className="ml-[300px]">
                    <Search 
                        style={{width:'270px'}} 
                        placeholder="tag:value eg: name:Bogan"
                        onSearch={onSearch}
                    />
                </div>
            </div>
            <Table<User>
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={{ pageSize: 7,hideOnSinglePage: true, showSizeChanger: false }}
                rowKey="key"
            />
        </div>
    )
}