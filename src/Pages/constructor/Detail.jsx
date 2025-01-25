import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addItem,
  destroyItem,
  editItem,
  getSingleData,
} from "../../store/actions/constructor-action";
import { Box, Button, Typography } from "@mui/material";
import AddModal from "../../components/modals/AddModal";
import ConstructorItemEditor from "../../components/editor/ConstructorItemEditor";

const defaultKeys = {
  nameAm: "",
  nameRu: "",
  nameEn: "",
  nameGe: "",
  require: true,
  descAm: '[{"type":"paragraph","children":[{"text":""}]}]',
  descRu: '[{"type":"paragraph","children":[{"text":""}]}]',
  descEn: '[{"type":"paragraph","children":[{"text":""}]}]',
  descGe: '[{"type":"paragraph","children":[{"text":""}]}]',
};

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [value, setValue] = useState(0);
  const [updatedData, setUpdatedData] = useState([]);
  const [newService, setNewService] = useState(defaultKeys);
  const data = useSelector((state) => state.construct.single);

  useEffect(() => {
    dispatch(getSingleData(id));
  }, []);

  useEffect(() => {
    if (data) {
      setUpdatedData(data.ConstuctorItems);
    }
  }, [data]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const handleRequireChange = (newValue, id) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, require: newValue } : item
      )
    );
  };

  const handleWithValueChange = (newValue, id) => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, withValue: newValue } : item
      )
    );
  };

  const handleEdit = (id) => {
    const itemToEdit = updatedData.find((item) => item.id === id);
    dispatch(editItem(itemToEdit));
  };

  // Handle delete
  const handleDelete = (id) => {
    dispatch(destroyItem({ id }));
    dispatch(getSingleData(id));
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

  const handleNewRequreChange = (event) => {
    handleNewServiceChange(event.target.name, event.target.value);
  };
  // Handle new service description change
  const handleNewDescriptionChange = (newValue, name) => {
    handleNewServiceChange(name, JSON.stringify(newValue));
  };

  // Handle adding a new service
  const handleAddService = () => {
    dispatch(addItem({ ...newService, reletedId: id })); // Dispatch add action
    setAdd(false); // Close the modal
    setNewService(defaultKeys); // Reset the form
  };

  return (
    <Box m={2}>
      <Box sx={{ display: "flex", gap: "20px", mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          {data?.nameRu}
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
        <ConstructorItemEditor
          data={newService}
          newItem={true}
          value={value}
          handleChange={handleTabChange}
          handleTitleChange={handleNewTitleChange}
          handleRequireChange={handleNewRequreChange}
          handleDescriptionChange={handleNewDescriptionChange}
        />
      </AddModal>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {updatedData?.map((item) => {
          return (
            <ConstructorItemEditor
              key={item.id}
              data={item}
              value={value}
              images="BoardImages"
              handleChange={handleTabChange}
              handleTitleChange={(event) =>
                handleTitleChange(event, item.id, true)
              }
              handleRequireChange={(event) =>
                handleRequireChange(event.target.checked, item.id)
              }
              handleWithValueChange={(event) =>
                handleWithValueChange(event.target.checked, item.id)
              }
              handleDescriptionChange={(newValue, name) =>
                handleDescriptionChange(newValue, item.id, name)
              }
              handleEdit={() => handleEdit(item.id)}
              handleDelete={() => handleDelete(item.id)}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Detail;
