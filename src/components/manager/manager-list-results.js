import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const ManagerListResult = ({
  schedules,
  setOpen,
  setTitle,
  totalPage,
  setIdUpdate,
  getDetail,
  setPage,
  deleteSchedule,
  page,
  ...rest
}) => {
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
                <TableCell>Movie name</TableCell>
                <TableCell>Theater name</TableCell>
                <TableCell>Room</TableCell>
                <TableCell>Create date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.length > 0 ? (
                schedules.map((item) => (
                  <TableRow hover key={item?.id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {item?.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{item?.theaterName}</TableCell>
                    <TableCell>{item?.room}</TableCell>
                    <TableCell>{item?.createDate}</TableCell>
                    <TableCell>{item?.status}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          getDetail(item?.id);
                          setIdUpdate(item?.id);
                          setTitle("Update");
                          setOpen(true);
                        }}
                      >
                        <RemoveRedEyeIcon color="success" />
                      </Button>
                      <Button onClick={() => deleteSchedule(item?.id)}>
                        <DeleteForeverIcon color="error" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6" sx={{ textAlign: "center" }}>
                    Not have any data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {totalPage > 0 && (
        <TablePagination
          component="div"
          count={totalPage}
          onPageChange={handlePageChange}
          page={page}
          rowsPerPage={5}
          rowsPerPageOptions={[5, 10, 25]}
        />
      )}
    </Card>
  );
};
