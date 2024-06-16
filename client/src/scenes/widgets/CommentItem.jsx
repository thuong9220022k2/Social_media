const { Box, Typography } = require("@mui/material");
const { default: UserImage } = require("components/UserImage");



function CommentItem({
    name,
    avartarUrl,
    comment,
}) {
    return <Box pt={2} width={"100%"} display={"flex"} flexDirection={"column"} gap={2}>
        <Box display={"flex"} gap={2} alignItems={"center"}>
            <UserImage image={avartarUrl} size="30px" />
            <Typography fontWeight={700}>{name}</Typography>
        </Box>
        <Typography pl={6} pb={2}>{comment}</Typography>
    </Box>
}

export default CommentItem;