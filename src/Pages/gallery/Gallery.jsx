import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  editData,
  deleteData,
  addData,
  reorderData, // Add new action
} from "../../store/actions/gallery-action";
import DeleteModal from "../../components/modals/DeleteModal";
import ImageModal from "../../components/modals/ImageModal";
import AddModal from "../../components/modals/AddModal";
import CloudinaryUploadWidget from "../../components/cloudinaryUploadWidget/CloudinaryUploadWidget";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Gallery = () => {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [del, setDel] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [current, setCurrent] = useState(false);
  const [editValues, setEditValues] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [newItem, setNewItem] = useState({
    width: "",
    height: "",
    order: "",
    src: "",
  });
  const data = useSelector((state) => state.gallery.data);
  const [cloudName] = useState("b2g");
  const [uploadPreset] = useState("luyk0lcb");
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    cropping: false,
    multiple: false,
  });

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  // Update local editValues when data changes
  useEffect(() => {
    const initialEditValues = data.reduce((acc, item) => {
      acc[item.id] = {
        width: item.width,
        height: item.height,
        order: item.order,
        src: item.src,
      };
      return acc;
    }, {});
    setEditValues(initialEditValues);
  }, [data]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(data);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    // Update the order field
    const updatedOrder = reordered.map((item, index) => ({
      ...item,
      order: index,
    }));
    dispatch(reorderData({ items: updatedOrder }));
    dispatch(getData());
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: "20px", mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Галерея
        </Typography>
        <Button variant="contained" onClick={() => setAdd(true)}>
          Add
        </Button>
      </Box>

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="gallery">
          {(provided) => (
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data?.map((i, index) => (
                <Draggable key={i.id} draggableId={String(i.id)} index={index}>
                  {(provided) => (
                    <Card
                      sx={{ maxWidth: 345 }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <CardMedia
                        sx={{ height: 140 }}
                        image={editValues[i.id]?.src || i.src}
                        title={i.src}
                      />
                      <CardContent>
                        <Box>
                          <Button
                            variant="outlined"
                            pt={2}
                            onClick={() => {
                              setCurrent(i.id);
                              setOpenImg(true);
                            }}
                          >
                            Edit Image
                          </Button>
                        </Box>
                        <TextField
                          label="Width"
                          variant="outlined"
                          value={editValues[i.id]?.width || ""}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              [i.id]: { ...prev[i.id], width: e.target.value },
                            }))
                          }
                          sx={{ mt: 2 }}
                          disabled={!isEditing[i.id]}
                        />
                        <TextField
                          label="Height"
                          variant="outlined"
                          value={editValues[i.id]?.height || ""}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              [i.id]: { ...prev[i.id], height: e.target.value },
                            }))
                          }
                          disabled={!isEditing[i.id]}
                          sx={{ mt: 2 }}
                        />
                        <TextField
                          label="Order"
                          variant="outlined"
                          value={editValues[i.id]?.order || ""}
                          sx={{ mt: 2 }}
                          disabled
                        />
                      </CardContent>
                      <CardActions>
                        {isEditing[i.id] ? (
                          <Button
                            size="small"
                            onClick={() =>
                              dispatch(
                                editData({ id: i.id, ...editValues[i.id] })
                              )
                            }
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            onClick={() =>
                              setIsEditing((prev) => ({
                                ...prev,
                                [i.id]: !prev[i.id],
                              }))
                            }
                          >
                            Edit
                          </Button>
                        )}
                        <Button
                          size="small"
                          color="error"
                          onClick={() => {
                            setCurrent(i.id);
                            setDel(true);
                          }}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      <DeleteModal
        open={del}
        handleClose={() => setDel(false)}
        handleDelete={() => dispatch(deleteData({ id: current }))}
      />
      <ImageModal
        open={openImg}
        handleClose={() => setOpenImg(false)}
        handleImageChange={(url) =>
          dispatch(editData({ id: current, src: url }))
        }
      />
      <AddModal
        open={add}
        handleClose={() => setAdd(false)}
        handleAdd={() => dispatch(addData(newItem))}
      >
        <Typography variant="h6" gutterBottom>
          Add New Item
        </Typography>
        <TextField
          label="Width"
          name="width"
          fullWidth
          variant="outlined"
          value={newItem.width}
          onChange={(e) => setNewItem({ ...newItem, width: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Height"
          name="height"
          fullWidth
          variant="outlined"
          value={newItem.height}
          onChange={(e) => setNewItem({ ...newItem, height: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Order"
          name="order"
          fullWidth
          variant="outlined"
          value={newItem.order}
          onChange={(e) => setNewItem({ ...newItem, order: e.target.value })}
          sx={{ mb: 2 }}
        />
        {newItem.src && <img src={newItem.src} alt="newImage" />}
        <CloudinaryUploadWidget
          uwConfig={uwConfig}
          name={"url"}
          handleUpload={(src) => setNewItem({ ...newItem, src })}
        />
      </AddModal>
    </Box>
  );
};

export default Gallery;
