import { PostCard } from "../PostCard";
import "./styles.css";

export const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts &&
        posts.map((post, index) => {
          return <PostCard key={index} post={post}></PostCard>;
        })}
    </div>
  );
};
