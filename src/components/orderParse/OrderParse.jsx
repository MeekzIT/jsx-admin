import { Box, Typography } from "@mui/material";

const OrderParse = (data) => {
  const parsedData = data.data;
  return (
    <div>
      {parsedData ? (
        <Box>
          {parsedData.items?.map((i) => (
            <Box key={i.item?.id}>
              <Typography variant="h6" sx={{ color: "#00838D" }} gutterBottom>
                {i.item?.nameRu}
              </Typography>
              {Array.isArray(i.options)
                ? i.options.map((o) => (
                    <Typography key={o.id}>{o?.nameRu}</Typography>
                  ))
                : i.options?.nameRu}
            </Box>
          ))}
          {parsedData.services?.map((i) => (
            <Box key={i.service?.id}>
              <Typography variant="h6" sx={{ color: "#00838D" }} gutterBottom>
                {i.service?.nameRu}
              </Typography>
              {Array.isArray(i.options)
                ? i.options.map((o) => (
                    <Typography key={o.id}>{o?.nameRu}</Typography>
                  ))
                : i.options?.nameRu}
            </Box>
          ))}
          <hr />
          <Typography variant="h5" sx={{ color: "#00838D" }}>
            {parsedData.price} $
          </Typography>
        </Box>
      ) : null}
    </div>
  );
};

export default OrderParse;
