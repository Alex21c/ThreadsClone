import "./LoginForm.css";
import { useSelector } from "react-redux";
import PasswordField from "../PasswordField/PasswordField.mjs";
import { useRef } from "react";
import MuiSnackbar from "../MUI/MuiSnackbar/MuiSnackbar.jsx";
import { openTheMuiSnackbar } from "../../Redux/Slices/muiSnackbarSlice.mjs";
import { setJwt } from "../../Redux/Slices/authSlice.mjs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../../config.mjs";
import CircularProgressInfinite from "../MUI/CirclularProgressInfinite/CircularProgressInfinite.jsx";
import { useState } from "react";

export default function LoginForm() {
  const theme = useSelector((store) => store.theme);
  // console.log(theme)
  const refPassword = useRef(null);
  const refUsernameOrEmailOrMobile = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stateApiReqMessage, setStateApiReqMessage] = useState("Wait...");
  const [stateMakingApiCallAfterBtnClick, setStateMakingApiCallAfterBtnClick] =
    useState(false);

  async function handleSubmitRequest(event) {
    event.preventDefault();

    // are required fields provided?
    if (
      refUsernameOrEmailOrMobile.current.value === "" ||
      refPassword.current.value === ""
    ) {
      dispatch(
        openTheMuiSnackbar({
          message: "Username Or Password required to Login!",
          type: "info",
        })
      );
      return;
    }

    // make http req
    try {
      setStateMakingApiCallAfterBtnClick(true);
      setStateApiReqMessage("Logging You In ...");

      const data = {
        usernameOrEmailOrMobile: refUsernameOrEmailOrMobile.current.value,
        password: refPassword.current.value,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.User.login}`;
      // console.log(reqURL);

      let response = await fetch(reqURL, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      if (!response) {
        throw new Error(
          "Failed to Make Req. with Server! please try again later..."
        );
      }
      response = await response.json();
      if (!response.success) {
        throw new Error(response.message);
      }
      // console.log(response);

      // save the token in the local storage, and redirect the user to homepage
      dispatch(setJwt(response.Authorization));

      // redirect user to homepage
      navigate("/");
    } catch (error) {
      dispatch(openTheMuiSnackbar({ message: error.message, type: "error" }));
      console.log(error.message);
    } finally {
      setStateMakingApiCallAfterBtnClick(false);
    }
  }
  const styles = {
    backgroundColor: theme.backgroundHover,
    borderColor: theme.borderColor,
    color: theme.primaryText,
  };

  return (
    <div
      className="flex flex-col items-center gap-[1rem] wrapperForm"
      style={{ color: theme.secondaryText }}
    >
      <MuiSnackbar />
      <h2
        className="font-medium text-[1.2rem]"
        style={{ color: theme.primaryText }}
      >
        Log in
      </h2>
      <form
        className="wrapperInputFields flex flex-col gap-[.5rem]"
        onSubmit={(event) => handleSubmitRequest(event)}
      >
        <input
          ref={refUsernameOrEmailOrMobile}
          type="text"
          placeholder="Username, phone or email"
          className=" p-[1rem] rounded-md w-[20rem] outline-none  border border-transparent transition "
          style={styles}
        />
        <PasswordField ref={refPassword} />

        {stateMakingApiCallAfterBtnClick ? (
          <div className="self-end">
            <CircularProgressInfinite message={stateApiReqMessage} />
          </div>
        ) : (
          <button
            className="bg-white p-[1rem] rounded-xl font-medium border"
            style={styles}
          >
            Log in
          </button>
        )}

        <a
          href="/auth/forgot-password"
          className="text-center mt-[.7rem] hover:underline transition"
        >
          Forgot Password?
        </a>
        <div className=" border-b-[.1rem] relative h-[1rem] mb-[1rem]">
          <span
            className="absolute  top-[.2rem] left-[42%] w-[3rem] text-center"
            style={{ backgroundColor: theme.background }}
          >
            or
          </span>
        </div>
        <a
          href="/auth/create-a-new-account"
          className="text-center mt-[.7rem] hover:underline text-[1.2rem] font-medium"
          style={{ color: theme.primaryText }}
        >
          Create a new account
        </a>
      </form>
    </div>
  );
}
