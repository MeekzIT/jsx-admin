import React, { useState } from "react";
import SlateEditor from "../SlateEditor/Editor";
import {
  Box,
  Button,
  Card,
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

const TextEditor = ({
  data,
  value,
  images,
  handleChange,
  handleTitleChange,
  handleDescriptionChange,
  handleIdChange,
  handleSingleImageChange,
  handleImageChange,
  handleDeleteImage,
  handleEdit,
  handleDelete,
}) => {
  const [openDel, setOpenDel] = useState(false);
  const [name, setName] = useState(false);
  const [openDelImage, setOpenDelImage] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [openSingleImg, setOpenSingleImg] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  return (
    <Card mb={2} sx={{ padding: "20px", minHeight: "300px" }}>
      {data ? (
        <>
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
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
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
                    name="titleRu"
                    value={data.titleRu}
                    onChange={handleTitleChange}
                  />
                  <TextField
                    label="En"
                    variant="outlined"
                    name="titleEn"
                    value={data.titleEn}
                    onChange={handleTitleChange}
                  />
                  <TextField
                    label="Ge"
                    variant="outlined"
                    name="titleGe"
                    value={data.titleGe}
                    onChange={handleTitleChange}
                  />

                  {handleIdChange ? (
                    <TextField
                      label="Id in COnstructor"
                      variant="outlined"
                      name="constId"
                      value={data.constId}
                      onChange={handleIdChange}
                    />
                  ) : undefined}
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
              {Object.hasOwn(data, "imageAm") && (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Typography variant="h6">Image AM</Typography>
                      <img
                        src={data.imageAm}
                        alt={data.imageAm}
                        width={150}
                        height={150}
                      />
                      <Button
                        variant="outlined"
                        pt={2}
                        onClick={() => {
                          setName("imageAm");
                          setOpenSingleImg(true);
                        }}
                      >
                        Edit Image
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Typography variant="h6">Image Ru</Typography>
                      <img
                        src={data.imageRu}
                        alt={data.imageRu}
                        width={150}
                        height={150}
                      />
                      <Button
                        variant="outlined"
                        pt={2}
                        onClick={() => {
                          setName("imageRu");
                          setOpenSingleImg(true);
                        }}
                      >
                        Edit Image
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Typography variant="h6">Image En</Typography>
                      <img
                        src={data.imageEn}
                        alt={data.imageEn}
                        width={150}
                        height={150}
                      />
                      <Button
                        variant="outlined"
                        pt={2}
                        onClick={() => {
                          setName("imageEn");
                          setOpenSingleImg(true);
                        }}
                      >
                        Edit Image
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Typography variant="h6">Image Ge</Typography>
                      <img
                        src={data.imageGe}
                        alt={data.imageGe}
                        width={150}
                        height={150}
                      />
                      <Button
                        variant="outlined"
                        pt={2}
                        onClick={() => {
                          setName("imageGe");
                          setOpenSingleImg(true);
                        }}
                      >
                        Edit Image
                      </Button>
                    </Box>
                  </Box>
                  <Typography variant="h5">Галерея</Typography>
                </Box>
              )}
              {images ? (
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: "10px", mb: 2 }}
                >
                  {data[images].map((i) => {
                    return (
                      <Box
                        key={i.image}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <img
                          src={i.image}
                          alt={i.image}
                          width={150}
                          height={150}
                        />
                        <Button
                          variant="outlined"
                          pt={2}
                          onClick={() => {
                            setOpenDelImage(true);
                            setImageToDelete(i.id);
                          }}
                        >
                          Delete Image
                        </Button>
                      </Box>
                    );
                  })}
                </Box>
              ) : (
                <img src={data.image} alt="Preview" className="img_preview" />
              )}
              <Button
                variant="outlined"
                pt={2}
                onClick={() => setOpenImg(true)}
              >
                {data.image ? "Edit" : "Add"} Image
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
            open={openDelImage}
            handleClose={() => setOpenDelImage(false)}
            handleDelete={() => handleDeleteImage(imageToDelete)}
          />
          <ImageModal
            open={openImg}
            handleClose={() => setOpenImg(false)}
            handleImageChange={handleImageChange}
          />
          <ImageModal
            open={openSingleImg}
            name={name}
            handleClose={() => setOpenSingleImg(false)}
            handleImageChange={handleSingleImageChange}
          />
        </>
      ) : undefined}
    </Card>
  );
};

export default TextEditor;
