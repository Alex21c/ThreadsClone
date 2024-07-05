import Utils from "../../Utils.mjs";
import { openMuiModalCreateNewReply } from "../../Redux/Slices/muiModalCreateNewReplySlice.mjs";
import { fetchReplyingToThisThread } from "../../Redux/Slices/muiModalCreateNewReplySlice.mjs";
import { fetchSpecificThread } from "../../Redux/Slices/threadsSlice.mjs";
import { Link } from "react-router-dom";
export default function ThreadSegment({
  threadData = null,
  handleReqUnLikeThread = null,
  handleReqLikeThread = null,
  handleReqDeleteThread = null,
  theme = null,
  user = null,
  threads = null,
  navigate = null,
  isItSpecificThreadPage = false,
  dispatch = null,
  auth = null,
  handleReqDeleteReply = null,
  username = null,
}) {
  if (
    !threadData?._id ||
    !handleReqUnLikeThread ||
    !handleReqUnLikeThread ||
    !handleReqDeleteThread ||
    !theme ||
    !user ||
    !threads ||
    !navigate ||
    !dispatch
  ) {
    console.log("ThreadSegment: empty data provided as args");
    return;
  }

  return (
    <div className="flex gap-[1rem] cursor-pointer w-[100%] ">
      <Link
        title={`visit ${threadData?.createdBy?.username} profile`}
        to={`/profile/${threadData?.createdBy?.username}`}
        className="overflow-hidden w-[4rem] min-w-[4rem] "
      >
        <img
          src={threadData?.createdBy?.profileImage?.url}
          alt="user profile image"
          className="rounded-full"
        />
      </Link>
      <div className="flex flex-col gap-[.5rem]  w-[100%]">
        <div className="flex gap-[1rem]">
          <Link
            title={`visit ${threadData?.createdBy?.username} profile`}
            to={`/profile/${threadData?.createdBy?.username}`}
            className="font-medium"
          >
            {threadData?.createdBy?.username}
          </Link>

          <span style={{ color: theme.secondaryText }}>
            {Utils.getRelativeTime(threadData?.createdAt || null)}
          </span>
        </div>

        <div
          onClick={() => {
            const threadID = threadData._id;
            dispatch(fetchSpecificThread({ threadID, auth, navigate }));
            setTimeout(() => {
              navigate(`/thread/${threadData._id}`);
            }, 1000);
          }}
          title={`Visit Thread ${threadData?.bodyText}`}
          className="flex flex-col gap-[.5rem]"
        >
          {threadData?.bodyText && (
            <p
              style={{
                backgroundColor: "transparent",
                color: theme.primaryText,
              }}
              className="w-[100%] outline-none font-normal text-[1rem] "
            >
              {threadData.bodyText}
            </p>
          )}

          {threadData?.bodyImage?.url && (
            <div className="w-[90%] ">
              <img
                src={threadData.bodyImage.url}
                alt="image upload by user"
                className="rounded-xl"
              />
            </div>
          )}
        </div>

        <div className="flex gap-[2rem] items-center">
          <div>
            {threadData?.likes?.includes(user.data._id) ? (
              <div className="flex gap-[.5rem] items-center text-red-600">
                <i
                  className="fa-solid fa-heart text-[1.3rem] cursor-pointer"
                  title="Like"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleReqUnLikeThread(
                      threadData._id,
                      threads,
                      isItSpecificThreadPage,
                      username
                    );
                  }}
                ></i>
                <span>{threadData.likes.length}</span>
              </div>
            ) : (
              <div className="flex gap-[.5rem] items-center">
                <i
                  className="fa-light fa-heart text-[1.3rem] cursor-pointer"
                  title="Like"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleReqLikeThread(
                      threadData._id,
                      isItSpecificThreadPage,
                      username
                    );
                  }}
                ></i>
                <span>
                  {threadData.likes.length > 0 && threadData.likes.length}
                </span>
              </div>
            )}
          </div>

          <div
            className="flex gap-[.5rem] items-center"
            style={{ color: theme.secondaryText }}
            onClick={(event) => {
              event.stopPropagation();
              const threadID = threadData._id;
              dispatch(fetchReplyingToThisThread({ threadID, auth }));

              dispatch(openMuiModalCreateNewReply());
            }}
          >
            <i
              className="fa-light fa-comment text-[1.3rem] cursor-pointer"
              title="Reply"
            ></i>
            <span>
              {threadData.replies.length > 0 && threadData.replies.length}
            </span>
          </div>

          {threadData?.createdBy?._id === user.data._id && (
            <i
              className="fa-light fa-trash text-[1.3rem] cursor-pointer"
              title="Delete"
              style={{ color: theme.secondaryText }}
              onClick={(event) => {
                event.stopPropagation();
                // how to know whether to its a thread or reply ?
                if (threadData?.replyBelongsToThisThreadID) {
                  // console.log('its a reply');
                  if (handleReqDeleteReply) {
                    handleReqDeleteReply(
                      threadData._id,
                      threadData.replyBelongsToThisThreadID,
                      isItSpecificThreadPage
                    );
                  }
                } else {
                  // console.log('its a thread');
                  handleReqDeleteThread(threadData._id, isItSpecificThreadPage);
                }
              }}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
}
