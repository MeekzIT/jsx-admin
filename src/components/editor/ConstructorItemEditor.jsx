import React, { useEffect, useState } from "react";
import SlateEditor from "../SlateEditor/Editor";
import {
  Box,
  Button,
  Card,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import NumbersIcon from "@mui/icons-material/Numbers";
import DeleteModal from "../modals/DeleteModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  addOption,
  destroyOption,
  editOption,
  getData,
  getSingleData,
  setCopy,
} from "../../store/actions/constructor-action";
import OptionEdidor from "./OptionEdidor";
import AddModal from "../modals/AddModal";
import { useParams } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const defaultKeys = {
  nameAm: "",
  nameRu: "",
  nameEn: "",
  nameGe: "",
  price: "",
  showIn: false,
  descAm: '[{"type":"paragraph","children":[{"text":""}]}]',
  descRu: '[{"type":"paragraph","children":[{"text":""}]}]',
  descEn: '[{"type":"paragraph","children":[{"text":""}]}]',
  descGe: '[{"type":"paragraph","children":[{"text":""}]}]',
};

const ConstructorItemEditor = ({
  data,
  newItem,
  value,
  handleChange,
  handleTitleChange,
  handleDescriptionChange,
  handleRequireChange,
  handleWithValueChange,
  handleEdit,
  handleDelete,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [checked, setChecked] = useState(data.require);
  const [withValue, setWithaValue] = useState(data.withValue);
  const [updatedData, setUpdatedData] = useState([]);
  const [newService, setNewService] = useState(defaultKeys);
  const [option, setOption] = useState(0);
  const [serviceTab, setServiceTab] = useState(0);
  const service = useSelector((state) => state.construct.service);
  const handleTabChange = (event, newValue) => {
    setOption(newValue);
  };

  const handleServiceTabChange = (event, newValue) => {
    setServiceTab(newValue);
  };

  const handleRiqureChange = (event) => {
    setChecked(event.target.checked);
    handleRequireChange(event);
  };

  const handleLocalWithValueChange = (event) => {
    setWithaValue(event.target.checked);
    handleWithValueChange(event);
  };

  useEffect(() => {
    if (data) {
      setUpdatedData(data?.ConstuctorItemOptions);
    }
  }, [data, service]);

  const handleOptionTitleChange = (event, id, name) => {
    name
      ? setUpdatedData((prevData) =>
          prevData.map((item) =>
            item.id === id
              ? { ...item, [event.target.name]: event.target.value }
              : item
          )
        )
      : setUpdatedData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, title: event.target.value } : item
          )
        );
  };

  const handleOptionDescriptionChange = (newValue, id) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, title: newValue } : item
      )
    );
  };

  const handleOptionPriceChange = (newValue, id) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, price: newValue } : item
      )
    );
  };

  const handleImageChange = (newValue, currentID) => {
    setUpdatedData((prevData) => {
      return prevData.map((item) => {
        if (item.id == currentID) {
          return dispatch(editOption({ ...item, image: newValue }));
        } else return item;
      });
    });
    dispatch(getData());
    dispatch(getSingleData(id));
  };

  const handleMobileImageChange = (newValue, currentID) => {
    setUpdatedData((prevData) => {
      return prevData.map((item) => {
        if (item.id == currentID) {
          return dispatch(editOption({ ...item, mobileImage: newValue }));
        } else return item;
      });
    });
    dispatch(getData());
    dispatch(getSingleData(id));
  };

  const handleImageDelte = (currentID) => {
    setUpdatedData((prevData) => {
      return prevData.map((item) => {
        if (item.id == currentID) {
          return dispatch(editOption({ ...item, image: "" }));
        } else return item;
      });
    });
    dispatch(getData());
    dispatch(getSingleData(id));
  };

  const handleEditOption = (itemId) => {
    const itemToEdit = updatedData.find((item) => item.id === itemId);
    dispatch(editOption(itemToEdit));
    // dispatch(getSingleData(id));
  };

  // Handle delete
  const handleDeleteOption = (itemId) => {
    dispatch(destroyOption({ id: itemId }));
    dispatch(getSingleData(id));
  };
  // Handle form changes for adding a new service
  const handleNewServiceChange = (key, value) => {
    setNewService((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNewConstructorImageChange = (event) => {
    handleNewServiceChange(event.target.name, event.target.value);
  };

  const handleConstructorImageChange = (newValue, id) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, showIn: newValue } : item
      )
    );
  };

  const handleOptionWidthChange = (newValue, id) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, width: newValue } : item
      )
    );
  };

  const handleOptionHeightChange = (newValue, id) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, height: newValue } : item
      )
    );
  };

  const handleOptionMobileWidthChange = (newValue, id) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, mobileWidth: newValue } : item
      )
    );
  };

  const handleOptionMobileHeightChange = (newValue, id) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, mobileHeight: newValue } : item
      )
    );
  };

  const handleNewTitleChange = (event) => {
    handleNewServiceChange(event.target.name, event.target.value);
  };

  const handleNewPriceChange = (event) => {
    handleNewServiceChange(event.target.name, event.target.value);
  };

  const handleNewWidthChange = (event) => {
    handleNewServiceChange("width", event.target.value);
  };

  const handleNewHeightChange = (event) => {
    handleNewServiceChange("height", event.target.value);
  };

  const handleNewImageChange = (newValue) => {
    handleNewServiceChange("image", newValue);
  };

  const handleNewDescriptionChange = (newValue, name) => {
    handleNewServiceChange(name, JSON.stringify(newValue));
  };

  const handleAddService = () => {
    addOption({ ...newService, itemId: data.id });
    setAdd(false);
    setNewService(defaultKeys); // Reset the form
    dispatch(setCopy(null));
  };

  return (
    <Card
      mb={2}
      sx={{
        padding: "20px",
        minHeight: "300px",
        overflowX: "scroll",
        width: "200vw",
      }}
    >
      <Box sx={{ display: "flex", gap: "30px" }}>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <TextField
              label="Am"
              name="nameAm"
              variant="outlined"
              value={data.nameAm}
              onChange={handleTitleChange}
            />
            <TextField
              label="Ru"
              variant="outlined"
              name="nameRu"
              value={data.nameRu}
              onChange={handleTitleChange}
            />
            <TextField
              label="En"
              variant="outlined"
              name="nameEn"
              value={data.nameEn}
              onChange={handleTitleChange}
            />
            <TextField
              label="Ge"
              variant="outlined"
              name="nameGe"
              value={data.nameGe}
              onChange={handleTitleChange}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Require ?
            </Typography>
            <Switch
              checked={checked}
              name="require"
              onChange={handleRiqureChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              With Value ?
            </Typography>
            <Switch
              checked={withValue}
              name="require"
              onChange={handleLocalWithValueChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange} aria-label="tabs">
                <Tab label="AM" {...a11yProps(0)} />
                <Tab label="Ru" {...a11yProps(1)} />
                <Tab label="En" {...a11yProps(2)} />
                <Tab label="Ge" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <SlateEditor
                initialValue={JSON.parse(data.descAm)}
                name="descAm"
                handleDescriptionChange={handleDescriptionChange}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SlateEditor
                initialValue={JSON.parse(data.descRu)}
                name="descRu"
                handleDescriptionChange={handleDescriptionChange}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <SlateEditor
                initialValue={JSON.parse(data.descEn)}
                name="descEn"
                handleDescriptionChange={handleDescriptionChange}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <SlateEditor
                initialValue={JSON.parse(data.descGe)}
                name="descGe"
                handleDescriptionChange={handleDescriptionChange}
              />
            </CustomTabPanel>
          </Box>
        </Box>
        {!newItem ? (
          <>
            <Box
              sx={{
                width: "100%",
                borderLeft: "1px solid #008491",
                pl: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Собери сам OPTIONS
              </Typography>
              <Button variant="contained" onClick={() => setAdd(true)}>
                ADD NEW
              </Button>

              <AddModal
                open={add}
                handleClose={() => {
                  setAdd(false);
                  setNewService(defaultKeys); // Reset the form
                }}
                handleAdd={handleAddService}
              >
                <OptionEdidor
                  isNew={true}
                  data={newService}
                  value={serviceTab}
                  handleChange={handleServiceTabChange}
                  handleTitleChange={handleNewTitleChange}
                  handleNewPriceChange={handleNewPriceChange}
                  handleImageInConstructor={handleNewConstructorImageChange}
                  handleDescriptionChange={handleNewDescriptionChange}
                  handleImageChange={handleNewImageChange}
                  handleWidthChange={handleNewWidthChange}
                  handleHeightChange={handleNewHeightChange}
                />
              </AddModal>
              {data?.ConstuctorItemOptions?.length ? (
                <Box>
                  {updatedData.length && (
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs value={option} onChange={handleTabChange}>
                        {updatedData?.map((i, idx) => {
                          return (
                            <Tab
                              key={i?.id}
                              label={i?.nameRu?.slice(0, 10)}
                              {...a11yProps(idx)}
                            />
                          );
                        })}
                      </Tabs>
                      {updatedData?.map((i, idx) => {
                        return (
                          <CustomTabPanel value={option} index={idx}>
                            <Button
                              onClick={() => {
                                dispatch(setCopy(i));
                              }}
                            >
                              <ContentCopyIcon />
                              Copy
                            </Button>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <NumbersIcon /> <h3>{i.id}</h3>
                            </Box>
                            <OptionEdidor
                              data={i}
                              isNew={false}
                              value={serviceTab}
                              handleChange={handleServiceTabChange}
                              handleTitleChange={(event) =>
                                handleOptionTitleChange(event, i.id, true)
                              }
                              handleDescriptionChange={(newValue) =>
                                handleOptionDescriptionChange(newValue, i.id)
                              }
                              handleNewPriceChange={(e) =>
                                handleOptionPriceChange(e.target.value, i.id)
                              }
                              handleWidthChange={(e) =>
                                handleOptionWidthChange(e.target.value, i.id)
                              }
                              handleHeightChange={(e) =>
                                handleOptionHeightChange(e.target.value, i.id)
                              }
                              handleOptionMobileWidthChange={(e) =>
                                handleOptionMobileWidthChange(
                                  e.target.value,
                                  i.id
                                )
                              }
                              handleOptionMobileHeightChange={(e) =>
                                handleOptionMobileHeightChange(
                                  e.target.value,
                                  i.id
                                )
                              }
                              handleImageInConstructor={(event) =>
                                handleConstructorImageChange(
                                  event.target.checked,
                                  i.id
                                )
                              }
                              handleImageChange={(newValue) =>
                                handleImageChange(newValue, i.id)
                              }
                              handleMobileImageChange={(newValue) =>
                                handleMobileImageChange(newValue, i.id)
                              }
                              handleImageDelte={() => {
                                handleImageDelte(i.id);
                              }}
                              handleEdit={() => handleEditOption(i.id)}
                              handleDelete={() => handleDeleteOption(i.id)}
                            />
                          </CustomTabPanel>
                        );
                      })}
                    </Box>
                  )}
                </Box>
              ) : undefined}
            </Box>
          </>
        ) : undefined}
      </Box>
      <Box sx={{ padding: "20px", display: "flex", gap: "20px" }}>
        {handleEdit && (
          <Button variant="contained" onClick={handleEdit}>
            Edit
          </Button>
        )}
        {handleDelete && (
          <Button
            variant="contained"
            sx={{ background: "red" }}
            onClick={() => setOpenDel(true)}
          >
            Delete
          </Button>
        )}
      </Box>
      <DeleteModal
        open={openDel}
        handleClose={() => setOpenDel(false)}
        handleDelete={handleDelete}
      />
    </Card>
  );
};

export default ConstructorItemEditor;
