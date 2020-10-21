import React from 'react';
import { observer } from "mobx-react-lite";
import { useMst } from "../models/Root";
import {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
interface OwnProps {}

type Props = OwnProps;

const LoginViewPassword: React.FC<Props> = observer((props) => {
    const {auth} = useMst();
    let history = useHistory();
    const [password, setPassword] = useState('');
    const handleClick = () =>{
        auth.getRealToken(password);

    }

    if(auth.loggedIn && auth.realToken){
        return <Redirect to="/posts" />
    }
  return (
      <div className="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 uppercase" htmlFor="password">
                      Password
                  </label>
                  <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="password" value={password} onChange={(event => setPassword(event.currentTarget.value))} type="password" placeholder="Password" />
              </div>

              <div className="flex items-center justify-center">
                  <button
                      onClick={() =>handleClick()}
                      className="uppercase bg-blue-500 hover:bg-blue-700 rounded-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button">
                      Next
                  </button>

              </div>
          </form>
      </div>
  );
});

export default LoginViewPassword;
