import { Box, Modal, Typography } from "@mui/material";

import { useIsMobile } from "../../hooks/useScreenType";
import { themePallete } from "../..";
import { useState } from "react";
import CloudinaryUploadWidget from "../cloudinaryUploadWidget/CloudinaryUploadWidget";

const ImageModal = ({ open, handleClose, name, handleImageChange }) => {
  const isMobile = useIsMobile();

  const [cloudName] = useState("b2g");
  const [uploadPreset] = useState("luyk0lcb");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    cropping: false,
    multiple: false,
  });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 400,
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
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography>You can upload new image</Typography>
        <CloudinaryUploadWidget
          uwConfig={uwConfig}
          name={name}
          handleUpload={handleImageChange}
        />
      </Box>
    </Modal>
  );
};

export default ImageModal;
