/* eslint-disable @typescript-eslint/no-unused-vars */
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { authAtom, postAtom } from "../atom/atom";
import Post from "../components/Post";
import axios from "axios";
import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useRecoilState(postAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    // if (auth) {
    const res = await axios.get(import.meta.env.VITE_SERVER_URL + "/posts", {
      withCredentials: true,
    });
    if (res.data.success) {
      setPosts((prev) => [...prev, ...res.data.data.posts]);
      setCount(res.data.data.count);
      setLoading(false);
    }
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <InfiniteScroll
      refreshFunction={async () => {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/posts",
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setPosts([...res.data.data.posts]);
        }
      }}
      dataLength={posts.length}
      next={fetchData}
      hasMore={posts.length < count}
      loader={
        <div className="wrapper w-full my-6 h-max flex items-center justify-center">
          <Spinner />
        </div>
      }
      endMessage={
        <div className="w-full flex items-center justify-center pt-20 pb-40">
          <b>Yay! You have seen it all</b>
        </div>
      }
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <div className="w-full items-center flex justify-center">
          <span className="px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm ">
            &#8595; Pull down to refresh
          </span>
        </div>
      }
      releaseToRefreshContent={
        <div className="w-full items-center flex justify-center">
          <span className="px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm ">
            &#8595; Relese to refresh
          </span>
        </div>
      }
      className="w-[clamp(100px,400px,90vw)] gap-10"
    >
      {posts.map((e, i) => {
        return <Post post={e} key={i} />;
      })}
    </InfiniteScroll>
  );
};

export default Posts;
