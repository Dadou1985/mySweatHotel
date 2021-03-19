import { useEffect, useState } from "react"
import getFirebaseInstance from "./firebase"
import loadFirebaseDependencies from "./loadFirebaseDependencies"

function useAuth() {
    const [user, setUser] = useState(null)
    const [firebase, setFirebase] = useState(null)

    useEffect(() => {
        let unsubscribe

        loadFirebaseDependencies.then(app => {
            const firebaseInstance = getFirebaseInstance(app)
            setFirebase(firebaseInstance)

            unsubscribe = firebaseInstance.auth.onAuthStateChanged(userResult => {
                if (userResult) {
                    firebaseInstance.getUserProfile({userId: userResult.uid})
                    .then(t => {
                        console.log(t)
                        setUser({
                        ...userResult,
                        username: t.empty ? null : t.docs[0].id});
                    })
                }else{
                    setUser(null);
                }
            })
        })

        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [])

    return { user, firebase }
}

export default useAuth
