import { Box, Button } from "@mui/material";
import { accounts } from "constants/account";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state";

function ChooseUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async (values) => {
    const loggedInResponse = await fetch("https://social-media-server-sigma-rose.vercel.app/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  return (
    <Box display="flex" gap={2}>
      {accounts.map((item) => {
        return (
          <Button
            variant="contained"
            sx={{ width: 100, height: 50 }}
            onClick={() => {
              console.log(item);
              login({ email: item.email, password: item.password });
            }}
          >
            User {item.id}
          </Button>
        );
      })}
    </Box>
  );
}

export default ChooseUser;
