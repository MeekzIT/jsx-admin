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
  handleWidthChange,
  handleHeightChange,
}) => {
  const dispatch = useDispatch();
  const [openDel, setOpenDel] = useState(false);
  const [openDelImage, setOpenDelImage] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [items, setItems] = useState(data.ConstuctorItems);
  const [options, setOptions] = useState(data.ConstuctorItems || []);
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

  const onDragEnd = (result, parentIndex) => {
    if (!result.destination) return;

    const newOptions = [...options];
    const itemOptions = Array.from(
      newOptions[parentIndex].ConstuctorItemOptions
    );
    const [reorderedItem] = itemOptions.splice(result.source.index, 1);
    itemOptions.splice(result.destination.index, 0, reorderedItem);

    // Update the order of each option after reordering
    itemOptions.forEach((option, index) => {
      option.order = index + 1; // Assuming the order starts from 1
    });

    newOptions[parentIndex].ConstuctorItemOptions = itemOptions;
    setOptions(newOptions); // Update the local state
    dispatch(dndItems({ items: newOptions })); // Dispatch to update global state
  };

  console.log(items, "options");

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
          </Box>
        </Box>
        <Box>
          <img
            src={data.image}
            alt="Preview"
            width={data.width}
            height={data.height}
          />
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
      <Box sx={{ display: "flex" }}>
        <div>
          {" "}
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
            </Box>
          )}
        </div>
        <div>
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
                Собери сам Options
              </Typography>
              {options.map((item, parentIndex) => (
                <div
                  key={item.id}
                  style={{
                    userSelect: "none",
                    padding: "16px",
                    margin: "0 0 8px 0",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <h4>{item.nameRu}</h4>
                  <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, parentIndex)}
                  >
                    <Droppable droppableId={`droppable-${item.id}`}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          {item.ConstuctorItemOptions.sort(
                            (a, b) => a.order - b.order
                          ).map((option, index) => {
                            return (
                              <>
                                <Draggable
                                  key={option.id}
                                  draggableId={String(option.id)}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        backgroundColor: "#00838D",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        color: "white",
                                        fontWeight: "bolder",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {option.nameRu}
                                    </div>
                                  )}
                                </Draggable>
                                {option.ConstuctorOptionItems.length > 0 ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "10px",
                                    }}
                                  >
                                    {option.ConstuctorOptionItems.map((z) => {
                                      return (
                                        <div
                                          style={{
                                            width: "75%",
                                            backgroundColor: "lightgrey",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            fontWeight: "bolder",
                                          }}
                                        >
                                          {z.nam} asdasd
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : null}
                              </>
                            );
                          })}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              ))}
            </Box>
          )}
        </div>
      </Box>
      <Button
        variant="contained"
        sx={{ width: "30%" }}
        href={`/constructor/${data.id}`}
      >
        Edit Fields
      </Button>
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
