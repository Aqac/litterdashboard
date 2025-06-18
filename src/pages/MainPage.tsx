import BaseLayout from "../layouts/BaseLayout";
import { Outlet, useNavigate } from "react-router";
import { Logout } from "../api";
import Auth from "../components/Auth";



export default function MainPage() {

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
        <Auth isAdmin={false}>
            <BaseLayout menutitle="个人中心" onLogout={logout}>
                <Outlet/>
            </BaseLayout>
        </Auth>
    )
}