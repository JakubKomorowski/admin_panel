import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { connect } from "react-redux";
import {
  deleteOrders,
  openModal,
  closeAddProductModal,
  selectOrder,
  calculatePayment,
} from "../actions";
import { AddCircleOutline, Visibility, Edit } from "@material-ui/icons";
import Modal from "./Modal";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { deleteOrderFromFirestore } from "../firebase/firestoreUtils";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Donut", 452, 25.0, 51, 4.9),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
//   createData("Honeycomb", 408, 3.2, 87, 6.5),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Jelly Bean", 375, 0.0, 94, 0.0),
//   createData("KitKat", 518, 26.0, 65, 7.0),
//   createData("Lollipop", 392, 0.2, 98, 0.0),
//   createData("Marshmallow", 318, 0, 81, 2.0),
//   createData("Nougat", 360, 19.0, 9, 37.0),
//   createData("Oreo", 437, 18.0, 63, 4.0),
// ];

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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "clientName",
    numeric: true,
    disablePadding: false,
    label: "Client Name",
  },
  { id: "payment", numeric: true, disablePadding: false, label: "Payment" },
  { id: "paid", numeric: true, disablePadding: false, label: "Paid" },
  { id: "currency", numeric: true, disablePadding: false, label: "Currency" },
  {
    id: "priority",
    numeric: true,
    disablePadding: false,
    label: "Priority",
  },
  {
    id: "paymentDate",
    numeric: true,
    disablePadding: false,
    label: "Payment Date",
  },
  {
    id: "deliveryDate",
    numeric: true,
    disablePadding: false,
    label: "Delivery Date",
  },
  {
    id: "addProduct",
    numeric: true,
    disablePadding: false,
    label: "Add Product",
  },
  {
    id: "showProducts",
    numeric: true,
    disablePadding: false,
    label: "Show Products",
  },
  {
    id: "editOrder",
    numeric: true,
    disablePadding: false,
    label: "Edit Order",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    deleteOrders,
    selectedOrders,
    clearSelectedOrders,
  } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon
              onClick={() => {
                deleteOrders(selectedOrders);
                deleteOrderFromFirestore(selectedOrders);

                clearSelectedOrders();
              }}
            />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    width: "95%",
    marginBottom: theme.spacing(2),
    borderRadius: "20px",

    boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.10)",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const OrdersTable = ({
  orders,
  deleteOrders,
  openModal,
  open,
  selectOrder,
  calculatePayment,
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("payment");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalType, setModalType] = useState("addProduct");

  const handleOpen = () => {
    openModal(true);
  };

  const handleClose = () => {
    openModal(false);
    calculatePayment();
  };

  const clearSelectedOrders = () => {
    setSelected([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orders.map((order) => order.orderId);
      setSelected(newSelecteds);
      console.log(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    console.log(selected);

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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selectedOrders={selected}
          deleteOrders={deleteOrders}
          clearSelectedOrders={clearSelectedOrders}
        />

        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={orders.length}
            />
            <TableBody>
              {stableSort(orders, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => {
                  const {
                    orderId,
                    payment,
                    clientName,
                    paymentDate,
                    deliveryDate,
                    currency,
                    priority,
                    paid,
                  } = order;
                  const isItemSelected = isSelected(orderId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  const pamentDateArray = paymentDate.split("/");
                  const paymentDateToDisplay = `${pamentDateArray[2]}/${pamentDateArray[1]}/${pamentDateArray[0]} `;
                  const deliveryDateArray = deliveryDate.split("/");
                  const deliveryDateToDisplay = `${deliveryDateArray[2]}/${deliveryDateArray[1]}/${deliveryDateArray[0]} `;
                  const priorityToDisplay =
                    priority === "a"
                      ? "low"
                      : priority === "b"
                      ? "mid"
                      : "high";

                  console.log(deliveryDateToDisplay);

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={orderId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, orderId)}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {orderId}
                      </TableCell>
                      <TableCell align="right">{clientName}</TableCell>
                      <TableCell align="right">{payment}</TableCell>
                      <TableCell align="right">
                        {paid === "true" ? <DoneIcon /> : <CloseIcon />}
                      </TableCell>
                      <TableCell align="right">{currency}</TableCell>
                      <TableCell align="right">{priorityToDisplay}</TableCell>
                      <TableCell align="right">
                        {paid === "true" ? paymentDateToDisplay : ""}
                      </TableCell>
                      <TableCell align="right">
                        {deliveryDateToDisplay}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Add Product">
                          <IconButton
                            aria-label="Add Product"
                            onClick={() => {
                              selectOrder(orderId);
                              setModalType("addProduct");
                              handleOpen();
                            }}
                          >
                            <AddCircleOutline />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Show Products">
                          <IconButton
                            aria-label="Show Products"
                            onClick={() => {
                              selectOrder(orderId);
                              setModalType("showProduct");
                              handleOpen();
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Show Products">
                          <IconButton
                            aria-label="Show Products"
                            onClick={() => {
                              selectOrder(orderId);
                              setModalType("editOrder");
                              handleOpen();
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <Modal open={open} handleClose={handleClose} modalType={modalType} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
  open: state.open,
});

const mapDispatchToProps = (dispatch) => ({
  deleteOrders: (selectedOrders) => dispatch(deleteOrders(selectedOrders)),
  openModal: (openState) => dispatch(openModal(openState)),
  selectOrder: (orderId) => dispatch(selectOrder(orderId)),
  calculatePayment: () => dispatch(calculatePayment()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable);
