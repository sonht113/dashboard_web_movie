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
import roomApi from "../api/roomApi";

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
  const [room, setRoom] = useState({
    roomName: "",
    screen: "",
    speaker: "",
  });
  const [rooms, setRooms] = useState([]);
  const limit = 5;
  const formData = new FormData();

  if (title == "Create") {
    if (image) {
      formData.append("image", image);
    }
    formData.append("theaterDto", JSON.stringify(formData));
  } else {
    if (image) {
      formData.append("avatars", image);
    }
    formData.append("theaterDto", JSON.stringify(formData));
    formData.forEach((i) => console.log(i));
  }

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

  const getDetail = async (idTheater) => {
    try {
      const res = await theaterApi.getDetail(idTheater);
      if (!res) return;
      setDataForm({
        theater_name: res.name,
        address: res.address,
        description: res.description,
        hostline: res.hostline,
        manager_name: { id: res?.manager?.id, name: res?.manager?.name },
      });
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

  const update = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/theater/update/${idUpdate}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => {
        if (res.status == 200) {
          notifySuccess("Update");
          handleClose();
          getAllData();
          getTheaterByQuery(search, page + 1, limit);
        } else {
          notifyFail("Update");
        }
      })
      .catch((err) => {
        notifyFail("Update", "exist");
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

  const getRoom = async (id) => {
    try {
      const res = await roomApi.getByTheater(id);
      if (!res) return;
      setRooms([...res]);
    } catch (err) {
      console.log(err);
    }
  };

  const createRoom = async (close) => {
    try {
      const res = await roomApi.add(idUpdate, room);
      if (!res) return;
      notifySuccess("Create");
      getRoom(idUpdate);
      close();
      console.log(res);
    } catch (err) {
      notifyFail("Create");
      console.log(err);
    }
  };

  const deleteRoom = async (id) => {
    try {
      await roomApi.delete(id);
      getRoom(idUpdate);
      notifySuccess("Delete");
    } catch (err) {
      notifyFail("Delete");
      console.log(err);
    }
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
          rooms={rooms}
          createRoom={createRoom}
          setDataForm={setDataForm}
          dataForm={dataForm}
          handleClose={handleClose}
          title={title}
          setImagePreview={setImagePreview}
          imagePreview={imagePreview}
          setRoom={setRoom}
          room={room}
          setImage={setImage}
          add={add}
          update={update}
          deleteRoom={deleteRoom}
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
              getRoom={getRoom}
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
  setRoom,
  room,
  dataForm,
  setImagePreview,
  imagePreview,
  createRoom,
  setImage,
  rooms,
  add,
  update,
  deleteRoom,
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
          value={dataForm.name ? dataForm.name : dataForm.theater_name}
          onChange={(e) => {
            if (title === "Create") {
              setDataForm({ ...dataForm, name: e.target.value });
            } else {
              setDataForm({ ...dataForm, theater_name: e.target.value });
            }
          }}
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
            <MenuItem value={"Son"}>Son</MenuItem>
            <MenuItem value={"Duc"}>Duc</MenuItem>
            <MenuItem value={"Hai"}>Hai</MenuItem>
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
            <Typography>Choose image:</Typography>
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
              <FormCreateRoom room={room} setRoom={setRoom} createRoom={createRoom} />
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
                  {rooms.length > 0 ? (
                    rooms.map((room, index) => (
                      <TableRow key={index}>
                        <TableCell>{room.roomName}</TableCell>
                        <TableCell>{room.screen}</TableCell>
                        <TableCell>{room.speaker}</TableCell>
                        <TableCell>
                          <Button onClick={() => deleteRoom(room.id)}>
                            <DeleteForeverIcon color="error" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                        Not have any room
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Box>
        )}
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 10 }}>
        <Button onClick={() => handleClose()} variant="contained" color="error">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={
            !(
              (dataForm?.name || dataForm?.theater_name) &&
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
              update();
            }
          }}
        >
          {title}
        </Button>
      </Box>
    </Box>
  );
};

const FormCreateRoom = ({ createRoom, room, setRoom }) => {
  const [openChildModal, setOpenChildModal] = useState(false);

  const handleClose = () => {
    setOpenChildModal(false);
  };
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
              <TextField
                label="Name Movie"
                type="text"
                onChange={(e) => setRoom({ ...room, roomName: e.target.value })}
              />
              <TextField
                label="Screen"
                type="text"
                onChange={(e) => setRoom({ ...room, screen: e.target.value })}
              />
              <TextField
                label="Speaker"
                type="text"
                onChange={(e) => setRoom({ ...room, speaker: e.target.value })}
              />
            </Stack>
          </Box>
          <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
            <Button variant="contained" color="error" onClick={() => setOpenChildModal(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="success" onClick={() => createRoom(handleClose)}>
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Page;
