import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'; // Don't forget to import Firestore

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(myContext); // Ensure you have your context defined
  const { loading, setLoading } = context;

  const signup = async () => {
    setLoading(true);

    if (name === "" || email === "" || password === "") {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const auth = firebase.auth();
      const users = await createUserWithEmailAndPassword(auth, email, password);

      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: firebase.firestore.Timestamp.now(),
      };

      const db = firebase.firestore(); // Initialize Firestore
      const userRef = collection(db, "users");
      await addDoc(userRef, user);

      toast.success("Signup Successful");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Signup failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      {/* {loading && <Loader />} */}
      <div className='bg-gray-800 px-10 py-10 rounded-xl'>
        <div>
          <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
        </div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name='name'
            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
            placeholder='Name'
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
            placeholder='Email'
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
            placeholder='Password'
          />
        </div>
        <div className='flex justify-center mb-3'>
          <button
            onClick={signup}
            className='bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg'>
            Signup
          </button>
        </div>
        <div>
          <h2 className='text-white'>Have an account? <Link className='text-red-500 font-bold' to={'/login'}>Login</Link></h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
