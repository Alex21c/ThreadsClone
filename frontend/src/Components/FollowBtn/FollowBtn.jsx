import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import API_ENDPOINTS from "../../config.mjs";
import { openTheMuiSnackbar } from "../../Redux/Slices/muiSnackbarSlice.mjs";
import { fetchUser } from "../../Redux/Slices/userSlice.mjs";
import { fetchAllTheUsersExceptCurrentOne } from "../../Redux/Slices/userSlice.mjs";
import { fetchSpecificUserInfo } from "../../Redux/Slices/userSlice.mjs";
import { fetchThreadsForHomepage } from "../../Redux/Slices/threadsSlice.mjs";
export default function FollowBtn({
  otherUser = null,
  theme = null,
  user = null,
  auth = null,
  dispatch = null,
  setStateUserName = null,
  setStateMakingApiCallAfterBtnClick = null,
  setStateApiReqMessage = null,
  isItProfilePage = false,
  navigate = null,
}) {
  if (!otherUser) {
    console.error("followBtn supplied with empty otherUser");
    return;
  } else if (
    !theme ||
    !user ||
    !auth ||
    !dispatch ||
    !setStateUserName ||
    !setStateMakingApiCallAfterBtnClick ||
    !setStateApiReqMessage
  ) {
    console.error(
      "followBtn supplied with empty either of theme, user or auth or dispatch or setStateUserName or setStateMakingApiCallAfterBtnClick or setStateApiReqMessage"
    );
    return;
  }
  async function makeApiCallFollowUser(userID = null, isItProfilePage = false) {
    try {
      if (!userID) {
        throw new Error("userID not provided");
      }
      setStateMakingApiCallAfterBtnClick(true);
      setStateApiReqMessage("Following...");

      const headers = {
        Authorization: auth.authorization,
        "Content-Type": "application/json",
      };
      const data = {
        userID,
      };
      const requestOptions = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
      };

      const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.User["follow-user"]}`;
      // console.log(reqURL);

      let response = await fetch(reqURL, requestOptions);

      if (!response) {
        throw new Error("No response!");
      }
      response = await response.json();
      if (!response.success) {
        throw new Error(response.message);
      }
      // console.log(response);

      // show success message
      dispatch(
        openTheMuiSnackbar({ message: response.message, type: "success" })
      );

      if (isItProfilePage) {
        const username = otherUser.username;
        dispatch(fetchSpecificUserInfo({ auth, username, navigate }));
      } else {
        // fetch
        dispatch(fetchAllTheUsersExceptCurrentOne(auth));
      }

      dispatch(fetchThreadsForHomepage(auth));
    } catch (error) {
      console.error(
        process.env.REACT_APP_PREFIX_LOCALSTORAGE +
          "CustomError: " +
          error.message
      );
      return dispatch(
        openTheMuiSnackbar({
          message: "Failed to Follower User ! " + error.message,
          type: "error",
        })
      );
    } finally {
      setStateMakingApiCallAfterBtnClick(false);
    }
  }
  async function makeApiCallUnFollowUser(
    userID = null,
    isItProfilePage = false
  ) {
    try {
      if (!userID) {
        throw new Error("userID not provided");
      }
      setStateMakingApiCallAfterBtnClick(true);
      setStateApiReqMessage("Un-Following...");

      const headers = {
        Authorization: auth.authorization,
        "Content-Type": "application/json",
      };
      const data = {
        userID,
      };
      const requestOptions = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
      };

      const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.User["unfollow-user"]}`;
      // console.log(reqURL);

      let response = await fetch(reqURL, requestOptions);

      if (!response) {
        throw new Error("No response!");
      }
      response = await response.json();
      if (!response.success) {
        throw new Error(response.message);
      }
      // console.log(response);

      // show success message
      dispatch(
        openTheMuiSnackbar({ message: response.message, type: "success" })
      );

      if (isItProfilePage) {
        const username = otherUser.username;
        dispatch(fetchSpecificUserInfo({ auth, username, navigate }));
      } else {
        // fetch
        dispatch(fetchAllTheUsersExceptCurrentOne(auth));
      }
      // update user profile
      dispatch(fetchUser(auth));
      dispatch(fetchThreadsForHomepage(auth));
    } catch (error) {
      console.error(
        process.env.REACT_APP_PREFIX_LOCALSTORAGE +
          "CustomError: " +
          error.message
      );
      return dispatch(
        openTheMuiSnackbar({
          message: "Failed to Unfollower User ! " + error.message,
          type: "error",
        })
      );
    } finally {
      setStateMakingApiCallAfterBtnClick(false);
    }
  }

  return (
    <div>
      {otherUser?.followers?.includes(user?.data?._id) ? (
        <button
          onClick={() => {
            makeApiCallUnFollowUser(otherUser?._id, isItProfilePage);
            setStateUserName(otherUser?.username);
          }}
          className=" px-[1.5rem] py-[.3rem] rounded-xl w-[100%] border-[.15rem]"
          style={{
            backgroundColor: theme.background,
            color: theme.secondaryText,
            borderColor: theme.borderColor,
          }}
        >
          Following
        </button>
      ) : (
        <button
          onClick={() => {
            makeApiCallFollowUser(otherUser?._id, isItProfilePage);
            setStateUserName(otherUser?.username);
          }}
          className=" px-[1.5rem] py-[.3rem] rounded-xl w-[100%] border-[.15rem]"
          style={{
            backgroundColor: theme.background,
            color: theme.primaryText,
            borderColor: theme.borderColor,
          }}
        >
          Follow
        </button>
      )}
    </div>
  );
}
