import {useEffect, useRef, useState } from 'react';
import { loginFunction } from './http/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from './store/reducers/userReducer';
import { getBackendData } from './components/utils/polling';
import LoginPage from './components/Login/LoginPage';
import AdminPanel from './components/Admin/AdminPanel';
import LoadingPage from './components/Login/LoadingPage';
import Wrapper from './components/Common/Wrapper';
import './styles/App.css';
export default (function App() {
  const [isAuth,setIsAuth] = useState(false);
  const [loading,setLoading] = useState(true);
  const mainRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.user)
  const settings = useSelector(state=>state.settings.settings)
    useEffect(() => {
      getBackendData(dispatch,setIsAuth,setLoading)
  }, [])

  const changeCSSVariable=(variableName,variableValue)=>{
    document.documentElement.style.setProperty(variableName, variableValue);
  }
  useEffect(()=>{
    if(!loading){
        changeCSSVariable("--mainBackgroundColor",settings.mainBackground)
        changeCSSVariable("--topMenuBackgroundColor",settings.topBackground)
        changeCSSVariable("--colorAccent",settings.colorAccent)
        changeCSSVariable("--textColor",settings.textColor)
    }
  })

  const logIn = async(login,password)=>{
    try {
      const response = await loginFunction(login,password)
      const newUser = {login:response.login,role:response.role,editMode:response.role==="EDITOR"?true:false};
      dispatch(setUserAction(newUser));
      setIsAuth(true);
    } catch (e) {
      alert(e.response.data.message)
    }
    
  }
  const logOut = (e)=>{
    localStorage.removeItem('token')
    setIsAuth(false);
  }

  if(loading)return(
    <LoadingPage />
  )

  return (
    <div className="App">
      {
        isAuth
        ?
        user.role==="ADMIN"
        ?
        <AdminPanel logOut = {logOut} />
        :
        <Wrapper mainRef = {mainRef} logOut = {logOut} />
        :
        <>
        <LoginPage logIn = {logIn} />
        </>
        
      }
    </div>
  );
})
