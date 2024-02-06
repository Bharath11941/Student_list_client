import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import SchoolIcon from '@mui/icons-material/School'; 
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Button, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteStudent, getStudents } from "../../api/userApi";
import Loading from "../loading/Loading";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";
import EditUserModal from "../formComponents/EditUserModal";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "email",

    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "mobile",
    numeric: true,
    disablePadding: false,
    label: "Mobile",
  },
  {
    id: "gender",
    numeric: true,
    disablePadding: false,
    label: "Gender",
  },
  {
    id: "education",
    numeric: true,
    disablePadding: false,
    label: "Education",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar({ setSearch }) {
  let debounceTimer;

  const handleSearch = (e) => {
    const value = e.target.value;
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      setSearch(value);
    }, 1000); 
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Box  sx={{ flex: "1 1 100%" }}>
      <SchoolIcon sx={{ mr: 1 }} fontSize="large" color="primary" />
      <Typography variant="h4" component="div">
        Students
      </Typography>
    </Box>

      <div style={{ flexGrow: 1, marginRight: 16 }}>
        <div style={{ position: "relative" }}>
          <InputBase
            placeholder="Search…"
            sx={{ pr: 2 }}
            onChange={handleSearch}
            inputProps={{ "aria-label": "search" }}
          />
          <SearchIcon
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        </div>
      </div>

      <Button
        variant="contained"
        component={Link}
        to="/addStudent"
        sx={{ bgcolor: "#64dd17", color: "#000000" }}
      >
        Add Student
      </Button>
    </Toolbar>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [studId, setStudId] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState(null);

  const handleOpen = (data) => {
    setFormData(data)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setLoading(true);
    getStudents(search)
      .then((res) => {
        setLoading(false);
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, [search]);


  const handleOpenDeleteModal = (studentId) => {
    setStudId(studentId);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setStudId(null);
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true)
      const res = await deleteStudent(studId)
      if(res?.status === 200){

        setRows(res.data);
        toast.success(res?.data?.message);
      }
      handleCloseDeleteModal()
      setLoading(false)
      console.log(res,"data")
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);

  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    console.log(emptyRows,"empty")

    const visibleRows = React.useMemo(() => {
      if (rows && rows.length > 0) {
        return stableSort(rows, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        );
      } else {
        return [];
      }
    }, [order, orderBy, page, rowsPerPage, rows]);
    

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar setSearch={setSearch} />
          {loading ? (
            <div className="fixed inset-0 flex items-center justify-center">
            <div className="spinnerouter">
              <Loading />
            </div>
          </div>
          ) : (
            <TableContainer sx={{ p: 3 }}>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {visibleRows.length > 0 && visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row._id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.mobile}</TableCell>
                        <TableCell align="right">{row.gender}</TableCell>
                        <TableCell align="right">{row.education}</TableCell>
                        <TableCell align="right">{row.address}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => {
                            handleOpen(row)
                          }} aria-label="edit">
                            <EditIcon />
                          </IconButton>
                          <EditUserModal handleClose={handleClose} open={open} formData={formData} setRows={setRows}/>
                          <IconButton onClick={() => {
                            handleOpenDeleteModal(row._id)
                          }} aria-label="delete">
                            <DeleteIcon  />
                          </IconButton>
                          <DeleteModal handleConfirmDelete={handleConfirmDelete} handleCloseDeleteModal={handleCloseDeleteModal} deleteModalOpen={deleteModalOpen}/>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </Container>
  );
}
