import React, { useState } from "react";
import { Box, Button, Card, TextField } from "@mui/material";
import DeleteModal from "../modals/DeleteModal";
import ImageModal from "../modals/ImageModal";

const ConstructorEditor = ({
  data,
  value,
  images,
  handleChange,
  handleTitleChange,
  handleDescriptionChange,
  handleImageChange,
  handleEdit,
  handleDelete,
}) => {
  const [openDel, setOpenDel] = useState(false);
  const [openImg, setOpenImg] = useState(false);

  return (
    <Card mb={2} sx={{ padding: "20px", minHeight: "300px" }}>
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
            </Box>
          )}
        </Box>
        <Box>
          <img src={data.image} alt="Preview" className="img_preview" />
          <Button variant="outlined" pt={2} onClick={() => setOpenImg(true)}>
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
      <ImageModal
        open={openImg}
        handleClose={() => setOpenImg(false)}
        handleImageChange={handleImageChange}
      />
    </Card>
  );
};

export default ConstructorEditor;
