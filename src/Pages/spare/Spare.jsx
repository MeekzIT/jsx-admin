import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  deleteData,
  editData,
  addData,
  addImage,
  deleteImage,
} from "../../store/actions/spare-action";
import { Box, Button, Typography } from "@mui/material";
import TextEditor from "../../components/editor/Editor";
import AddModal from "../../components/modals/AddModal";

const defaultKeys = {
  titleAm: "",
  titleRu: "",
  titleEn: "",
  titleGe: "",
  descAm: '[{"type":"paragraph","children":[{"text":""}]}]',
  descRu: '[{"type":"paragraph","children":[{"text":""}]}]',
  descEn: '[{"type":"paragraph","children":[{"text":""}]}]',
  descGe: '[{"type":"paragraph","children":[{"text":""}]}]',
  image: "",
};

const SparePage = () => {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [value, setValue] = useState(0);
  const [updatedData, setUpdatedData] = useState([]);
  const [newService, setNewService] = useState(defaultKeys); // State for new service

  const data = useSelector((state) => state.spare.data);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  // Sync updatedData with the fetched data
  useEffect(() => {
    if (data) {
      setUpdatedData(data);
    }
  }, [data]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle title change for existing items
  const handleTitleChange = (event, id, name) => {
    name
      ? setUpdatedData((prevData) =>
          prevData.map((item) =>
            item.id === id
              ? { ...item, [event.target.name]: event.target.value }
              : item
          )
        )
      : setUpdatedData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, title: event.target.value } : item
          )
        );
  };

  // Handle description change for existing items
  const handleDescriptionChange = (newValue, id, name) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [name]: JSON.stringify(newValue) } : item
      )
    );
  };

  // Handle image change for existing items
  const handleImageChange = (newValue, id) => {
    const newData = { image: newValue, reletedId: id };
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              SpareImages: [...(item.SpareImages || []), newData],
            }
          : item
      )
    );
    dispatch(addImage(newData));
    dispatch(getData());
  };

  const handleDeleteImage = (imageId, serviceId) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === serviceId
          ? {
              ...item,
              SpareImages: item.SpareImages.filter(
                (image) => image.id !== imageId
              ),
            }
          : item
      )
    );
    dispatch(deleteImage({ id: imageId }));
    dispatch(getData());
  };

  // Handle edit for existing items
  const handleEdit = (id) => {
    const itemToEdit = updatedData.find((item) => item.id === id);
    dispatch(editData(itemToEdit));
  };

  // Handle delete
  const handleDelete = (id) => {
    dispatch(deleteData({ id }));
  };

  // Handle form changes for adding a new service
  const handleNewServiceChange = (key, value) => {
    setNewService((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle new service title change
  const handleNewTitleChange = (event, name) => {
    console.log(name, event.target.value, "event.target.value");

    name
      ? handleNewServiceChange(event.target.name, event.target.value)
      : handleNewServiceChange("title", event.target.value);
  };

  // Handle new service description change
  const handleNewDescriptionChange = (newValue, name) => {
    handleNewServiceChange(name, JSON.stringify(newValue));
  };

  // Handle new service image change
  const handleNewImageChange = (newValue) => {
    handleNewServiceChange("image", newValue);
  };

  // Handle adding a new service
  const handleAddService = () => {
    dispatch(addData(newService)); // Dispatch add action
    setAdd(false); // Close the modal
    setNewService(defaultKeys); // Reset the form
  };

  return (
    <Box m={2}>
      <Box sx={{ display: "flex", gap: "20px", mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Запчасти
        </Typography>
        <Button variant="contained" onClick={() => setAdd(true)}>
          Add
        </Button>
      </Box>

      <AddModal
        open={add}
        handleClose={() => setAdd(false)}
        handleAdd={handleAddService}
      >
        <TextEditor
          data={newService}
          value={value}
          handleChange={handleTabChange}
          handleTitleChange={(e) => handleNewTitleChange(e, true)}
          handleDescriptionChange={handleNewDescriptionChange}
          handleImageChange={handleNewImageChange}
        />
      </AddModal>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {updatedData?.map((item) => (
          <TextEditor
            key={item.id}
            data={item}
            value={value}
            images="SpareImages"
            handleChange={handleTabChange}
            handleTitleChange={(event) =>
              handleTitleChange(event, item.id, true)
            }
            handleDescriptionChange={(newValue, name) =>
              handleDescriptionChange(newValue, item.id, name)
            }
            handleImageChange={(newValue) =>
              handleImageChange(newValue, item.id)
            }
            handleDeleteImage={(imageId) => handleDeleteImage(imageId, item.id)}
            handleEdit={() => handleEdit(item.id)}
            handleDelete={() => handleDelete(item.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SparePage;
