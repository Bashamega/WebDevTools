import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-full">
    <Box sx={{ display: "flex" }}>
      <CircularProgress disableShrink size={50} />
    </Box>
  </div>
);
