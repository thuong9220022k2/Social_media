import { Box } from "@mui/material";
import { BaseBEURL } from "constants/baseBE";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size} sx={{border: 1, borderRadius: "50%"}}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image}
      />
    </Box>
  );
};

export default UserImage;
