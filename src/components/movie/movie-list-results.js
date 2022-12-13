import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";

import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const MovieListResults = ({
  movies,
  page,
  totalPage,
  setPage,
  handleOpen,
  setTitle,
  ...rest
}) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(5);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Create date</TableCell>
                <TableCell>Director</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.slice(0, limit).map((movie, index) => (
                <TableRow
                  hover
                  key={index}
                  selected={selectedCustomerIds.indexOf(movie?.id) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      {/* <Avatar src={customer.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(movie?.id)}
                      </Avatar> */}
                      <Typography color="textPrimary" variant="body1">
                        {movie?.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{movie?.create_date ? movie?.create_date : "2022-12-13"}</TableCell>
                  <TableCell>{movie?.director}</TableCell>
                  <TableCell>{movie?.genreName}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={movie?.status === "NOW_SHOWING" ? "success" : "error"}
                      size="small"
                    >
                      {movie?.status}
                    </Button>
                  </TableCell>
                  <TableCell align="center" padding="10px">
                    <Button
                      onClick={() => {
                        setTitle("Update");
                        handleOpen();
                      }}
                    >
                      <RemoveRedEyeIcon color="success" />
                    </Button>
                    <Button>
                      <DeleteForeverIcon color="error" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalPage}
        onPageChange={handlePageChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
