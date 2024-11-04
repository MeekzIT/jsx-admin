import React, { useState } from "react";
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

const OptionSubEdidor = ({
  data,
  value,
  handleChange,
  handleTitleChange,
  handleDescriptionChange,
  handleImageInConstructor,
  handleNewPriceChange,
  handleImageChange,
  handleImageDelte,
  handleEdit,
  handleDelete,
  handleWidthChange,
  handleHeightChange,
}) => {
  const [openDel, setOpenDel] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [delImage, setDelImage] = useState(false);
  const [checked, setChecked] = useState(data?.showIn);

  const handleInConstructorChange = (event) => {
    setChecked(event.target.checked);
    handleImageInConstructor(event);
  };

  console.log(data, "ooo");

  return (
    <Card
      mb={2}
      sx={{
        padding: "20px",
        minHeight: "300px",
        width: "50vw",
      }}
    >
      <Box sx={{ display: "flex", gap: "30px" }}>
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

export default OptionSubEdidor;
