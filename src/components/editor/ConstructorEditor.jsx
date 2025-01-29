import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DeleteModal from "../modals/DeleteModal";
import ImageModal from "../modals/ImageModal";
import { useDispatch } from "react-redux";
import {
  dndItems,
  getSingleData,
  getSingleService,
} from "../../store/actions/constructor-action";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { useSelector } from "react-redux";
import { useIsMobile } from "../../hooks/useScreenType";
import { themePallete } from "../..";
import DndModal from "./DndModal";
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
  const isMobile = useIsMobile();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 1000,
    height: "70vh",
    bgcolor: "background.paper",
    border: `3px solid ${themePallete}`,
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    minHeight: isMobile ? "100vh" : null,
    display: isMobile && "flex",
    justifyContent: isMobile && "center",
    alignItems: isMobile && "center",
    flexDirection: isMobile && "column",
    gap: isMobile && "20px",
    overflowY: "scroll",
  };
  const dispatch = useDispatch();
  const [openDel, setOpenDel] = useState(false);
  const [openDelImage, setOpenDelImage] = useState(false);
  const service = useSelector((state) => state.construct.service);

  const [openImg, setOpenImg] = useState(false);
  const [items, setItems] = useState(data.ConstuctorItems);
  const [tab, setTab] = useState(false);
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

  const handleTabOpen = (id) => {
    dispatch(getSingleService(id));
    setTab(true);
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

  console.log(service, "options");

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
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
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
                                        display: "flex",
                                        justifyContent: "space-between",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {option.nameRu}
                                      {option.ConstuctorOptionItems.length >
                                      0 ? (
                                        <Button
                                          sx={{
                                            background: "white",
                                          }}
                                        >
                                          <ViewModuleIcon
                                            color="white"
                                            onClick={() =>
                                              handleTabOpen(option.id)
                                            }
                                          />
                                        </Button>
                                      ) : undefined}
                                    </div>
                                  )}
                                </Draggable>
                              </div>
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
      <DndModal tab={tab} setTab={setTab} />
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
