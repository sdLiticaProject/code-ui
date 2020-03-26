import React from 'react';
import {useState} from 'react';

import {loginUser} from '../../actions/loginActions'
import {useActions} from '../../hooks/useAction'


function AuthenticationPage() {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  //Alternative bindActionCreators
  const [submitAction] = useActions([loginUser]);
  
  const submit = () => {
    if(login!==""&&password!==""){
      submitAction(login,password)
    }
  }

  return(
    <div>
      <label>Login: </label>
      <input placeholder="login" onChange={e => setLogin(e.target.value)}/>
      <br/>
      <label>Password: </label>
      <input placeholder="password" onChange={e => setPassword(e.target.value)}/>
      <br/>
      <button onClick={submit}>Submit</button>
    </div>
  )
}


export default AuthenticationPage;