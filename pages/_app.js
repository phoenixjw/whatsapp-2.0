import { auth, db } from '@/firebase';
import '@/styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './login';
import Loading from '@/Components/Loading';
import { useEffect } from 'react';
import { collection, setDoc, serverTimestamp, doc } from 'firebase/firestore';

export default function App({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(()=> {
    if (user) {
      setDoc(doc(db,'users',user.uid), {
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL
      }, 
      {merge: true}
      )}

  }, [user])

  if (loading) return <Loading/>;

  if (!user) return <Login />

  return <Component {...pageProps} />
}
