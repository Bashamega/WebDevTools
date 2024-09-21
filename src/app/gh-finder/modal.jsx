import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Delete } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 300,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
};

export default function BasicModal({
  selectedLabels,
  setSelectedLabels,
  isDarkMode,
}) {
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [labelsList, setLabelsList] = React.useState([
    "bug",
    "documentation",
    "Eddiehub:good-first-issue",
    "enhancement",
    "Feature",
    "good first issue",
    "help wanted",
  ]);

  const handleChange = (label, event) => {
    const newSelectedLabels = [...selectedLabels];
    const index = newSelectedLabels.indexOf(label);
    if (index === -1) {
      newSelectedLabels.push(label);
    } else {
      newSelectedLabels.splice(index, 1);
    }
    setSelectedLabels(newSelectedLabels);
  };

  const handleClear = () => {
    setSelectedLabels([]);
    setOpen(false);
  };

  return (
    <div>
      <Button className="p-2rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="h-6 w-6 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 12.414V18a1 1 0 01-.553.894l-4 2A1 1 0 018 20v-7.586L3.293 6.707A1 1 0 013 6V4z"
          />
        </svg>
        <Button onClick={handleOpen}>Filter</Button>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className={`${
            isDarkMode ? "bg-slate-800 text-white" : "bg-slate-200 text-black"
          }`}
        >
          <FormGroup>
            {labelsList.map((label, idx) => (
              <FormControlLabel
                key={idx}
                control={
                  <Checkbox
                    name={label}
                    checked={selectedLabels.includes(label)}
                    onChange={() => handleChange(label)}
                  />
                }
                label={label}
              />
            ))}
          </FormGroup>
          <Button
            onClick={handleClear}
            sx={{
              position: "absolute",
              right: 0,
              padding: 0,
              margin: 0,
              width: "10px",
              borderRadius: "10000px",
            }}
          >
            <Delete />
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
