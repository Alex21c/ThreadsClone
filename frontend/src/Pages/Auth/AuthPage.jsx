import { useEffect } from "react";
import qrCode from "../../Assests/Images/Login/qrCodeDownloadApp.png";
import "./AuthPage.css";
import { darkTheme, lightTheme } from "../../Redux/Slices/themeSlice.mjs";
import { useSelector } from "react-redux";
import MuiModalHavingQrCodeForAppDownload from "../../Components/MUI/MuiModalHavingQrCodeForAppDownload/MuiModalHavingQrCodeForAppDownload";
import { useDispatch } from "react-redux";
import { openMuiModalHavingQrCodeForAppDownloadSlice } from "../../Redux/Slices/muiModalHavingQrCodeForAppDownloadSlice.mjs";
import LoginForm from "../../Components/LoginForm/LoginForm";
import CreateANewAccountForm from "../../Components/CreateANewAccountForm/CreateANewAccount";
import ForgotPasswordForm from "../../Components/ForgotPasswordForm/ForgotPasswordForm";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { handshakeHello } from "../../Redux/Slices/handshakeSlice.mjs";

export default function AuthPage() {
  const { req } = useParams();
  const navigate = useNavigate();
  const pageName = "Auth";
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title =
      process.env.REACT_APP_PRJ_NAME + ", " + pageName + ` (${req})`;

    // is it login page?
    /// is user already logged in ?
    if (req === "login" && auth.authorization) {
      return navigate("/"); // redirect to home
    }

    // perform handshake with server
    dispatch(handshakeHello());
  }, []);

  const theme = useSelector((store) => store.theme);

  const renderForm = (req) => {
    switch (req) {
      case "login":
        return <LoginForm />;
      case "create-a-new-account":
        return <CreateANewAccountForm />;
      case "forgot-password":
        return <ForgotPasswordForm />;
      default:
        return <LoginForm />;
    }
  };

  return (
    <>
      <h1 className="displayNone">{pageName} Page</h1>
      <div
        id="AuthPageWrapper"
        className={`relative flex flex-col p-[1rem]`}
        style={{
          color: theme.secondaryText,
          backgroundColor: theme.background,
        }}
      >
        <MuiModalHavingQrCodeForAppDownload />
        <div className="mt-[15rem] flex flex-col items-center">
          {renderForm(req)}
        </div>
        <footer
          className={` flex absolute bottom-[1rem] right-[0] w-[100%] justify-center  text-[${theme.secondaryText}]`}
        >
          <div>
            <ul className="flex gap-[1rem] text-[.8rem] footerLinks">
              <li>&copy; {new Date().getFullYear()}</li>
              <li>
                <a href="#" className="hover:underline hover:cursor-pointer">
                  Threads Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:cursor-pointer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:cursor-pointer">
                  Cookies Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:cursor-pointer">
                  Report a problem
                </a>
              </li>
            </ul>
          </div>

          <div className="qrCodeForGettingApp w-[13rem] p-[1rem] flex flex-col gap-[.5rem] items-center absolute bottom-[0] right-[0] ">
            <span>Scan to get the app</span>

            <div
              style={{ borderColor: theme.text }}
              className={`p-[.8rem] border  rounded-xl bg-[#181818] cursor-pointer  overflow-hidden hover:scale-[1.1] transition`}
            >
              <img
                src={qrCode}
                className="w-[100%]"
                onClick={() => {
                  dispatch(openMuiModalHavingQrCodeForAppDownloadSlice());
                }}
              />
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
