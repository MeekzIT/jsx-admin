import { Box, Button, Modal, Typography } from "@mui/material";

import { useIsMobile } from "../../hooks/useScreenType";
import { themePallete } from "../..";
import { useDispatch } from "react-redux";

const AddModal = ({ open, handleClose, handleAdd, children }) => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
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

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {children}
        <div>
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(handleAdd());
              handleClose();
            }}
          >
            Add
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddModal;
