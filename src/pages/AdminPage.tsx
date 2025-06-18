import BaseLayout from "../layouts/BaseLayout";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { Logout } from "../api";
import Auth from "../components/Auth";

export default function AdminPage() {

    const navigate = useNavigate();

    const logout = () => {
        (async () => {
            try {
                await Logout();
                navigate('/login');
            } catch (error) {
                console.error("登出失败:", error);
            } finally {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('role');
            }
        })()
    }
    return (
        <Auth isAdmin={true}>
            <BaseLayout menutitle="用户管理" onLogout={logout}>
                <Outlet/>
            </BaseLayout>
        </Auth>
    );
}