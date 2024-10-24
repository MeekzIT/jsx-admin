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
import {
  deleteData,
  editData,
  getData,
} from "../../store/actions/contacts-action";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../../components/modals/DeleteModal";
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
const Contacts = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [open, setOpen] = useState(null);
  const oldQuestions = useSelector((state) => state.contacts.oldQuestions);
  const newQuestions = useSelector((state) => state.contacts.newQuestions);

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
                  <TableCell align="left">Question</TableCell>
                  <TableCell align="left">Archive</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newQuestions.map((row) => (
                  <TableRow key={row.id} sx={{ "td,th": { border: 0 } }}>
                    <TableCell component="th" scope="row" align="left">
                      {row.firstName}
                    </TableCell>
                    <TableCell align="left">{row.lastName}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.question}</TableCell>
                    <TableCell align="left">
                      <Switch
                        defaultChecked={row.answer}
                        onChange={(e) => {
                          dispatch(
                            editData({
                              id: row.id,
                              answer: e.target.checked,
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
                  <TableCell align="left">Question</TableCell>
                  <TableCell align="left">Archive</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {oldQuestions.map((row) => (
                  <TableRow key={row.id} sx={{ "td,th": { border: 0 } }}>
                    <TableCell component="th" scope="row" align="left">
                      {row.firstName}
                    </TableCell>
                    <TableCell align="left">{row.lastName}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.question}</TableCell>
                    <TableCell align="left">
                      <Switch
                        defaultChecked={row.answer}
                        onChange={(e) => {
                          dispatch(
                            editData({
                              id: row.id,
                              answer: e.target.checked,
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

export default Contacts;
