import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { auth, fireDB, signInWithGoogle } from "../../firebase.config";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import myContext from "../../ContexApi/myContex";
import Loader from "../Loder/Loder";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Login() {
  const { userData, setUserData } = useContext(myContext);

  const googleProvider = new GoogleAuthProvider();
  
  // Function to handle Google Sign-In
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
  
      // You can access user information from the result object
      console.log(result);
      const user = result.user;
  
      // Update userData directly
      setUserData(user);
  
      localStorage.setItem("user", JSON.stringify(user));
  
      console.log("Successfully signed in with Google:", user);
  
      toast.success("Signin Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  
  // Now, the useEffect can be used elsewhere in your functional component if needed.
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const signin = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(result.user));
      toast.success("Signin Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      window.location.href = "/";
      setLoading(false);
    } catch (error) {
      toast.error("Sigin Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Login
          </h1>
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
        </div>
        <div className=" flex justify-center mb-3">
          <button
            onClick={signin}
            className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Don't have an account{" "}
            <Link className=" text-yellow-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
          <button className="btn-primary" onClick={signInWithGoogle}>
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
