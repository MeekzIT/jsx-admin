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
import DeleteModal from "../modals/DeleteModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addSubItemOption,
  destroySubItemOption,
  editSubItemOption,
  getSingleData,
} from "../../store/actions/constructor-action";
import AddModal from "../modals/AddModal";
import OptionSubEdidor from "./OptionSubEdidor";
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

const ConstructorItemSubEditor = ({
  data,
  newItem,
  value,
  handleChange,
  handleTitleChange,
  handleDescriptionChange,
  handleRequireChange,
  handleEdit,
  handleDelete,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [checked, setChecked] = useState(data.require);
  const [updatedData, setUpdatedData] = useState([]);
  const [newService, setNewService] = useState(defaultKeys);
  // const [newServiceSubItem, setNewServiceSub] = useState(defaultKeysSub);
  const [option, setOption] = useState(data.id);
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
  // useEffect(() => {
  //   if (!service && single?.ConstuctorItems) {
  //     single.ConstuctorItems?.forEach((s) => {
  //       const itemWithOptions = s.ConstuctorItemOptions.find(
  //         (i) => i.ConstuctorOptionItems.length > 0
  //       );
  //       if (itemWithOptions) {
  //         dispatch(getSingleService(String(itemWithOptions.id)));
  //         setHaveServices(itemWithOptions);
  //       }
  //     });
  //   }
  // }, [dispatch, single, service]);
  useEffect(() => {
    if (data) {
      setUpdatedData(data?.ConstuctorItemOptionItemOptions);
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

  const handleOptionDescriptionChange = (newValue, id, name) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [name]: JSON.stringify(newValue) } : item
      )
    );
  };

  const handleOptionPriceChange = (newValue, id, name) => {
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
          return { ...item, image: newValue };
        } else return item;
      });
    });
    // dispatch(getData());
  };

  const handleImageDelte = (currentID) => {
    setUpdatedData((prevData) => {
      return prevData.map((item) => {
        if (item.id == currentID) {
          return { ...item, image: "" };
        } else return item;
      });
    });
  };

  const handleEditOption = (id) => {
    const itemToEdit = updatedData.find((item) => item.id === id);
    dispatch(editSubItemOption(itemToEdit));
  };

  // Handle delete
  const handleDeleteOption = (itemId) => {
    dispatch(destroySubItemOption({ id: itemId }));
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

  // Handle new service title change
  const handleNewTitleChange = (event) => {
    handleNewServiceChange(event.target.name, event.target.value);
  };

  // Handle new service description change
  const handleNewDescriptionChange = (newValue, name) => {
    handleNewServiceChange(name, JSON.stringify(newValue));
  };

  const handleNewPriceChange = (event) => {
    handleNewServiceChange(event.target.name, event.target.value);
  };

  // Handle adding a new service
  const handleAddService = () => {
    dispatch(addSubItemOption({ ...newService, itemId: data.id })); // Dispatch add action
    setAdd(false); // Close the modal
    setNewService(defaultKeys); // Reset the form
  };
  return (
    <Card
      mb={2}
      sx={{
        // width: "300%",
        padding: "20px",
        minHeight: "300px",
        overflowX: "scroll",
        width: "100vw",
      }}
    >
      <h1>{data.id}</h1>
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
                Собери сам SUB OPTIONS
              </Typography>
              <h1>{data.id}</h1>
              <Button variant="contained" onClick={() => setAdd(true)}>
                ADD NEW
              </Button>
              <AddModal
                open={add}
                handleClose={() => setAdd(false)}
                handleAdd={handleAddService}
              >
                <OptionSubEdidor
                  data={newService}
                  value={serviceTab}
                  handleChange={handleServiceTabChange}
                  handleNewPriceChange={handleNewPriceChange}
                  handleImageInConstructor={handleNewConstructorImageChange}
                  handleTitleChange={handleNewTitleChange}
                  handleDescriptionChange={handleNewDescriptionChange}
                />
              </AddModal>
              {data?.ConstuctorItemOptionItemOptions?.length ? (
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
                            <OptionSubEdidor
                              data={i}
                              value={serviceTab}
                              handleChange={handleServiceTabChange}
                              handleTitleChange={(event) =>
                                handleOptionTitleChange(event, i.id, true)
                              }
                              handleDescriptionChange={(newValue, name) =>
                                handleOptionDescriptionChange(
                                  newValue,
                                  i.id,
                                  name
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
                              handleNewPriceChange={(e) =>
                                handleOptionPriceChange(e.target.value, i.id)
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

export default ConstructorItemSubEditor;
