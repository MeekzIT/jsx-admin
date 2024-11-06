import { useState } from "react";

const useFormWithDefaultKeys = () => {
  const [formData, setFormData] = useState();

  const copyData = (data) => {
    setFormData(data);
  };

  return {
    formData,
    copyData,
  };
};

export default useFormWithDefaultKeys;
