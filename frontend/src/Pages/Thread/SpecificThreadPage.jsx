import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HeaderLeft from "../../Components/HeaderLeft/HeaderLeft";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../Redux/Slices/userSlice.mjs";
import { handshakeHello } from "../../Redux/Slices/handshakeSlice.mjs";
import { useParams } from "react-router-dom";
import Thread from "../../Components/Thread/Thread";
import { fetchSpecificThread } from "../../Redux/Slices/threadsSlice.mjs";
import MuiModalCreateNewReply from "../../Components/MUI/MuiModalCreateNewReply/MuiModalCreateNewReply";
import "./specificThreadPage.css";

export default function SpecificThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((store) => store.auth);
  const theme = useSelector((store) => store.theme);
  const user = useSelector((store) => store.user);
  const threads = useSelector((store) => store.threads);

  const { threadID } = useParams();

  useEffect(() => {
    document.title = process.env.REACT_APP_PRJ_NAME + " (Thread)";
    if (!auth.authorization) {
      return navigate("/auth/login");
    }

    if (Object.keys(user.data).length === 0) {
      // fetch user data
      dispatch(fetchUser(auth));
    }
    // perform handshake with server
    dispatch(handshakeHello());

    // let me fetch current thread data
    dispatch(fetchSpecificThread({ threadID, auth, navigate }));
  }, []);

  return (
    <div
      className="flex "
      style={{ backgroundColor: theme.background, color: theme.primaryText }}
    >
      <HeaderLeft />
      <MuiModalCreateNewReply isItSpecificThreadPage={true} />
      <main
        id="mainSectionSpecificThreadPage"
        style={{
          backgroundColor: theme.backgroundHover,
          borderColor: theme.borderColor,
          color: theme.primaryText,
        }}
        className="border-[.1rem] rounded-tl-2xl rounded-tr-2xl p-[1rem] w-[40rem] min-h-[95vh] border-b-[0] m-[auto] mt-[3rem]"
      >
        <div className="flex flex-col items-center gap-[1rem] w-[100%] ">
          <h2 className="font-medium relative top-[-3rem]">Thread</h2>

          {threads?.specificThread && (
            <Thread
              isItSpecificThreadPage={true}
              threadData={threads.specificThread}
              totalItems={1}
              idx={0}
            />
          )}
        </div>
      </main>
    </div>
  );
}
