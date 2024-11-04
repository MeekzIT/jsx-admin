import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { getData, editData } from "../../store/actions/about-action";
import AboutEditor from "../../components/editor/AboutEditor";
const AboutPage = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [updatedData, setUpdatedData] = useState([]);
  const data = useSelector((state) => state.about.data);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  console.log(data, "getData");

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
  };

  const handleEdit = (id) => {
    const itemToEdit = updatedData.find((item) => item.id === id);
    dispatch(editData(itemToEdit));
  };

  console.log(data, "data");

  return (
    <Box m={2}>
      <Box sx={{ display: "flex", gap: "20px", mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          ABOUT US
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {updatedData?.map((item) => (
          <AboutEditor
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
            handleEdit={() => handleEdit(item.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AboutPage;
