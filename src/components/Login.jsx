import React, {useState, useRef, useEffect} from 'react'
// import AuthContext from '../context/AuthProvider'
// import axios from "./api/axios";


// const LOGIN_URL ='/auth'

export const Login = () => {
    // const {setAuth} = useContext(AuthProvider)
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
      userRef.current.focus();
    }, []);

    useEffect(() => {
      setErrMsg("");
    }, [pwd, user]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        // console.log(pwd, user)
        try {
            // backend supposed to go here but code giving me bugs
            // const response = await axios.post(LOGIN_URL, 
            //     JSON.stringify({user,pwd}), 
            //     {
            //         headers:{'content-Type': 'application/json'},
            //         withCredentials: true
            //     })
            //     console.log(JSON.stringify(response?.data))

            //     const accessToken = response?.data?.accessToken
            //     const roles = response?.data?.roles
            //     setAuth({user,pwd, roles, accessToken})
            setUser("");
            setPwd("");
            setSuccess(true);
            
        } catch (error) {
            if(!error?.response){
                setErrMsg("No server response")
            }
            else if(error.response?.status === 400){
                setErrMsg("Missing username or password")
            }
            else if(error.response?.status=== 401){
                setErrMsg("Unauthorized")
            }
            else{
                setErrMsg("Login Failed")
            }
            errRef.current.focus()
        }
        
    }


  return (
    <>
      {success ? (
        <div>
          <h1>Your are logged in</h1>
          <br />
          <p>
            <a href="#">go home</a>
          </p>
        </div>
      ) : (
        <div>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign in</h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />

            <button>Sign in</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/* router link here*/}
              <a href="#">Sign Up</a>
            </span>
          </p>
        </div>
      )}
    </>
  );
}
