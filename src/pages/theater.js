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
import { notifyFail, notifySuccess } from "../helpers/notifi";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const styleStack = {
  width: 700,
  margin: "0 auto",
};

const currentTheater = {
  name: "",
  address: "",
  hostline: "",
  description: "",
  manager_name: {
    id: 13,
    name: "",
  },
};

const Page = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Create");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [theaters, setTheaters] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [dataForm, setDataForm] = useState({ ...currentTheater });
  const [idUpdate, setIdUpdate] = useState("");
  const limit = 5;
  const formData = new FormData();

  if (image) {
    formData.append("image", image);
  }
  formData.append("theaterDto", JSON.stringify(formData));

  const handleClose = () => {
    setImagePreview("");
    setDataForm({ ...currentTheater });
    setImage(null);
    setOpen(false);
  };

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

  const getDetail = async (id) => {
    try {
      const res = await theaterApi.getDetail(id);
      if (!res) return;
      setDataForm({ ...res });
    } catch (error) {
      console.log(error);
    }
  };

  const add = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/theater/new`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.status == 200) {
          notifySuccess("Create");
          handleClose();
          getAllData();
          getTheaterByQuery(search, page + 1, limit);
        } else {
          notifyFail("Create");
          notifyFail("Create", "exist");
        }
      })
      .catch((err) => {
        notifyFail("Create");
        notifyFail("Create", "exist");
      });
  };

  const deleteTheater = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/theater/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status == 200) {
          notifySuccess("Delete");
          handleClose();
          getAllData();
          getTheaterByQuery(search, page + 1, limit);
        } else {
          notifyFail("Delete");
        }
      })
      .catch((err) => {
        notifyFail("Delete");
      });
  };

  useEffect(() => {
    getAllData();
  }, []);
  useEffect(() => {
    getTheaterByQuery(search, page + 1, limit);
  }, [page, search]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
        <FormCreateTheater
          setDataForm={setDataForm}
          dataForm={dataForm}
          handleClose={handleClose}
          title={title}
          setImagePreview={setImagePreview}
          imagePreview={imagePreview}
          setImage={setImage}
          add={add}
        />
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
              setIdUpdate={setIdUpdate}
              getDetail={getDetail}
              deleteTheater={deleteTheater}
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

const FormCreateTheater = ({
  title,
  handleClose,
  setDataForm,
  dataForm,
  setImagePreview,
  imagePreview,
  setImage,
  add,
}) => {
  return (
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
        <TextField
          label="Theater name"
          type="text"
          value={dataForm?.name}
          onChange={(e) => setDataForm({ ...dataForm, name: e.target.value })}
        />
        <TextField
          label="Address"
          type="text"
          value={dataForm?.address}
          onChange={(e) => setDataForm({ ...dataForm, address: e.target.value })}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Manager</InputLabel>
          <Select
            labelId="demo-select-small"
            label="Manager"
            value={dataForm?.manager_name?.name}
            onChange={(e) =>
              setDataForm({
                ...dataForm,
                manager_name: {
                  id: 13,
                  name: e.target.value,
                },
              })
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"son"}>Son</MenuItem>
            <MenuItem value={"duc"}>Duc</MenuItem>
            <MenuItem value={"hai"}>Hai</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Hotline"
          type="text"
          value={dataForm.hostline}
          onChange={(e) => setDataForm({ ...dataForm, hostline: e.target.value })}
        />
        <Box sx={{ width: 700 }}>
          <Typography>Description:</Typography>
          <textarea
            onChange={(e) => setDataForm({ ...dataForm, description: e.target.value })}
            title="Description"
            value={dataForm.description}
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
                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                  setImage(e.target.files[0]);
                }}
              />
            </Button>
          </Box>
          {imagePreview && <img width={300} src={imagePreview} alt={"preview"} />}
        </Box>
        {title !== "Create" && (
          <Box>
            <Typography variant="h5">Room</Typography>
            <Box>
              <FormCreateRoom />
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
        )}
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 2 }}>
        <Button onClick={() => handleClose()} variant="contained" color="error">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={
            !(
              dataForm?.name &&
              dataForm?.description &&
              dataForm?.manager_name?.name &&
              dataForm?.address &&
              dataForm?.hostline
            )
          }
          onClick={() => {
            if (title === "Create") {
              add();
            } else {
              return;
            }
          }}
        >
          {title}
        </Button>
      </Box>
    </Box>
  );
};

const FormCreateRoom = () => {
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
