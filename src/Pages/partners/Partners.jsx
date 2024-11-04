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
} from "../../store/actions/partners-action";
import DeleteModal from "../../components/modals/DeleteModal";
import ImageModal from "../../components/modals/ImageModal";
import AddModal from "../../components/modals/AddModal";
import CloudinaryUploadWidget from "../../components/cloudinaryUploadWidget/CloudinaryUploadWidget";

const Partners = () => {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [del, setDel] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [current, setCurrent] = useState(false);
  const [editValues, setEditValues] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [newItem, setNewItem] = useState({
    image: "",
  });
  const data = useSelector((state) => state.partners.data);
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
      acc[item.id] = { image: item.image };
      return acc;
    }, {});
    setEditValues(initialEditValues);
  }, [data]);
  const addNewImage = (src) => {
    return handleChange({
      target: {
        name: "image",
        value: src,
      },
    });
  };
  const handleChange = (e) => {
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
    setNewItem({ image: "" });
    setOpenImg(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteData({ id }));
  };

  // Handle Image Change
  const handleImageChange = (url) => {
    setEditValues((prev) => ({
      ...prev,
      [current]: { ...prev[current], image: url },
    }));
    dispatch(editData({ id: current, image: url }));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: "20px", mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Партнеры
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
              image={editValues[i.id]?.image || i.image}
              title={i.image}
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
        {newItem.image && <img src={newItem.image} alt="newIMage" />}
        <CloudinaryUploadWidget
          uwConfig={uwConfig}
          name={"url"}
          handleUpload={addNewImage}
        />
      </AddModal>
    </Box>
  );
};

export default Partners;
