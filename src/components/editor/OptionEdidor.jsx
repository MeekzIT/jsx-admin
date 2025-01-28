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
import ImageModal from "../modals/ImageModal";
import { useDispatch } from "react-redux";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import {
  addSubItem,
  destroySubItem,
  editSubItem,
  getSingleData,
  getSingleService,
  setCopy,
} from "../../store/actions/constructor-action";
import { useSelector } from "react-redux";
import ConstructorItemSubEditor from "./ConstructorItemSubEditor";
import AddModal from "../modals/AddModal";
import { useParams } from "react-router-dom";
import { transformObject } from "../../hooks/helpers";

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
  require: true,
  descAm: '[{"type":"paragraph","children":[{"text":""}]}]',
  descRu: '[{"type":"paragraph","children":[{"text":""}]}]',
  descEn: '[{"type":"paragraph","children":[{"text":""}]}]',
  descGe: '[{"type":"paragraph","children":[{"text":""}]}]',
};

const OptionEdidor = ({
  data,
  isNew,
  value,
  handleChange,
  handleTitleChange,
  handleDescriptionChange,
  handleImageInConstructor,
  handleImageChange,
  handleImageDelte,
  handleNewPriceChange,
  handleWidthChange,
  handleHeightChange,
  handleEdit,
  handleDelete,
  handleMobileImageChange,
  handleOptionMobileWidthChange,
  handleOptionMobileHeightChange,
  handleOptionOrdeerChange,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [valueSub, setSubValue] = useState(0);
  const [openDel, setOpenDel] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [delImage, setDelImage] = useState(false);
  const [checked, setChecked] = useState(data?.showIn);
  const [updatedData, setUpdatedData] = useState([]);
  const [newService, setNewService] = useState(defaultKeys);
  const [haveItems, setHeveItems] = useState(false);

  const service = useSelector((state) => state.construct.service);
  const copy = useSelector((state) => state.construct.copy);

  useEffect(() => {
    if (data?.ConstuctorOptionItems?.length) {
      dispatch(getSingleService(String(data.id)));
      setHeveItems(true);
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (service) {
      setUpdatedData(service?.ConstuctorOptionItems);
    }
  }, [service]);

  const handleTabChange = (event, newValue) => {
    setSubValue(newValue);
  };

  const handleInConstructorChange = (event) => {
    setChecked(event.target.checked);
    handleImageInConstructor(event);
  };

  const handleTitleSubChange = (event, id, name) => {
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

  // Handle description change for existing items
  const handleSubDescriptionChange = (newValue, id, name) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [name]: JSON.stringify(newValue) } : item
      )
    );
  };

  const handleRequireChange = (newValue, id) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, require: newValue } : item
      )
    );
  };

  const handleWithValueChange = (newValue, id) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, withValue: newValue } : item
      )
    );
  };

  const handleOrdeerChange = (newValue, id) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, order: newValue } : item
      )
    );
  };

  const handleSubEdit = (itemId) => {
    const itemToEdit = updatedData.find((item) => item.id === itemId);
    dispatch(editSubItem(itemToEdit));
  };

  // Handle delete
  const handleSubDelete = (itemId) => {
    dispatch(destroySubItem({ id: itemId }));
    dispatch(getSingleData(id));
  };

  // Handle form changes for adding a new service
  const handleNewServiceChange = (key, value) => {
    setNewService((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle new service title change
  const handleNewTitleChange = (event) => {
    handleNewServiceChange(event.target.name, event.target.value);
  };

  const handleNewRequreChange = (event) => {
    handleNewServiceChange(event.target.name, event.target.value);
  };
  // Handle new service description change
  const handleNewDescriptionChange = (newValue, name) => {
    handleNewServiceChange(name, JSON.stringify(newValue));
  };

  // Handle adding a new service
  const handleAddService = () => {
    dispatch(addSubItem({ ...newService, reletedId: data.id })); // Dispatch add action
    setAdd(false); // Close the modal
    setNewService(defaultKeys); // Reset the form
    dispatch(getSingleData(id));
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
  if (!data) return;

  return (
    <Card
      mb={2}
      sx={{
        padding: "20px",
        minHeight: "300px",
        width: "150vw",
      }}
    >
      <Box sx={{ display: "flex", gap: "30px" }}>
        {isNew && (
          <Box>
            <Button
              onClick={() => {
                console.log(fieldsToTransform, "actualData");
                const actualData = transformObject(copy, fieldsToTransform);

                if (actualData) {
                  actualData.name.map((i) => handleTitleChange(i));
                  actualData.desc.map((i) => handleDescriptionChange(i));
                  actualData.width.map((i) => handleWidthChange(i));
                  actualData.height.map((i) => handleHeightChange(i));
                  actualData.image.map((i) =>
                    handleImageChange(i.target.value)
                  );
                  actualData.price.map((i) => handleNewPriceChange(i));
                }
              }}
            >
              <ContentPasteIcon />
              Paste
            </Button>
          </Box>
        )}
        <Box>
          {Object.hasOwn(data, "title") ? (
            <TextField
              label="Title"
              variant="outlined"
              value={data.title}
              onChange={handleTitleChange}
            />
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
                label="Price"
                variant="outlined"
                name="price"
                value={data.price}
                onChange={handleNewPriceChange}
              />
              <TextField
                label="Width"
                variant="outlined"
                name="width"
                value={data.width}
                onChange={handleWidthChange}
              />
              <TextField
                label="Height"
                variant="outlined"
                name="height"
                value={data.height}
                onChange={handleHeightChange}
              />
              <TextField
                label="Mobile Width"
                variant="outlined"
                name="mobileWidth"
                value={data.mobileWidth}
                onChange={handleOptionMobileWidthChange}
              />
              <TextField
                label="Mobile Height"
                variant="outlined"
                name="mobileHeight"
                value={data.mobileHeight}
                onChange={handleOptionMobileHeightChange}
              />
              <TextField
                label="order"
                variant="outlined"
                name="order"
                value={data.order}
                onChange={handleOptionOrdeerChange}
              />
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Show Image In Constructor ?
                </Typography>
                <Switch
                  checked={checked}
                  name="showIn"
                  onChange={handleInConstructorChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Box>
            </Box>
          )}
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
        <Box>
          <img src={data.image} alt="Preview" className="img_preview" />
          <Button
            variant="outlined"
            pt={2}
            onClick={() => (data.image ? setDelImage(true) : setOpenImg(true))}
          >
            {data.image ? "Delete" : "Add"} Image
          </Button>
        </Box>
        {!isNew && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Собери сам SUB ITEMS
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setAdd(true);
              }}
            >
              ADD NEW
            </Button>
            <AddModal
              open={add}
              handleClose={() => setAdd(false)}
              handleAdd={handleAddService}
            >
              <ConstructorItemSubEditor
                data={newService}
                newItem={true}
                value={valueSub}
                handleChange={handleTabChange}
                handleTitleChange={handleNewTitleChange}
                handleRequireChange={handleNewRequreChange}
                handleDescriptionChange={handleNewDescriptionChange}
              />
            </AddModal>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {haveItems &&
                updatedData?.map((item) => {
                  return (
                    <>
                      <Box p={1}>
                        <Button
                          onClick={() => {
                            dispatch(setCopy(item));
                          }}
                        >
                          <ContentCopyIcon /> Copy
                        </Button>
                      </Box>
                      <ConstructorItemSubEditor
                        key={item.id}
                        data={item}
                        isNew={false}
                        value={valueSub}
                        images="BoardImages"
                        handleChange={handleTabChange}
                        handleTitleChange={(event) =>
                          handleTitleSubChange(event, item.id, true)
                        }
                        handleRequireChange={(event) =>
                          handleRequireChange(event.target.checked, item.id)
                        }
                        handleWithValueChange={(event) =>
                          handleWithValueChange(event.target.checked, item.id)
                        }
                        handleOrdeerChange={(e) =>
                          handleOrdeerChange(e.target.value, item.id)
                        }
                        handleDescriptionChange={(newValue, name) =>
                          handleSubDescriptionChange(newValue, item.id, name)
                        }
                        handleEdit={() => handleSubEdit(item.id)}
                        handleDelete={() => handleSubDelete(item.id)}
                      />
                    </>
                  );
                })}
            </Box>
          </Box>
        )}
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
      <DeleteModal
        open={delImage}
        handleClose={() => setDelImage(false)}
        handleDelete={handleImageDelte}
      />
      <ImageModal
        open={openImg}
        handleClose={() => setOpenImg(false)}
        handleImageChange={handleImageChange}
      />
    </Card>
  );
};

export default OptionEdidor;
