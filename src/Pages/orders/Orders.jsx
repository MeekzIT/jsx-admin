import {
  Box,
  Button,
  Paper,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../../components/modals/DeleteModal";
import {
  getData,
  deleteData,
  editData,
} from "../../store/actions/orders-action";
import OrderParse from "../../components/orderParse/OrderParse";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Orders = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [open, setOpen] = useState(null);
  const oldOrders = useSelector((state) => state.orders.oldOrders);
  const newOrders = useSelector((state) => state.orders.newOrders);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelte = () => {
    dispatch(
      deleteData({
        id: currentId,
      })
    );
    setOpen(false);
    setCurrentId(null);
    dispatch(getData());
  };
  useEffect(() => {
    dispatch(getData());
  }, [dispatch, currentId]);
  return (
    <Box m={2}>
      <Box sx={{ display: "flex", gap: "20px", mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Связаться с нами
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="NEW" {...a11yProps(0)} />
            <Tab label="ARCHIVE" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0} p={2} mt={1}>
          <Typography variant="h4" mt={2} mb={2} sx={{ color: "#008491" }}>
            New Messages
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, border: 0 }} aria-label="simple table">
              <TableHead sx={{ borderBottom: "1px solid #008491" }}>
                <TableRow sx={{ "td,th": { border: 0 } }}>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="left">Last Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Order</TableCell>
                  <TableCell align="left">Archive</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newOrders?.map((row) => (
                  <TableRow key={row.id} sx={{ "td,th": { border: 0 } }}>
                    <TableCell component="th" scope="row" align="left">
                      {row.firstName}
                    </TableCell>
                    <TableCell align="left">{row.lastName}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">
                      <OrderParse data={JSON.parse(row.order)} />
                    </TableCell>
                    <TableCell align="left">
                      <Switch
                        defaultChecked={row.archive}
                        onChange={(e) => {
                          dispatch(
                            editData({
                              id: row.id,
                              archive: e.target.checked,
                            })
                          );
                          setCurrentId(null);
                          dispatch(getData());
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        onClick={() => {
                          setCurrentId(row.id);
                          setOpen(true);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Typography variant="h4" mt={2} mb={2} sx={{ color: "#008491" }}>
            Archived Messages
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, border: 0 }} aria-label="simple table">
              <TableHead sx={{ borderBottom: "1px solid #008491" }}>
                <TableRow sx={{ "td,th": { border: 0 } }}>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="left">Last Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Order</TableCell>
                  <TableCell align="left">Archive</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {oldOrders?.map((row) => (
                  <TableRow key={row.id} sx={{ "td,th": { border: 0 } }}>
                    <TableCell component="th" scope="row" align="left">
                      {row.firstName}
                    </TableCell>
                    <TableCell align="left">{row.lastName}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">
                      <OrderParse data={JSON.parse(row.order)} />
                    </TableCell>
                    <TableCell align="left">
                      <Switch
                        defaultChecked={row.archive}
                        onChange={(e) => {
                          dispatch(
                            editData({
                              id: row.id,
                              archive: e.target.checked,
                            })
                          );
                          setCurrentId(null);
                          dispatch(getData());
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        onClick={() => {
                          setCurrentId(row.id);
                          setOpen(true);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>
      </Box>
      <DeleteModal
        open={open}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelte}
      />
    </Box>
  );
};

export default Orders;
