import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [token,setToken] = useState(
        localStorage.getItem("token") || null
    )
    const [role,setRole] = useState(
        localStorage.getItem("role") || null 
    )
    const [selectAddress, setSelectAddress] = useState({})
    const [searchProducts,setSearchProducts] = useState([])
    const [user,setUser] = useState({})

    useEffect(()=>{
        const stored_token = localStorage.getItem("token")
        const stored_role = localStorage.getItem("role")
        if (stored_token){
            setToken(stored_token)
            setRole(stored_role)
        }
    },[])

    // ============ LOGIN ===========
    const login = (newData)=>{
        localStorage.setItem("token",newData.token)
        localStorage.setItem("role",newData.role)
        setToken(newData.token)
        setRole(newData.role)
    }
    // =========== LOGOUT ===========
    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        setToken(null)
        setRole(null)
    }

    return (
        <AuthContext.Provider 
        value={{
            token,login, role, logout,selectAddress, setSelectAddress, searchProducts,setSearchProducts, user, setUser
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}