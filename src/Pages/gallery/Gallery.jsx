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
} from "../../store/actions/gallery-action";
import DeleteModal from "../../components/modals/DeleteModal";
import ImageModal from "../../components/modals/ImageModal";
import AddModal from "../../components/modals/AddModal";
import CloudinaryUploadWidget from "../../components/cloudinaryUploadWidget/CloudinaryUploadWidget";

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
      acc[item.id] = { width: item.width, height: item.height, src: item.src };
      return acc;
    }, {});
    setEditValues(initialEditValues);
  }, [data]);
  const addNewImage = (src) => {
    return handleChange({
      target: {
        name: "src",
        value: src,
      },
    });
  };
  const handleChange = (e) => {
    console.log(e, "pppp");

    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = (id) => {
    setIsEditing((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = (id) => {
    dispatch(editData({ id, ...editValues[id] }));
    toggleEdit(id);
  };

  const handleAddService = () => {
    dispatch(addData(newItem));
    setNewItem({ width: "", height: "", src: "" });
    setOpenImg(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteData({ id }));
  };

  // Handle Image Change
  const handleImageChange = (url) => {
    setEditValues((prev) => ({
      ...prev,
      [current]: { ...prev[current], src: url },
    }));
    dispatch(editData({ id: current, src: url })); // Update the image in the Redux store
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: "20px", mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Печатные платы
        </Typography>
        <Button variant="contained" onClick={() => setAdd(true)}>
          Add
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {data?.map((i) => (
          <Card sx={{ maxWidth: 345 }} key={i.id}>
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
            </CardContent>
            <CardActions>
              {isEditing[i.id] ? (
                <Button size="small" onClick={() => handleSave(i.id)}>
                  Save
                </Button>
              ) : (
                <Button size="small" onClick={() => toggleEdit(i.id)}>
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
        ))}
      </Box>
      <DeleteModal
        open={del}
        handleClose={() => setDel(false)}
        handleDelete={() => handleDelete(current)}
      />
      <ImageModal
        open={openImg}
        handleClose={() => setOpenImg(false)}
        handleImageChange={handleImageChange}
      />
      <AddModal
        open={add}
        handleClose={() => setAdd(false)}
        handleAdd={handleAddService}
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
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Height"
          name="height"
          fullWidth
          variant="outlined"
          value={newItem.height}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        {newItem.src && <img src={newItem.src} alt="newIMage" />}
        <CloudinaryUploadWidget
          uwConfig={uwConfig}
          name={"url"}
          handleUpload={addNewImage}
        />
      </AddModal>
    </Box>
  );
};

export default Gallery;
