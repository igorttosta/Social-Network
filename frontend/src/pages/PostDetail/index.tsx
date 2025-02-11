import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider, TextField, Paper, Button, CardHeader } from '@mui/material';

import CustomAppBar from '../../components/CustomAppBar';
import PostCard from '../../components/PostCard';
import { Post } from '../../Models/Post';

import CustomAvatar from '../../components/CustomAvatar';
import server from '../../api/server';

const PostDetail = () => {
    const { postId } = useParams();
    const token = localStorage.getItem("accessToken");
    const profileId = localStorage.getItem("profile");
    const profileName = localStorage.getItem("user");
    const [post, setPost] = useState<Post>();
    const [comment, setComment] = useState({ value: '', error: '' });

    useEffect(() => {

        const getPosts = async () => {
            try {
                const response = await server.get(`/posts/${postId}`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                });  
                setPost(response.data);         
            } catch (error) {
                console.log(error);
            }
        }   
        
        getPosts();

    }, [token])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await server.post(`/posts/${postId}/comments`, { description: comment.value }, {
                headers: {
                    authorization: `Bearer ${token}`, 
                }
            })

            setComment({ ...comment, value: "" });
            const newComment = {
                ...response.data,
                profile: {
                    _id: profileId,
                    name: profileName,
                }
            }
            post?.comments.push(newComment);
            setPost(post);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <CustomAppBar title='PostDetail' />
        <div style={{ marginTop: 56 }}>
        {post &&  <PostCard post={post} handlePostClick={() => {}} />}
        </div>
        <Divider />
        <Paper 
            elevation={0}
            sx={{ marginX: 24, marginTop: 2 }}
        >
            <form onSubmit={(e) => handleSubmit(e)}>
                <TextField 
                    id='comment' 
                    label='Comentário' 
                    variant='standard' 
                    multiline 
                    minRows={3} 
                    fullWidth
                    value={comment.value} 
                    onChange={(e) => setComment({ value: e.target.value, error: '' })}
                />
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'end'
                }}>
                    <Button 
                        variant='contained' 
                        type='submit'
                        sx={{ marginTop: 2 }}
                    >
                        Publicar
                    </Button>
                </div>
            </form>
        </Paper>
        <Divider sx={{ marginX: 24, marginY: 2 }}/>
        
            {post?.comments && post?.comments.map(item => (
                <div key={item._id}>
                    <Paper 
                    elevation={0}
                    sx={{ marginTop: 2 }}
                    >
                        <CardHeader
                            avatar={<CustomAvatar profileName={item.profile.name} />}
                            title={item.description}
                        />
                    </Paper>
                    <Divider />
                </div>
            ))}
        
    </div>
  );
};

export default PostDetail;