import React, { useState } from "react";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DeleteModal from "../modals/DeleteModal";
import ImageModal from "../modals/ImageModal";
import { useDispatch } from "react-redux";
import { dndItems } from "../../store/actions/constructor-action";

const ConstructorEditor = ({
  data,
  handleTitleChange,
  handleImageChange,
  handleDeleteImage,
  handleEdit,
  handleDelete,
}) => {
  const dispatch = useDispatch();
  const [openDel, setOpenDel] = useState(false);
  const [openDelImage, setOpenDelImage] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [items, setItems] = useState(data.ConstuctorItems);
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = Array.from(items);
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);

    updatedItems.forEach((item, index) => {
      item.order = index + 1;
    });

    setItems(updatedItems);
    dispatch(dndItems({ items }));
  };
  return (
    <Card mb={2} sx={{ padding: "20px", minHeight: "300px" }}>
      <Box sx={{ display: "flex", gap: "30px" }}>
        <Box>
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
        </Box>
        <Box>
          <img src={data.image} alt="Preview" className="img_preview" />
          <Button variant="outlined" pt={2} onClick={() => setOpenImg(true)}>
            {data.image ? "Edit" : "Add"} Image
          </Button>
          {data.image && (
            <Button
              variant="outlined"
              pt={2}
              ml={2}
              onClick={() => setOpenDelImage(true)}
            >
              Delete Image
            </Button>
          )}
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
      {data.ConstuctorItems && (
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            gap: "20px",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Собери сам Items
          </Typography>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="items">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {items.map((i, index) => (
                    <Draggable
                      key={i.id}
                      draggableId={String(i.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: "none",
                            padding: "16px",
                            margin: "0 0 8px 0",
                            backgroundColor: "#f0f0f0",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {i.nameRu}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Button
            variant="contained"
            sx={{ width: "30%" }}
            href={`/constructor/${data.id}`}
          >
            Edit Fields
          </Button>
        </Box>
      )}
      <DeleteModal
        open={openDel}
        handleClose={() => setOpenDel(false)}
        handleDelete={handleDelete}
      />
      <DeleteModal
        open={openDelImage}
        handleClose={() => setOpenDelImage(false)}
        handleDelete={handleDeleteImage}
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
