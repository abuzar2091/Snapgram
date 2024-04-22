import React from "react";
import StoryShow from "./StoryShow";

function Highlights({ user }) {
  // return (
  //     <div className="flex gap-3">
  //       <StoryShow
  //         postImg={data.storyImg}
  //         userImg={user.imageUrl}
  //         username={user.username}
  //         createdAt={data.createdAt}
  //       />
  //     </div>
  //   );

  return (
    <>
      {user &&
        user.highlights.map((highlight) => {
            const data=JSON.parse(highlight);

            return (
          <div className="flex gap-3">
            <StoryShow
              postImg={data.highlightUrl}
              username={data.highlightTitle}
              createdAt={data.createdAt}
              isHighlight={true}
              user={user}
            />
          </div>
            )
        })}
    </>
  );
}

export default Highlights;
