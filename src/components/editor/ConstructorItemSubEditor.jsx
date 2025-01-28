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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DeleteModal from "../modals/DeleteModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addSubItemOption,
  destroySubItemOption,
  editSubItemOption,
  getSingleData,
  setCopy,
} from "../../store/actions/constructor-action";
import AddModal from "../modals/AddModal";
import OptionSubEdidor from "./OptionSubEdidor";
import { useParams } from "react-router-dom";
import { transformObject } from "../../hooks/helpers";

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
  handleWithValueChange,
  handleOrdeerChange,
  handleEdit,
  handleDelete,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [withValue, setWithaValue] = useState(data.withValue);
  const [checked, setChecked] = useState(data.require);
  const [updatedData, setUpdatedData] = useState([]);
  const [newService, setNewService] = useState(defaultKeys);
  const [option, setOption] = useState(0);
  const [serviceTab, setServiceTab] = useState(0);
  const service = useSelector((state) => state.construct.service);
  const copy = useSelector((state) => state.construct.copy);
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

  const handleNewWidthChange = (event) => {
    handleNewServiceChange("width", event.target.value);
  };

  const handleNewImageChange = (newValue) => {
    handleNewServiceChange("image", newValue);
  };

  const handleNewHeightChange = (event) => {
    handleNewServiceChange("height", event.target.value);
  };

  // Handle adding a new service
  const handleAddService = () => {
    dispatch(addSubItemOption({ ...newService, itemId: data.id })); // Dispatch add action
    setAdd(false); // Close the modal
    setNewService(defaultKeys); // Reset the form
  };

  const handleOptionOrdeerChange = (newValue, id) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, order: newValue } : item
      )
    );
  };

  const fieldsToTransform = {
    name: ["nameAm", "nameRu", "nameEn", "nameGe"],
    desc: ["descAm", "descRu", "descEn", "descGe"],
    showIn: ["showIn"],
    price: ["price"],
    image: ["image"],
    width: ["width"],
    height: ["height"],
  };
  console.log(copy, "111");

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
      <Box sx={{ display: "flex", gap: "30px" }}>
        {newItem && (
          <Box>
            <Button
              onClick={() => {
                console.log(fieldsToTransform, "actualData");
                const actualData = transformObject(copy, fieldsToTransform);

                if (actualData) {
                  actualData.name.map((i) => handleTitleChange(i));
                  actualData.desc.map((i) => handleDescriptionChange(i));
                  actualData.price.map((i) => handleNewPriceChange(i));
                }
              }}
            >
              <ContentPasteIcon />
              Paste
            </Button>
          </Box>
        )}
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
            <TextField
              label="order"
              variant="outlined"
              name="order"
              value={data.order}
              onChange={handleOrdeerChange}
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
                Собери сам SUB OPTIONS
              </Typography>
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
                  isNew={true}
                  handleChange={handleServiceTabChange}
                  handleNewPriceChange={handleNewPriceChange}
                  handleImageChange={handleNewImageChange}
                  handleImageInConstructor={handleNewConstructorImageChange}
                  handleTitleChange={handleNewTitleChange}
                  handleDescriptionChange={handleNewDescriptionChange}
                  handleWidthChange={handleNewWidthChange}
                  handleHeightChange={handleNewHeightChange}
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
                          <div key={idx}>
                            <CustomTabPanel value={option} index={idx}>
                              <Box p={1}>
                                <Button
                                  onClick={() => {
                                    dispatch(setCopy(i));
                                  }}
                                >
                                  <ContentCopyIcon /> Copy
                                </Button>
                              </Box>
                              <OptionSubEdidor
                                data={i}
                                isNew={false}
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
                                handleWidthChange={(e) =>
                                  handleOptionWidthChange(e.target.value, i.id)
                                }
                                handleOptionOrdeerChange={(e) =>
                                  handleOptionOrdeerChange(e.target.value, i.id)
                                }
                                handleHeightChange={(e) =>
                                  handleOptionHeightChange(e.target.value, i.id)
                                }
                                handleImageDelte={() => {
                                  handleImageDelte(i.id);
                                }}
                                handleEdit={() => handleEditOption(i.id)}
                                handleDelete={() => handleDeleteOption(i.id)}
                              />
                            </CustomTabPanel>
                          </div>
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
