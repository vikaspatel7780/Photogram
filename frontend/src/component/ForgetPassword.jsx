import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

const ForgetPassword = () =>{
    const { user } = useSelector(store => store.user);
    const navigate = useNavigate()
    useEffect( ()=>{
        if(user){
            navigate('/')
        }
    },[navigate,user])
    return (
        <div>
            <h1>Forget Password</h1>
        </div>
    )
}

export default ForgetPassword