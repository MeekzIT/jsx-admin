import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Typography, Modal } from "@mui/material";
import { useIsMobile } from "../../hooks/useScreenType";
import { themePallete } from "../..";
import { dndOptions } from "../../store/actions/constructor-action";

const DndModal = ({ tab, setTab }) => {
  const dispatch = useDispatch();
  const service = useSelector((state) => state.construct.service);
  const [localService, setLocalService] = useState(service);

  // Обработчик для перемещения основных элементов (ITEMS)
  const onDragEndItems = (result) => {
    if (!result.destination) return;

    setLocalService((prevService) => {
      if (!prevService) return prevService;

      const newService = {
        ...prevService,
        ConstuctorOptionItems: [...prevService.ConstuctorOptionItems],
      };

      const items = [...newService.ConstuctorOptionItems];
      const [movedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, movedItem);

      // Update the order of items after the move
      const updatedItems = items.map((item, index) => ({
        ...item,
        order: index + 1, // or whatever logic you want to use to set the order
      }));

      newService.ConstuctorOptionItems = updatedItems;

      // Update the state and dispatch the new order
      dispatch(dndOptions({ items: updatedItems }));

      return newService;
    });
  };

  // Обработчик для перемещения опций внутри элементов (OPTIONS)
  const onDragEndOptions = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    setLocalService((prevService) => {
      if (!prevService) return prevService;

      const newService = {
        ...prevService,
        ConstuctorOptionItems: [...prevService.ConstuctorOptionItems],
      };

      // Найти родительский элемент
      const parentIndex = newService.ConstuctorOptionItems.findIndex(
        (item) => `droppable-${item.id}` === source.droppableId
      );

      if (parentIndex === -1) return prevService;

      const options = [
        ...newService.ConstuctorOptionItems[parentIndex]
          .ConstuctorItemOptionItemOptions,
      ];

      const [movedOption] = options.splice(source.index, 1);
      options.splice(destination.index, 0, movedOption);

      // Update the order of options after the move
      const updatedOptions = options.map((option, index) => ({
        ...option,
        order: index + 1, // or your preferred logic for the order
      }));

      newService.ConstuctorOptionItems[parentIndex] = {
        ...newService.ConstuctorOptionItems[parentIndex],
        ConstuctorItemOptionItemOptions: updatedOptions,
      };
      console.log(newService, "newService");
      dispatch(dndOptions({ items: newService.ConstuctorOptionItems }));

      return newService;
    });
  };

  const handleSave = () => {
    // dispatch(dndOptions(localService));
    setTab(false);
  };

  useEffect(() => {
    setLocalService(service);
  }, [service]);
  console.log(localService, "localService");

  return (
    <Modal open={tab} onClose={handleSave}>
      <Box
        // sx={style}
        sx={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          minWidth: "500px",

          minHeight: 700,
          overflowY: "scroll",
        }}
      >
        <Typography variant="h6">{service?.nameRu}</Typography>
        <div style={{ display: "flex", gap: "20px" }}>
          {/* DragDropContext для перемещения основных элементов */}
          <DragDropContext onDragEnd={onDragEndItems}>
            <Box display="flex" gap={2}>
              <Droppable droppableId="items" type="ITEMS">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      width: "200px",
                      backgroundColor: "#f0f0f0",
                      padding: "10px",
                    }}
                  >
                    {localService?.ConstuctorOptionItems?.sort(
                      (a, b) => a.order - b.order
                    ).map((i, index) => (
                      <Draggable
                        key={i.id}
                        draggableId={String(i.id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              padding: "16px",
                              backgroundColor: "#ddd",
                              borderRadius: "5px",
                              textAlign: "center",
                              ...provided.draggableProps.style,
                            }}
                          >
                            {i.nameRu}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Box>
          </DragDropContext>

          {/* DragDropContext для перемещения опций внутри элементов */}
          <DragDropContext onDragEnd={onDragEndOptions}>
            <Box>
              <Typography variant="h6">Собери сам SUB Options</Typography>
              {localService?.ConstuctorOptionItems?.sort(
                (a, b) => a.order - b.order
              ).map((item) => (
                <Droppable
                  key={item.id}
                  droppableId={`droppable-${item.id}`}
                  type="OPTIONS"
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        padding: "10px",
                        backgroundColor: "#eef",
                        marginBottom: "10px",
                      }}
                    >
                      <Typography variant="subtitle1">{item.nameRu}</Typography>
                      {item?.ConstuctorItemOptionItemOptions?.sort(
                        (a, b) => a.order - b.order
                      ).map((option, index) => (
                        <Draggable
                          key={option.id}
                          draggableId={String(option.id)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                backgroundColor: "#00838D",
                                padding: "10px",
                                borderRadius: "5px",
                                color: "white",
                                textAlign: "center",
                                ...provided.draggableProps.style,
                              }}
                            >
                              {option.nameRu}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </Box>
          </DragDropContext>
        </div>
      </Box>
    </Modal>
  );
};

export default DndModal;
