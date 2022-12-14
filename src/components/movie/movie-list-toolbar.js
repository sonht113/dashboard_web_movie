import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { Search as SearchIcon } from "../../icons/search";
import ClearIcon from "@mui/icons-material/Clear";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";

export const MovieListToolbar = ({ handleOpen, setKeyword, keyword }) => {
  const [showClearIcon, setShowClearIcon] = useState("none");

  const handleChange = (event) => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setKeyword(event.target.value);
  };

  const handleClick = () => {
    setKeyword("");
    console.log("clicked the clear icon...", keyword);
  };

  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Movies
        </Typography>
        <FormControl sx={{ margin: 0 }}>
          <TextField
            size="small"
            variant="outlined"
            value={keyword}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ display: showClearIcon, cursor: "pointer" }}
                  onClick={handleClick}
                >
                  <ClearIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Box sx={{ m: 1 }}>
          <Button
            onClick={() => {
              handleOpen();
            }}
            color="primary"
            variant="contained"
          >
            Add Movie
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
