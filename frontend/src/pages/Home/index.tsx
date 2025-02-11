import React, { useState, useEffect } from 'react';
import CustomAppBar from '../../components/CustomAppBar';
import server from '../../api/server';
import PostCard from '../../components/PostCard';
import { Divider } from '@mui/material';
import { Post } from "../../Models/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
interface Props {
  post: Post;
}

const Home = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true);

  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
}

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await server.get(`/feed?page=${page}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setHasMore(response.data.length > 0);
        setPosts([ ...posts, ...response.data ])
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, [token, page]);

  const loadMorePosts = () => {
    setPage(page + 1);
  }

  return (
    <div>
      <CustomAppBar title='Home'/>
      <div style={{ marginTop: "56px" }}>
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {posts && posts.map((post) => (
            <div key={post._id}>
              <PostCard post={post} handlePostClick={handlePostClick} />
              <Divider/>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;