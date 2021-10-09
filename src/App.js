import { useEffect } from "react";
import { useToast, Box } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import firebase from "firebase";
import { firebaseConfig } from "./firebase";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { Header } from "./components";
import { auth } from "./firebase";
import { currentUser } from "./ducks/actions";
import AppRoutes from "./routes";

function App() {
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const { data } = await currentUser({ toast });
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            _id: data._id,
            name: data.name,
            role: data.role,
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });
    return () => unsubscribe();
  }, [dispatch, toast]);

  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <Router>
        <ToastContainer />
        {/* <Header /> */}

        {/* <Box px={["4", "16"]} py="8"> */}
        <AppRoutes />
        {/* </Box> */}
      </Router>
    </FirebaseAuthProvider>
  );
}

export default App;
