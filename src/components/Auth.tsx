import { useEffect } from "react";
import { useNavigate } from "react-router";

interface AuthProps {
    isAdmin?: boolean;
    children: React.ReactNode;
}

export default function Auth({isAdmin = true,children}: AuthProps) {

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
        if (isAdmin && localStorage.getItem('role') !== 'admin') {
            navigate('/main');
        }
    })
    
    return (
        <>
            {children}
        </>
    )
}