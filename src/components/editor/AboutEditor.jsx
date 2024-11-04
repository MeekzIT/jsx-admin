import React, { useState } from "react";
import { Box, Button, Card, Tab, Tabs, TextField } from "@mui/material";
import ImageModal from "../modals/ImageModal";
import { useDispatch } from "react-redux";
import SlateEditor from "../SlateEditor/Editor";

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

const AboutEditor = ({
  data,
  value,
  handleTitleChange,
  handleImageChange,
  handleDeleteImage,
  handleEdit,
  handleDelete,
  handleWidthChange,
  handleHeightChange,
  handleChange,
  handleDescriptionChange,
}) => {
  const dispatch = useDispatch();
  const [openImg, setOpenImg] = useState(false);
  return (
    <Card mb={2} sx={{ padding: "20px", minHeight: "300px" }}>
      <Box sx={{ display: "flex", gap: "30px" }}>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <TextField
              label="Am"
              name="titleAm"
              variant="outlined"
              value={data.titleAm}
              onChange={handleTitleChange}
            />
            <TextField
              label="Ru"
              variant="outlined"
              name="titileRu"
              value={data.titileRu}
              onChange={handleTitleChange}
            />
            <TextField
              label="En"
              variant="outlined"
              name="titileEn"
              value={data.titileEn}
              onChange={handleTitleChange}
            />
            <TextField
              label="Ge"
              variant="outlined"
              name="titleGe"
              value={data.titleGe}
              onChange={handleTitleChange}
            />
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
                  initialValue={JSON.parse(data.textAm)}
                  name="textAm"
                  handleDescriptionChange={handleDescriptionChange}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <SlateEditor
                  initialValue={JSON.parse(data.textRu)}
                  name="textRu"
                  handleDescriptionChange={handleDescriptionChange}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <SlateEditor
                  initialValue={JSON.parse(data.textEn)}
                  name="textEn"
                  handleDescriptionChange={handleDescriptionChange}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <SlateEditor
                  initialValue={JSON.parse(data.textGe)}
                  name="textGe"
                  handleDescriptionChange={handleDescriptionChange}
                />
              </CustomTabPanel>
            </Box>
          </Box>
        </Box>
        <Box>
          <img src={data.image} alt="Preview" width={100} height={100} w />
          <Button variant="outlined" pt={2} onClick={() => setOpenImg(true)}>
            Edit Image
          </Button>
        </Box>
      </Box>
      <Box sx={{ padding: "20px", display: "flex", gap: "20px" }}>
        {handleEdit && (
          <Button variant="contained" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </Box>

      <ImageModal
        open={openImg}
        handleClose={() => setOpenImg(false)}
        handleImageChange={handleImageChange}
      />
    </Card>
  );
};

export default AboutEditor;
