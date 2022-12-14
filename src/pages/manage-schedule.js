import Head from "next/head";
import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Pagination,
  Modal,
  Typography,
  Stack,
  TextField,
  Button,
  Backdrop,
} from "@mui/material";
import { ManagerListToolbar } from "../components/manager/manager-list-toolbar";
import { ManagerListResult } from "../components/manager/manager-list-results";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";

const styleStack = {
  width: 500,
  margin: "0 auto",
};

const Page = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Create");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <FormSchedule title={title} handleClose={handleClose} />
      </Modal>
      <Head>
        <title>Products | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ManagerListToolbar setOpen={setOpen} setTitle={setTitle} />
          <Box sx={{ mt: 3 }}>
            <ManagerListResult setOpen={setOpen} setTitle={setTitle} customers={customers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

const FormSchedule = ({ handleClose, title }) => {
  return (
    <Box
      sx={{
        height: 700,
        bgcolor: "background.paper",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700,
        borderRadius: "10px",
        p: 4,
        overflowY: "scroll",
      }}
    >
      <Typography sx={{ marginBottom: 10 }} variant="h4" align="center">
        {title} Manager
      </Typography>
      <Stack spacing={5} sx={styleStack}>
        <TextField label="Name" type="text" />
        <TextField label="Address" type="text" />
        <TextField label="Birthday" type="text" />
        <TextField label="Theater" type="text" />
        <TextField label="Email" type="text" />
        <TextField label="Phone" type="text" />
        <TextField label="Username" type="text" />
        <TextField label="Password" type="password" />
        <Box sx={{ width: 500 }}>
          <Typography>Description:</Typography>
          <textarea
            title="Description"
            rows={8}
            style={{ width: "100%", outline: "none", padding: "10px" }}
            placeholder="Description"
          />
        </Box>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center", gap: 3 }}>
            <Typography>Image:</Typography>
            <Button variant="contained" component="label" sx={{ marginBottom: 2 }}>
              Upload
              <input
                onChange={(e) => {
                  console.log(e.target.files[0]);
                }}
                hidden
                accept="image/*"
                type="file"
              />
            </Button>
          </Box>
          <img
            width={500}
            src="https://c.wallhere.com/images/d0/d0/3c9203dca6873e85879197389228-1520111.jpg!d"
          />
        </Box>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 2 }}>
        <Button onClick={() => handleClose()} variant="contained" color="error">
          Cancel
        </Button>
        <Button variant="contained" color="success">
          {title}
        </Button>
      </Box>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
