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

export const TheaterListResults = ({
  customers,
  setTitle,
  setOpen,
  totalPage,
  theaters,
  deleteTheater,
  getDetail,
  setIdUpdate,
  ...rest
}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table sx={{ overflowX: "scroll" }}>
            <TableHead>
              <TableRow>
                <TableCell>Theater Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Hotline</TableCell>
                <TableCell>Manager</TableCell>
                <TableCell>Create date</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {theaters && theaters.length !== 0 ? (
                theaters.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {/* <Avatar src={item.avatarUrl} sx={{ mr: 2 }}>
                          {getInitials(item.name)}
                        </Avatar> */}
                        <Typography color="textPrimary" variant="body1">
                          {item.theaterName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.hostline}</TableCell>
                    <TableCell>{item.manager ? item.manager : "-"}</TableCell>
                    <TableCell>{item.create}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          setTitle("Update");
                          setOpen(true);
                          getDetail(item.id);
                          setIdUpdate(item.id);
                        }}
                      >
                        <RemoveRedEyeIcon color="success" />
                      </Button>
                      <Button onClick={() => deleteTheater(item.id)}>
                        <DeleteForeverIcon color="error" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                    Not have any theater
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {totalPage !== 0 && (
        <TablePagination
          component="div"
          count={customers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      )}
    </Card>
  );
};
