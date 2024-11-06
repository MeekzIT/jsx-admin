import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addData,
  deleteData,
  editData,
  getData,
} from "../../store/actions/constructor-action";
import { Box, Button, Typography } from "@mui/material";
import AddModal from "../../components/modals/AddModal";
import ConstructorEditor from "../../components/editor/ConstructorEditor";

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
const ConstructorPage = () => {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [value, setValue] = useState(0);
  const [updatedData, setUpdatedData] = useState([]);
  const [newService, setNewService] = useState(defaultKeys);
  const data = useSelector((state) => state.construct.data);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);


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

  const handleOptionWidthChange = (newValue, id) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, width: newValue } : item
      )
    );
  };

  const handleOptionHeightChange = (newValue, id) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, height: newValue } : item
      )
    );
  };

  // Handle image change for existing items
  const handleImageChange = (newValue, currentID) => {
    setUpdatedData((prevData) => {
      return prevData.map((item) => {
        if (item.id == currentID) {
          return { ...item, image: newValue };
        } else return item;
      });
    });
    // dispatch(getData());
  };

  const handleDeleteImage = (currentID) => {
    setUpdatedData((prevData) => {
      return prevData.map((item) => {
        if (item.id == currentID) {
          return { ...item, image: null };
        } else return item;
      });
    });
    // dispatch(getData());
  };

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
  const handleNewTitleChange = (event) => {
    handleNewServiceChange(event.target.name, event.target.value);
  };

  // Handle new service description change
  const handleNewDescriptionChange = (newValue, name) => {
    handleNewServiceChange(name, JSON.stringify(newValue));
  };

  const handleNewWidthChange = (event) => {
    handleNewServiceChange("width", event.target.value);
  };

  const handleNewHeightChange = (event) => {
    handleNewServiceChange("height", event.target.value);
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
          Cобери сам
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
        <ConstructorEditor
          data={newService}
          value={value}
          handleChange={handleTabChange}
          handleTitleChange={handleNewTitleChange}
          handleDescriptionChange={handleNewDescriptionChange}
          handleImageChange={handleNewImageChange}
          handleWidthChange={handleNewWidthChange}
          handleHeightChange={handleNewHeightChange}
        />
      </AddModal>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {updatedData?.map((item) => (
          <ConstructorEditor
            key={item.id}
            data={item}
            value={value}
            images="BoardImages"
            handleChange={handleTabChange}
            handleTitleChange={(event) =>
              handleTitleChange(event, item.id, true)
            }
            handleDescriptionChange={(newValue, name) =>
              handleDescriptionChange(newValue, item.id, name)
            }
            handleImageChange={(newValue) =>
              handleImageChange(newValue, Number(item.id))
            }
            handleWidthChange={(e) =>
              handleOptionWidthChange(e.target.value, item.id)
            }
            handleHeightChange={(e) =>
              handleOptionHeightChange(e.target.value, item.id)
            }
            handleDeleteImage={() => handleDeleteImage(Number(item.id))}
            handleEdit={() => handleEdit(item.id)}
            handleDelete={() => handleDelete(item.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ConstructorPage;
