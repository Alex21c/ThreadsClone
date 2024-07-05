import * as React from "react";
import { isURL } from "validator";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeMuiModalEditProfile } from "../../../Redux/Slices/muiModalEditProfile.mjs";
import { useState } from "react";
import CircularProgressInfinite from "../CirclularProgressInfinite/CircularProgressInfinite";
import { openTheMuiSnackbar } from "../../../Redux/Slices/muiSnackbarSlice.mjs";
import API_ENDPOINTS from "../../../config.mjs";
import { fetchUser } from "../../../Redux/Slices/userSlice.mjs";
import { fetchThreadsCreatedByCurrentUser } from "../../../Redux/Slices/threadsSlice.mjs";
import { fetchRepliesMadeByCurrentUser } from "../../../Redux/Slices/replySlice.mjs";
export default function MuiModalEditProfile() {
  const auth = useSelector((store) => store.auth);
  const user = useSelector((store) => store.user);
  let [statePreviewImageSrc, setStatePreviewImageSrc] = useState(
    user?.data?.profileImage?.url || ""
  );
  const dispatch = useDispatch();
  const open = useSelector((store) => store.muiModalEditProfile.open);
  const [stateApiReqMessage, setStateApiReqMessage] = useState("Wait...");
  const [stateMakingApiCall, setStateMakingApiCallAfterBtnClick] =
    useState(false);

  const theme = useSelector((store) => store.theme);
  const refImageFile = useRef(null);
  const refBio = useRef(null);
  const refCustomLink = useRef(null);
  const handleClose = () => {
    dispatch(closeMuiModalEditProfile());
    resetProfileModal({ refBio, refCustomLink, refImageFile });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    borderColor: theme.borderColor,
    p: 4,
    borderWidth: ".13rem",
    backgroundColor: theme.backgroundHover,
    color: theme.brightText,
    maxHeight: "90vh",
    overflowY: "auto",
  };

  async function changeProfileImage(refImageFile) {
    await refImageFile.current.click();
  }

  function handleInputImageFileChange(refImageFile) {
    const file = refImageFile.current.files[0];
    // validation

    const allowedProfileImageSize =
      Number(process.env.REACT_APP_MAX_ALLOWED_PROFILE_IMAGE_SIZE_IN_KB) * 1000;

    if (file.size > allowedProfileImageSize) {
      refImageFile.current.value = "";
      setStatePreviewImageSrc(user?.data?.profileImage?.url || "");
      return dispatch(
        openTheMuiSnackbar({
          message: `image size is ${Math.floor(
            file.size / 1000
          )}KB which is too large, it should be less than ${
            process.env.REACT_APP_MAX_ALLOWED_PROFILE_IMAGE_SIZE_IN_KB
          }KB`,
          type: "error",
        })
      );
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStatePreviewImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async function updateProfile(refImageFile, refBio, refCustomLink) {
    try {
      // if(!query){
      //   return;

      // }

      setStateMakingApiCallAfterBtnClick(true);
      setStateApiReqMessage("Updating Yours Profile...");

      // is there any image provided by user
      let userProfileImageUpdated = null;
      if (refImageFile?.current?.files[0]) {
        userProfileImageUpdated = refImageFile.current.files[0];
      }
      // console.log(userProfileImageUpdated);

      // has user made chanes to bio?
      let userBioUpdated = null;
      if (refBio.current.value != user?.data?.bio) {
        userBioUpdated = refBio.current.value;
      }
      // console.log(userBioUpdated);

      // is the link same or different ?
      let userCustomLinkUpdated = null;
      if (refCustomLink.current.value != user?.data?.customLink) {
        if (isURL(refCustomLink.current.value)) {
          userCustomLinkUpdated = refCustomLink.current.value;
        } else {
          return dispatch(
            openTheMuiSnackbar({
              message: `URL provided in the link is invalid !`,
              type: "error",
            })
          );
        }
      }

      // is it valid link?
      if (
        !userCustomLinkUpdated &&
        !userBioUpdated &&
        !userProfileImageUpdated
      ) {
        return dispatch(
          openTheMuiSnackbar({
            message: `Nothing to update !`,
            type: "info",
          })
        );
      }

      // making api call
      const formData = new FormData();
      if (userProfileImageUpdated) {
        formData.append("bodyImage", userProfileImageUpdated);
      }
      if (userBioUpdated) {
        formData.append("userBioUpdated", userBioUpdated);
      }
      if (userCustomLinkUpdated) {
        formData.append("userCustomLinkUpdated", userCustomLinkUpdated);
      }

      const headers = {
        Authorization: auth.authorization,
      };

      const requestOptions = {
        method: "PUT",
        headers: headers,
        body: formData,
      };

      const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.User["update-profile"]}`;

      let response = await fetch(reqURL, requestOptions);

      if (!response) {
        return dispatch(
          openTheMuiSnackbar({
            message: "Unable to Update Profile!",
            type: "error",
          })
        );
      }
      response = await response.json();
      // if sucess: false
      if (!response.success) {
        return dispatch(
          openTheMuiSnackbar({ message: response.message, type: "error" })
        );
      }

      // show success messsage to user
      dispatch(
        openTheMuiSnackbar({ message: response.message, type: "success" })
      );
      // // refresh the profile
      dispatch(fetchUser(auth));
      dispatch(fetchThreadsCreatedByCurrentUser(auth));
      dispatch(fetchRepliesMadeByCurrentUser(auth));

      // close the modal
      /// clear image and textarea
      async function closeTheModal() {
        return new Promise((resolve, rejected) => {
          setTimeout(() => {
            resetProfileModal({ refBio, refCustomLink, refImageFile });
            handleClose();
            resolve();
          }, 3000);
        });
      }
      await closeTheModal();
    } catch (error) {
      console.error(
        process.env.REACT_APP_PREFIX_LOCALSTORAGE +
          "CustomError: " +
          error.message
      );
      return dispatch(
        openTheMuiSnackbar({ message: error.message, type: "error" })
      );
    } finally {
      setStateMakingApiCallAfterBtnClick(false);
    }
  }

  function resetProfileModal({ refBio, refCustomLink, refImageFile }) {
    if (refBio?.current?.value) {
      refBio.current.value = user?.data?.bio;
    }
    if (refCustomLink?.current?.value) {
      refCustomLink.current.value = user?.data?.customLink;
    }
    if (refImageFile?.current?.value) {
      refImageFile.current.value = "";
    }
    setStatePreviewImageSrc(user?.data?.profileImage?.url || "");
  }

  return (
    <div>
      <Modal
        className="relative"
        open={open}
        onClose={handleClose}
        aria-labelledby="Edit profile"
        aria-describedby="helps editing user profile"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: theme.background,
            },
          },
        }}
      >
        <Box
          sx={style}
          style={{ color: theme.primaryText }}
          className={`outline-none p-[.8rem] border rounded-xl  cursor-pointer hover:border-[blue-300]  w-[35rem]  flex flex-col `}
        >
          <h2 className="self-center top-[-1.3rem] relative font-semibold text-[1.1rem]">
            Edit Profile
          </h2>
          <form className="flex flex-col gap-[1rem] " action="#">
            <div className="flex gap-[1rem]">
              <div className="flex flex-col gap-[1rem] w-[100%]">
                <h3 className="font-medium">
                  {user?.data?.firstName} {user?.data?.lastName}
                </h3>
                <h3 className="font-medium">Bio</h3>
                <textarea
                  ref={refBio}
                  className="p-[1rem]"
                  style={{
                    color: theme.primaryText,
                    backgroundColor: theme.background,
                  }}
                  defaultValue={user?.data.bio}
                ></textarea>
                <h3 className="font-medium">Link</h3>
                <input
                  type="url"
                  ref={refCustomLink}
                  className="p-[1rem]"
                  style={{
                    color: theme.primaryText,
                    backgroundColor: theme.background,
                  }}
                  defaultValue={user?.data.customLink}
                ></input>
              </div>
              <div className="hidden">
                <input
                  ref={refImageFile}
                  type="file"
                  accept="image/*"
                  onChange={() => handleInputImageFileChange(refImageFile)}
                />
              </div>
              <div className="w-[11rem] relative ">
                <img
                  src={statePreviewImageSrc}
                  className="rounded-full overflow-hidden"
                />
                <i
                  onClick={() => changeProfileImage(refImageFile)}
                  style={{
                    color: theme.primaryText,
                    backgroundColor: theme.background,
                    opacity: 0.8,
                  }}
                  className="fa-regular fa-pencil absolute right-[-1.5rem] top-[-1rem] text-[2rem] px-[1rem] py-[.5rem] rounded-full"
                ></i>
              </div>
            </div>

            <div className="flex gap-[.5rem]">
              {stateMakingApiCall ? (
                <div>
                  <CircularProgressInfinite message={stateApiReqMessage} />
                </div>
              ) : (
                <>
                  <input
                    type="submit"
                    onClick={(event) => {
                      event.preventDefault();
                      updateProfile(refImageFile, refBio, refCustomLink);
                    }}
                    className=" px-[1.5rem] py-[.4rem] rounded-xl w-[100%] border-[.15rem] font-medium"
                    style={{
                      backgroundColor: "transparent",
                      color: theme.primaryText,
                      borderColor: theme.borderColor,
                    }}
                    value="Update"
                  />

                  <button
                    className=" px-[1.5rem] py-[.4rem] rounded-xl w-[100%] border-[.15rem] font-medium"
                    onClick={() => dispatch(closeMuiModalEditProfile())}
                    style={{
                      backgroundColor: "transparent",
                      color: theme.primaryText,
                      borderColor: theme.borderColor,
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className=" px-[1.5rem] py-[.4rem] rounded-xl w-[100%] border-[.15rem] font-medium"
                    onClick={() =>
                      resetProfileModal({ refBio, refCustomLink, refImageFile })
                    }
                    style={{
                      backgroundColor: "transparent",
                      color: theme.primaryText,
                      borderColor: theme.borderColor,
                    }}
                  >
                    Reset
                  </button>
                </>
              )}
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
