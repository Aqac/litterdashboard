import { createBrowserRouter,Navigate } from "react-router";

import LoginPage from "../pages/LoginPage";
import Admin from "../components/Admin";
import AdminPage from "../pages/AdminPage";
import UserForm from "../components/UserForm";
import MainPage from "../pages/MainPage";
import UserCenter from "../components/UserCenter";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to='/login' replace/>
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/admin',
        element: <AdminPage/>,
        children: [
            {index: true,element: <Navigate to='/admin/users' replace/>},
            {path: 'users',element: <Admin/>},
            {path: 'users/:id',element: <UserForm mode="edit"/>},
            {path: 'users/new',element: <UserForm mode="create"/>}
        ]
    },
    {
        path: '/main',
        element: <MainPage/>,
        children: [
            {index: true,element: <Navigate to='/main/profile' replace/>},
            {path: 'profile',element: <UserCenter/>},
            {path: 'change',element: <UserForm mode="edit" profileMode={true}/>}
        ]
    }
])