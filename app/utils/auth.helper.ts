import { onAuthStateChanged } from "firebase/auth"
import auth from "~/firebase/firebase.init"

export const requireAuth = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user)
    })
  })
}