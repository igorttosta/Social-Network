import React from "react";
import { Paper, CardHeader, CardMedia, CardContent, CardActions, Typography } from '@mui/material';
import CustomAvatar from "../CustomAvatar";
import CustomActionIcon from "../CustomActionIcon";
import { Post } from "../../Models/Post";

interface Props {
    post: Post;
    handlePostClick: any;
}

const PostCard = ({ post, handlePostClick }: Props ) => {
    

    return (
        <Paper 
            elevation={0}
            sx={{ marginX: 24 }}
          >
            <div onClick={() => handlePostClick(post._id)}>
                <CardHeader 
                avatar={<CustomAvatar profileName={post.profile.name}/>}
                title={post.title}
                />

                {post.image ? 
                    (<CardMedia component="img" image={post.description} alt={post.title} />) 
                :
                    (<CardContent>
                        <Typography 
                            variant="body2" 
                            color="text.secondary"
                        >
                            {post.description}
                        </Typography>
                    </CardContent>)
                }
            </div>
            <CardActions>
                <div className="CardAction">
                    <CustomActionIcon 
                        commentsCount={post.comments.length} 
                        likeCount={post.likes.length} 
                        likes={post.likes}
                        postId={post._id}
                    />
                </div>
            </CardActions>
        </Paper>
    )
}

export default PostCard;