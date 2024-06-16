import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { BaseBEURL } from "constants/baseBE";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setComments, setPost } from "state";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { categoryConst } from "constants/category";
import CommentItem from "./CommentItem";
import { useNavigate } from 'react-router-dom';
const PostWidget = ({
  postId,
  postUserId,
  name,
  title,
  description,
  picturePath,
  userPicturePath,
  likes,
  address,
  category,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [postComments, setPostComments] = useState([]);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [reload, setReload] = useState(false);
  const [newComment, setNewComment] = useState('');

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`${BaseBEURL}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const getComment = async () => {
    const response = await fetch(`${BaseBEURL}/comment/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    const postComments = await response.json();
    setPostComments(postComments);
  }

  const commentTo = async () => {
    try {
      const response = await fetch(`${BaseBEURL}/comment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUserId,
          eventId: postId,
          comment: newComment,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // const newComment = await response.json();
      setReload(!reload); // Toggle reload to trigger useEffect
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  }

  const navigate = useNavigate();

  const handleRedirectChat = () => {
    // console.log("loggedInuserId", loggedInUserId)
    let userId = '666e6f1a127f16d3e8b58512'
    navigate(`/chat/${userId}`);
    // navigate('/chat')
  };

  useEffect(() => {
    getComment();
  }, [reload]);

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={address}
        userPicturePath={userPicturePath}
      />
      <Typography fontWeight={700} sx={{ mt: 2 }}>{title}</Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${picturePath}`}
        />
      )}
      <Box display="flex" justifyContent="space-between" pt={1}>
        <Chip
          icon={<BookmarkIcon />}
          variant="outlined"
          label={categoryConst.find((cat) => cat.type === category)?.value}
        />

        <Button variant="contained" onClick={handleRedirectChat}>Liên hệ</Button>
      </Box>

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => {
              setIsComments(!isComments);
            }}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{postComments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {postComments.map((item) => (
            <Box key={item._id}>
              <Divider />
              <CommentItem name={`${item.firstName} ${item.lastName}`} avartarUrl={item.userPicturePath} comment={item.comment} />
            </Box>
          ))}
          <Divider />
          <Box pt={2} sx={{ width: "100%" }} gap={1} display={"flex"}>
            <TextField
              sx={{
                width: "80%",
              }}
              InputProps={{
                sx: {
                  maxHeight: 40,
                  borderRadius: 10,
                },
              }}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button variant="text" onClick={commentTo}>Comment</Button>
          </Box>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
