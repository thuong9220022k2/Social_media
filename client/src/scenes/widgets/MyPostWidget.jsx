import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Grid,
  TextField,
  Modal,
  Select,
  MenuItem,
} from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { BaseBEURL } from "constants/baseBE";
import { categoryConst } from "constants/category";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MyPostWidget = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");

  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // const mediumMain = palette.neutral.mediumMain;
  // const medium = palette.neutral.medium;

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("address", address);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    console.log(formData)
    const response = await fetch(`${BaseBEURL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("file", file);
    setImage(file);
    setError(null);
  };

  return (
    <WidgetWrapper>
      <Typography>Bạn muốn đăng gì?</Typography>
      <Box width={"100%"}>
        <Box
          onClick={handleOpen}
          sx={{
            width: "100%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
            borderRadius: 1,
          }}
        >
          <Box display="flex" width="100%" gap={2} alignItems="center">
            <Box minHeight={40} width={"80%"} border={1} borderRadius={2} />
            <Button variant="contained" sx={{ height: 40 }}>
              <AddCircleOutlineOutlinedIcon sx={{ color: "#ffffff" }} />
            </Button>
          </Box>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h1"
            textAlign="center"
            fontSize="20px"
          >
            Đăng bài
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography padding="0 0 10px 0">Tiêu đề</Typography>
                <TextField
                  label="Tiêu đề"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography padding="0 0 10px 0">Mô tả</Typography>
                <TextField
                  label="Ex: Mặt hàng top tier trên gian tiktok"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography padding="0 0 10px 0">Phân loại</Typography>
                <Select
                  value={category}
                  fullWidth
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                >
                  {categoryConst.map((item) => {
                    return <MenuItem value={item.type}>{item.value}</MenuItem>;
                  })}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Typography padding="0 0 10px 0">Địa chỉ</Typography>
                <TextField
                  label="Địa chỉ gặp trực tiếp"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid>
                <Box p={3} borderRadius={8} textAlign="center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="image-file-input"
                  />
                  <label htmlFor="image-file-input">
                    <Button variant="outlined" component="span">
                      Chọn ảnh
                    </Button>
                  </label>
                  {image && (
                    <div>
                      <Typography variant="subtitle1">{image.name}</Typography>
                    </div>
                  )}
                  {error && (
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained">
                Đăng
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
