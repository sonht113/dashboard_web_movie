import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Modal,
  Typography,
  Stack,
  TextField,
  Button,
  Backdrop,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  duration,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ManagerListToolbar } from "../components/manager/manager-list-toolbar";
import { ManagerListResult } from "../components/manager/manager-list-results";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import movieApi from "../api/movieApi";
import theaterApi from "../api/theaterApi";
import roomApi from "../api/roomApi";
import scheduleApi from "../api/scheduleApi";
import { notifySuccess, notifyFail } from "../helpers/notifi";

const styleStack = {
  width: 500,
  margin: "0 auto",
};

const currentSchedule = {
  time: "",
  price: "50",
  duration: "",
  startTime: new Date(),
  description: "",
  date: "",
};

const Page = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Create");
  const [schedule, setSchedule] = useState({ ...currentSchedule });
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [page, setPage] = useState(0);
  const [idApi, setIdApi] = useState({
    movie: "",
    theater: "",
    room: "",
  });
  const [rooms, setRooms] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [schedules, setSchedules] = useState([]);
  const [idUpdate, setIdUpdate] = useState("");
  const limit = 5;

  const handleClose = () => {
    setSchedule({ ...currentSchedule });
    setOpen(false);
  };

  const createSchedule = async () => {
    try {
      const res = await scheduleApi.add(idApi.theater, idApi.room, idApi.movie, schedule);
      console.log("aaa", res);
      if (!res) return;
      handleClose();
      getQuery(page, limit);
      notifySuccess("Create");
    } catch (err) {
      console.log(err);
      notifyFail("Create");
    }
  };

  const getAllMoive = async () => {
    try {
      const res = await movieApi.getAll();
      if (!res) return;
      setMovies([...res]);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllTheater = async () => {
    try {
      const res = await theaterApi.getAll();
      if (!res) return;
      setTheaters([...res]);
    } catch (err) {
      console.log(err);
    }
  };

  const getRoomByTheater = async (id) => {
    try {
      const res = await roomApi.getByTheater(id);
      if (!res) return;
      setRooms([...res]);
    } catch (err) {
      console.log(err);
    }
  };

  const getQuery = async () => {
    try {
      const res = await scheduleApi.getQuery(page + 1, limit);
      if (!res) return;
      console.log(res);
      setTotalPage(res.totalPage);
      setSchedules(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getDetail = async (id) => {
    try {
      const res = await scheduleApi.getDetail(id);
      if (!res) return;
      console.log(res);
      setSchedule({
        time: res.time,
        price: res.price,
        duration: res.duration,
        startTime: res.startTime,
        description: res.description,
        endTime: res.endTime,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const update = async () => {
    try {
      const data = {
        time: schedule.time,
        startTime: schedule.startTime,
        duration: schedule.duration,
        price: schedule.price,
        status: "IS_ACTIVE",
        description: schedule.description,
      };
      const res = await scheduleApi.update(idUpdate, { ...data });
      if (!res) return;
      console.log(res);
      handleClose();
      getQuery(page, limit);
      notifySuccess("Update");
    } catch (err) {
      console.log(err);
      notifyFail("Update");
    }
  };

  const deleteSchedule = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/room/delete/${id}`, {
      method: "DELETE",
    });
    if (res.status == 200) {
      console.log(res);
      getQuery(page, limit);
      notifySuccess("Delete");
    } else {
      console.log(res);
      notifyFail("Delete");
    }
  };

  useEffect(() => {
    getQuery();
  }, [page]);

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
        <FormSchedule
          theaters={theaters}
          createSchedule={createSchedule}
          movies={movies}
          setSchedule={setSchedule}
          schedule={schedule}
          title={title}
          handleClose={handleClose}
          getRoomByTheater={getRoomByTheater}
          rooms={rooms}
          setIdApi={setIdApi}
          idApi={idApi}
          update={update}
        />
      </Modal>
      <Head>
        <title>Schedule</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ManagerListToolbar
            getAllTheater={getAllTheater}
            getAllMoive={getAllMoive}
            setOpen={setOpen}
            setTitle={setTitle}
          />
          <Box sx={{ mt: 3 }}>
            <ManagerListResult
              setIdUpdate={setIdUpdate}
              getDetail={getDetail}
              page={page}
              totalPage={totalPage}
              setPage={setPage}
              setOpen={setOpen}
              setTitle={setTitle}
              customers={customers}
              schedules={schedules}
              deleteSchedule={deleteSchedule}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

const FormSchedule = ({
  idApi,
  setIdApi,
  handleClose,
  theaters,
  title,
  movies,
  setSchedule,
  schedule,
  getRoomByTheater,
  update,
  rooms,
  createSchedule,
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
        width: 700,
        borderRadius: "10px",
        p: 4,
        overflowY: "scroll",
      }}
    >
      <Typography sx={{ marginBottom: 10 }} variant="h4" align="center">
        {title} Schedule
      </Typography>
      <Stack spacing={5} sx={styleStack}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Movie</InputLabel>
          <Select
            labelId="demo-select-small"
            label="Movie"
            onChange={(e) => setIdApi({ ...idApi, movie: e.target.value })}
          >
            {movies.map((movie, index) => (
              <MenuItem key={movie?.id} value={movie?.id}>
                {movie?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Theater</InputLabel>
          <Select
            labelId="demo-select-small"
            label="Theater"
            onChange={(e) => {
              setIdApi({ ...idApi, theater: e.target.value });
              getRoomByTheater(e.target.value);
            }}
          >
            {theaters.map((theater, index) => (
              <MenuItem key={theater?.id} value={theater?.id}>
                {theater?.theaterName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Room</InputLabel>
          <Select
            labelId="demo-select-small"
            label="Room"
            disabled={!idApi.theater}
            onChange={(e) => setIdApi({ ...idApi, room: e.target.value })}
          >
            {rooms.map((room, index) => (
              <MenuItem key={room?.id} value={room?.id}>
                {room?.roomName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            value={dayjs(schedule.startTime)}
            label="Start time"
            onChange={(newValue) => {
              setSchedule({
                ...schedule,
                time: `${newValue.$y}-${newValue.$M + 1}-${newValue.$D} ${newValue.$H}:${
                  newValue.$m
                }:${newValue.$s}`,
                startTime: `${newValue.$y}-${newValue.$M + 1}-${newValue.$D} ${newValue.$H}:${
                  newValue.$m
                }:${newValue.$s}`,
                date: `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`,
              });
            }}
          />
        </LocalizationProvider>
        {title !== "Create" && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="End time"
              value={schedule.endTime}
              disabled
            />
          </LocalizationProvider>
        )}
        <TextField
          label="Duration"
          type="text"
          onChange={(e) => setSchedule({ ...schedule, duration: e.target.value })}
        />
        <Box sx={{ width: 500 }}>
          <Typography>Description:</Typography>
          <textarea
            title="Description"
            rows={8}
            onChange={(e) => setSchedule({ ...schedule, description: e.target.value })}
            style={{ width: "100%", outline: "none", padding: "10px" }}
            placeholder="Description"
          />
        </Box>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 2 }}>
        <Button onClick={() => handleClose()} variant="contained" color="error">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            if (title === "Create") {
              createSchedule();
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
