import { Box, Button, Typography } from "@mui/material";

export const ManagerListToolbar = ({ setOpen, getAllTheater, setTitle, getAllMoive }) => {
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
          Schedule
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              getAllMoive();
              getAllTheater();
              setTitle("Create");
              setOpen(true);
            }}
          >
            Add Schedule
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
