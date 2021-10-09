import { auth, googleAuthProvider } from "../../firebase";
import { API } from "../../constants";
import { apiClient } from "../../service";
import { errorToastHandler, successToastHandler } from "../../utils/toast";

const createOrUpdateUser = async () => {
  return await apiClient.post(API.ROUTES.CREATE_OR_UPDATE_USER);
};

export const currentUser = async ({ toast }) => {
  try {
    return await apiClient.post(API.ROUTES.CURRENT_USER);
  } catch (error) {
    errorToastHandler({ toast, title: "Error!", error: error.message });
  }
};

export const currentAdmin = async () => {
  return await apiClient.post(API.ROUTES.CURRENT_ADMIN);
};

export const loginUser = ({ email, password, history, toast }) => {
  return async (dispatch) => {
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      const { data } = await createOrUpdateUser();
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
      data.role === "subscriber"
        ? history.push("/user/history")
        : history.push("/admin/dashboard");
    } catch (error) {
      errorToastHandler({
        toast,
        title: "Login Failed!",
        error: error.message,
      });
    }
  };
};

export const handleGoogleLogin = ({ history, toast }) => {
  return (dispatch) => {
    try {
      auth.signInWithPopup(googleAuthProvider).then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        const { data } = await createOrUpdateUser();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            _id: data._id,
            name: data.name,
            role: data.role,
            email: user.email,
            token: (await idTokenResult).token,
          },
        });
        data.role === "subscriber"
          ? history.push("/user/history")
          : history.push("/admin/dashboard");
      });
    } catch (error) {
      errorToastHandler({
        toast,
        title: "Login Failed!",
        error: error.message,
      });
    }
  };
};

export const sendSignInLinkToEmail = ({ email, toast }) => {
  return async () => {
    try {
      const config = {
        url: `${process.env.REACT_APP_REGISTER_URL}`,
        handleCodeInApp: true,
      };
      await auth.sendSignInLinkToEmail(email, config);

      successToastHandler({
        toast,
        title: "Verification Email!",
        message: `Email sent to ${email}`,
      });
      localStorage.setItem("email", email);
    } catch (error) {
      errorToastHandler({
        toast,
        title: "Login Failed!",
        error: error.message,
      });
    }
  };
};

export const registerComplete = ({ email, password, history, toast }) => {
  return async (dispatch) => {
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        localStorage.removeItem("email");

        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        const { data } = await createOrUpdateUser();
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
        data.role === "subscriber"
          ? history.push("/user/history")
          : history.push("/admin/dashboard");
      }
    } catch (error) {
      errorToastHandler({
        toast,
        title: "Email Verification Failed!",
        error: error.message,
      });
    }
  };
};
