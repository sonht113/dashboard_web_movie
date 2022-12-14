import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Modal,
  Fade,
  TextareaAutosize,
  Item,
  Typography,
  Backdrop,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { MovieListResults } from "../components/movie/movie-list-results";
import { MovieListToolbar } from "../components/movie/movie-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { Stack } from "@mui/system";
import { Error, Image } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import movieApi from "../api/movieApi";
import { notifySuccess, notifyFail } from "../helpers/notifi";
import "react-toastify/dist/ReactToastify.css";

const styleStack = {
  width: 500,
  margin: "0 auto",
};

const currentMovie = {
  name: "",
  description: "",
  realeaseDate: "2022-12-13",
  duration: 0,
  director: "",
  castDescription: "",
  genreName: "",
  language: "",
  status: "",
  createdBy: {
    id: 1,
    name: "sonhn",
  },
};

const Page = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Create");
  let [movies, setMovies] = useState([]);
  const [image, setImage] = useState(null);
  const [movie, setMovie] = useState({ ...currentMovie });
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [status, setStatus] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [idUpdate, setIdUpdate] = useState("");
  const pageSize = 5;
  const formData = new FormData();

  if (title === "Create") {
    if (image) {
      formData.append("image", image);
    }
    formData.append("movie", JSON.stringify(movie));
  } else {
    if (image) {
      formData.append("avatars", image);
    }
    formData.append("movieDto ", JSON.stringify(movie));
  }

  const handleOpenCreate = () => {
    setOpen(true);
    setTitle("Create");
    setMovie({ ...currentMovie });
    setImage(null);
    setImagePreview("");
  };

  const handleOpenUpdate = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setMovie({ ...currentMovie });
    setImage(null);
    setImagePreview("");
    setOpen(false);
  };

  const getAllMovieQuery = async (keyword, status, pageNumber, pageSize) => {
    try {
      const res = await movieApi.getAllQuery(keyword, status, pageNumber, pageSize);
      if (res) {
        setMovies([...res]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllData = async () => {
    try {
      const res = await movieApi.getAll();
      if (!res) return;
      setTotalPage([...res].length);
    } catch (err) {
      console.log(err);
    }
  };

  const getDetailMovie = async (id) => {
    try {
      const res = await movieApi.getDetail(id);
      if (!res) return;
      setMovie({
        name: res.name,
        castDescription: res.cast,
        director: res.director,
        description: res.description,
        duration: res.duration,
        genreName: res.genre,
        language: res.language,
        releaseDate: res.releaseDate,
        status: res.status,
        updatedBy: {
          id: 13,
        },
      });
      setIdUpdate(res.id);
      setTitle("Update");
      handleOpenUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  const add = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/movie/new`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.status == 200) {
          notifySuccess("Create");
          getAllMovieQuery(keyword, status, page + 1, pageSize);
          getAllData();
          setImage(null);
          setImagePreview("");
          setMovie({ ...currentMovie });
          handleClose();
        } else {
          notifyFail("Create");
          notifyFail("Create", "exist");
        }
      })
      .catch((err) => {
        console.log(err);
        notifyFail("Create", "exist");
      });
  };

  const update = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/movie/update/${idUpdate}`, {
      method: "PUT",
      body: formData,
    });
    if (res.status == 200) {
      notifySuccess("Update");
      getAllMovieQuery(keyword, status, page + 1, pageSize);
      getAllData();
      setImage(null);
      setImagePreview("");
      setMovie({ ...currentMovie });
      handleClose();
    } else {
      notifyFail("Update");
      notifyFail("Update", "exist");
    }
  };

  const deleteMovie = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/movie/delete/${id}`, {
      method: "DELETE",
    });
    if (res.status == 200) {
      notifySuccess("Delete");
      getAllMovieQuery(keyword, status, page + 1, pageSize);
      getAllData();
    } else {
      notifyFail("Delete");
      notifyFail("Delete", "exist");
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    getAllMovieQuery(keyword, status, page + 1, pageSize);
  }, [page, keyword, status]);

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
      {/* Same as */}
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
        <FormMovie
          title={title}
          movie={movie}
          setMovie={setMovie}
          handleClose={handleClose}
          add={add}
          setImage={setImage}
          update={update}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />
      </Modal>
      <Head>
        <title>Customers | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <MovieListToolbar
            currentMovie={currentMovie}
            setMovie={setMovie}
            setKeyword={setKeyword}
            keyword={keyword}
            setTitle={setTitle}
            handleOpen={handleOpenCreate}
          />
          <Box sx={{ mt: 3 }}>
            <MovieListResults
              setPage={setPage}
              page={page}
              setTitle={setTitle}
              handleOpen={handleOpenUpdate}
              movies={movies}
              setMovie={setMovie}
              totalPage={totalPage}
              getDetailMovie={getDetailMovie}
              deleteMovie={deleteMovie}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

function FormMovie({
  title,
  movie,
  setMovie,
  add,
  update,
  handleClose,
  imagePreview,
  setImagePreview,
  setImage,
}) {
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
        {title} Movie
      </Typography>
      <Stack spacing={5} sx={styleStack}>
        <TextField
          label="Movie name"
          type="text"
          value={movie.name}
          onChange={(e) => setMovie({ ...movie, name: e.target.value })}
        />
        <TextField
          label="Director"
          type="text"
          value={movie.director}
          onChange={(e) => setMovie({ ...movie, director: e.target.value })}
        />
        <TextField
          label="Duration"
          type="number"
          value={movie.duration}
          onChange={(e) => setMovie({ ...movie, duration: e.target.value })}
        />
        <TextField
          label="Cast"
          type="text"
          value={movie.castDescription}
          onChange={(e) => setMovie({ ...movie, castDescription: e.target.value })}
        />
        <TextField
          label="Language"
          type="text"
          value={movie.language}
          onChange={(e) => setMovie({ ...movie, language: e.target.value })}
        />
        <TextField
          label="Genre"
          type="text"
          value={movie.genreName}
          onChange={(e) => setMovie({ ...movie, genreName: e.target.value })}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="status"
            value={movie.status}
            onChange={(e) => setMovie({ ...movie, status: e.target.value })}
          >
            <MenuItem value={"NOW_SHOWING"}>NOW_SHOWING</MenuItem>
            <MenuItem value={"COMING_SOON"}>COMING_SOON</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ width: 500 }}>
          <Typography>Description:</Typography>
          <textarea
            value={movie.description}
            onChange={(e) => setMovie({ ...movie, description: e.target.value })}
            title="Description"
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
          {imagePreview && <img width={500} src={imagePreview} alt="iamge preview" />}
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
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
