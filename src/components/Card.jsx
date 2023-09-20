import { Box, Card, CardContent, CardActions, Typography } from "@mui/material";
import { ShowButton } from "react-admin";

export const PostCard = ({}) => {
  return (
    <Box sx={{ marginBottom: 1 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2">{post.content}</Typography>
          <Typography sx={{ fontSize: 10 }} color="text.secondary">
            {`Index: ${post.index}`}
          </Typography>
        </CardContent>
        <CardActions>
          <ShowButton resource="posts" record={post} />
        </CardActions>
      </Card>
    </Box>
  );
};
