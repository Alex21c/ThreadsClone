import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import Thread from "../../Thread/Thread";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import MuiModalCreateNewThread from "../MuiModalCreateNewThread/MuiModalCreateNewThread";
import { openMuiModalCreateNewThread } from "../../../Redux/Slices/muiModalCreateNewThreadSlice.mjs";
import { fetchRepliesMadeByCurrentUser } from "../../../Redux/Slices/replySlice.mjs";
import { fetchThreadsCreatedByCurrentUser } from "../../../Redux/Slices/threadsSlice.mjs";
import { useParams } from "react-router-dom";
import MuiSnackbar from "../MuiSnackbar/MuiSnackbar";
import { openTheMuiSnackbar } from "../../../Redux/Slices/muiSnackbarSlice.mjs";
import API_ENDPOINTS from "../../../config.mjs";
import { useNavigate } from "react-router-dom";
import { fetchSpecificUserInfo } from "../../../Redux/Slices/userSlice.mjs";
import { fetchSpecificUserThreads } from "../../../Redux/Slices/threadsSlice.mjs";
import { fetchSpecificUserReplies } from "../../../Redux/Slices/replySlice.mjs";
import FollowBtn from "../../FollowBtn/FollowBtn";
import MuiModalEditProfile from "../MuiModalEditProfile/MuiModalEditProfile";
import { openMuiModalEditProfile } from "../../../Redux/Slices/muiModalEditProfile.mjs";
import "./MuiTabForProfilePage.css";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function MuiTabForProfilePage({
  wantOnlySelfReplyLatestOne = false,
}) {
  const [value, setValue] = React.useState(0);
  const theme = useSelector((store) => store.theme);
  const user = useSelector((store) => store.user);
  const auth = useSelector((store) => store.auth);
  const replies = useSelector((store) => store.replies);
  const threads = useSelector((store) => store.threads);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useParams();
  let [stateUserName, setStateUserName] = useState("");
  const [stateApiReqMessage, setStateApiReqMessage] = useState("Wait...");
  const [stateMakingApiCall, setStateMakingApiCallAfterBtnClick] =
    useState(false);

  const defaultState = {
    user: user?.data || {},
    threads: threads?.threadsCreatedByCurrentUser || [],
    replies: replies?.repliesMadeByCurrentUser || [],
  };

  const speficUserInfo = {
    user: user?.specificUserInfo || {},
    threads: user?.specificUserThreads || [],
    replies: user?.specificUserReplies || [],
  };

  // specific user info
  useEffect(() => {
    if (username) {
      dispatch(fetchSpecificUserInfo({ auth, username, navigate }));
      dispatch(fetchSpecificUserThreads({ auth, username }));
      dispatch(fetchSpecificUserReplies({ auth, username }));
    }
  }, []);

  let [stateProfilePage, setStateProfilePage] = useState(
    username ? speficUserInfo : defaultState
  );

  // update if user interact with them
  useEffect(() => {
    if (!username) {
      setStateProfilePage((previousState) => ({
        ...previousState,
        user: user?.data || {},
      }));
    } else {
      setStateProfilePage((previousState) => ({
        ...previousState,
        user: user?.specificUserInfo || {},
      }));
    }
  }, [user]);
  useEffect(() => {
    if (!username) {
      setStateProfilePage((previousState) => ({
        ...previousState,
        threads: threads?.threadsCreatedByCurrentUser || [],
      }));
    } else {
      setStateProfilePage((previousState) => ({
        ...previousState,
        threads: threads?.specificUserThreads || [],
      }));
    }
  }, [threads]);
  useEffect(() => {
    if (!username) {
      setStateProfilePage((previousState) => ({
        ...previousState,
        replies: replies?.repliesMadeByCurrentUser || [],
      }));
    } else {
      setStateProfilePage((previousState) => ({
        ...previousState,
        replies: replies?.specificUserReplies || [],
      }));
    }
  }, [replies]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (stateProfilePage?.threads?.length === 0) {
      dispatch(fetchThreadsCreatedByCurrentUser(auth));
    }

    if (stateProfilePage?.replies?.length === 0) {
      dispatch(fetchRepliesMadeByCurrentUser(auth));
    }
  }, []);

  function handleReqCreateThreadBtnClicked() {
    dispatch(openMuiModalCreateNewThread());
  }

  return (
    <Box
      sx={{
        width: "40rem",
        backgroundColor: theme.backgroundHover,
        borderColor: theme.borderColor,
        color: theme.primaryText,
      }}
      className="border-[.1rem] rounded-tl-2xl rounded-tr-2xl p-[1rem] pb-[0] w-[40rem] min-h-[91vh] border-b-[0] m-[auto] mt-[1rem]"
      id="wrapperDivProfilePage"
    >
      <MuiModalCreateNewThread />
      <MuiModalEditProfile />
      <MuiSnackbar />
      <Box>
        <div className="flex justify-between">
          <div className="flex flex-col gap-[1rem]">
            <div className="flex flex-col gap-[0rem]">
              <h3 className="font-bold text-[1.5rem] hover:underline transition cursor-pointer">{`${stateProfilePage?.user?.firstName} ${stateProfilePage?.user?.lastName}`}</h3>
              <span>{stateProfilePage?.user?.username}</span>
            </div>

            <span>{stateProfilePage?.user?.bio}</span>
          </div>
          <div className="w-[5rem] overflow-hidden">
            <img
              src={
                stateProfilePage?.user?.profileImage?.url ||
                process.env.REACT_APP_DEFAULT_USER_PROFILE_IMAGE_URL
              }
              className="w-[100%] rounded-full"
            />
          </div>
        </div>
        <div
          className="flex  justify-between w-[100%] items-center py-[.5rem] "
          id="parentFollowersCountAndLink"
        >
          <div className="flex gap-[.7rem]" id="followersCountAndLink">
            <span
              style={{ color: theme.secondaryText }}
              className=" hover:underline transition cursor-pointer"
            >
              {stateProfilePage?.user?.followers?.length} follower
              {stateProfilePage?.user?.followers?.length === 1 ? "" : "s"}
            </span>
            {stateProfilePage?.user?.customLink && (
              <div className="flex gap-[.5rem] items-center">
                <span
                  style={{
                    color: theme.secondaryText,
                    backgroundColor: theme.secondaryText,
                  }}
                  className="w-[.2rem] h-[.3rem] rounded-full"
                ></span>
                <a
                  className="hover:underline"
                  href={stateProfilePage?.user?.customLink}
                  style={{ color: theme.secondaryText }}
                >
                  {stateProfilePage?.user?.customLink}
                </a>
              </div>
            )}
          </div>

          {username && (
            <FollowBtn
              otherUser={stateProfilePage?.user}
              theme={theme}
              user={user}
              auth={auth}
              dispatch={dispatch}
              setStateUserName={setStateUserName}
              setStateMakingApiCallAfterBtnClick={
                setStateMakingApiCallAfterBtnClick
              }
              setStateApiReqMessage={setStateApiReqMessage}
              isItProfilePage={true}
              fetchSpecificUserInfo={fetchSpecificUserInfo}
              navigate={navigate}
            />
          )}
        </div>

        {!username && (
          <div>
            <button
              className=" px-[1.5rem] py-[.4rem] rounded-xl w-[100%] border-[.15rem] font-medium"
              onClick={() => dispatch(openMuiModalEditProfile())}
              style={{
                backgroundColor: "transparent",
                color: theme.primaryText,
                borderColor: theme.borderColor,
              }}
            >
              Edit Profile
            </button>
          </div>
        )}
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Profile Tabs"
          textColor="inherit"
          variant="fullWidth"
          TabIndicatorProps={{
            style: {
              backgroundColor: theme.primaryText, // Customize the indicator color here
            },
          }}
        >
          <Tab
            label="Threads"
            {...a11yProps(0)}
            sx={{
              color: value === 0 ? theme.primaryText : theme.secondaryText,
              "&.Mui-selected": {
                color: theme.primaryText,
              },
            }}
          />
          <Tab
            label="Replies"
            {...a11yProps(1)}
            sx={{
              color: value === 1 ? theme.primaryText : theme.secondaryText,
              "&.Mui-selected": {
                color: theme.primaryText,
              },
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {stateProfilePage?.threads?.length > 0 ? (
          stateProfilePage?.threads
            ?.filter((thread) => thread.replyBelongsToThisThreadID === null)
            .map((thread, idx) => (
              <Thread
                key={thread._id}
                threadData={thread}
                totalItems={stateProfilePage?.threads?.length}
                idx={idx}
                wantOnlySelfReplyLatestOne={wantOnlySelfReplyLatestOne}
                username={username}
              />
            ))
        ) : (
          <div className="flex flex-col gap-[1rem]">
            {!username ? (
              <span>
                hello {stateProfilePage.user.firstName}, you haven't created any
                threads yet !
              </span>
            ) : (
              <span>
                {stateProfilePage.user.firstName} hasn't created any threads yet
                !
              </span>
            )}

            {!username && (
              <button
                onClick={() => handleReqCreateThreadBtnClicked()}
                className="p-[1rem] border-[.2rem] rounded-xl"
                style={{
                  borderColor: theme.borderColor,
                  backgroundColor: theme.backgroundHover,
                }}
              >
                Create Yours first Thread !
              </button>
            )}
          </div>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {stateProfilePage?.replies?.length > 0 ? (
          stateProfilePage?.replies.map((thread, idx) => (
            <Thread
              key={thread._id}
              threadData={thread}
              totalItems={stateProfilePage?.replies?.length}
              idx={idx}
              wantToSeeReplyBelongsToThisThreadID={true}
              username={username}
            />
          ))
        ) : (
          <div className="flex flex-col gap-[1rem]">
            {!username ? (
              <span>
                hello {stateProfilePage.user.firstName}, you haven't made any
                replies yet !
              </span>
            ) : (
              <span>
                {stateProfilePage.user.firstName} hasn't made any replies yet !
              </span>
            )}
          </div>
        )}
      </CustomTabPanel>
    </Box>
  );
}
