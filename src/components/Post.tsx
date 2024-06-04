import { Avatar } from "@nextui-org/react";
import { postType } from "../types/types";

const Post = ({ post }: { post: postType }) => {
  return (
    <div className="w-full flex flex-col gap-3 select-none mb-10">
      <div className="author flex items-center gap-2">
        <Avatar src={post.author?.profilePicture} />
        <div className="details flex flex-col">
          <div className="name text-sm font-semibold text-white">
            {post.author?.name}
          </div>
          <div className="username text-xs font-medium text-white/50">
            {post.author?.username}
          </div>
        </div>
      </div>
      <img
        src={post.content}
        alt=""
        className="w-full aspect-square object-cover rounded-md"
      />
      <div className="title text-xs">{post.title}</div>
      <div className="comments"></div>
    </div>
  );
};

export default Post;
