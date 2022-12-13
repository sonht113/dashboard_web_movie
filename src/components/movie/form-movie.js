import { Box, TextField } from "@mui/system";

const FormMovie = () => {
  return (
    <Box>
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
    </Box>
  );
};

export default FormMovie;
