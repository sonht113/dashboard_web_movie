import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Pagination,
  Modal,
  TextField,
  Typography,
  Stack,
  Button,
  Backdrop,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ImageList,
  ImageListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { products } from "../__mocks__/products";
import { TheaterListToolbar } from "../components/theater/theater-list-toolbar";
import { TheaterListResults } from "../components/theater/theater-list-result";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import theaterApi from "../api/theaterApi";

const styleStack = {
  width: 700,
  margin: "0 auto",
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
];

const Page = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Create");
  const [age, setAge] = useState("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [theaters, setTheaters] = useState([]);
  const limit = 5;

  const getAllData = async () => {
    try {
      const res = await theaterApi.getAll();
      if (!res) return;
      setTotalPage(res.length);
    } catch (err) {
      console.log(err);
    }
  };

  const getTheaterByQuery = async (search, page, limit) => {
    try {
      const res = await theaterApi.getAllQuery(search, page, limit);
      if (!res) return;
      setTheaters(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    getAllData();
  }, []);
  useEffect(() => {
    getTheaterByQuery(search, page + 1, limit);
  }, [page, search]);

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
        <Box
          sx={{
            height: 700,
            bgcolor: "background.paper",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            borderRadius: "10px",
            p: 4,
            overflowY: "scroll",
          }}
        >
          <Typography sx={{ marginBottom: 10 }} variant="h4" align="center">
            {title} Theater
          </Typography>
          <Stack spacing={5} sx={styleStack}>
            <TextField label="Theater name" type="text" />
            <TextField label="Address" type="text" />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Manager</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={age}
                label="Manager"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Holine" type="text" />
            <Box sx={{ width: 700 }}>
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
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      console.log(e.target.files);
                    }}
                  />
                </Button>
              </Box>
              <img
                width={700}
                src="https://c.wallhere.com/images/d0/d0/3c9203dca6873e85879197389228-1520111.jpg!d"
              />
            </Box>
            <Box>
              <Typography variant="h5">Room</Typography>
              <Box>
                <FormCreateMovie />
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Screen</TableCell>
                      <TableCell>Speaker</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>One piece</TableCell>
                      <TableCell>XY Screen air 150</TableCell>
                      <TableCell>NS_123</TableCell>
                      <TableCell>
                        <Button>
                          <DeleteForeverIcon color="error" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
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
          <TheaterListToolbar setOpen={setOpen} setTitle={setTitle} />
          <Box sx={{ mt: 3 }}>
            <TheaterListResults
              theaters={theaters}
              totalPage={totalPage}
              setOpen={setOpen}
              setTitle={setTitle}
              customers={customers}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const FormCreateMovie = () => {
  const [openChildModal, setOpenChildModal] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        sx={{ marginBottom: 2, float: "right" }}
        onClick={() => setOpenChildModal(true)}
      >
        Create room
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openChildModal}
        onClose={() => setOpenChildModal(false)}
        closeAfterTransition
      >
        <Box
          sx={{
            height: 500,
            bgcolor: "background.paper",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            borderRadius: "10px",
            p: 4,
            overflowY: "scroll",
          }}
        >
          <Typography sx={{ textAlign: "center", mb: 5 }} variant="h4">
            Create Room
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Stack spacing={5}>
              <TextField label="Name Movie" type="text" />
              <TextField label="Screen" type="text" />
              <TextField label="Speaker" type="text" />
            </Stack>
          </Box>
          <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
            <Button variant="contained" color="error" onClick={() => setOpenChildModal(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="success">
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Page;
