import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
// import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  // const { loginWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };

  // const handleGoogleSignin = async () => {
  //   try {
  //     await loginWithGoogle();
  //     // navigate("/");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Online Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        {/* <GoogleButton onClick={handleGoogleSignin} /> */}
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;