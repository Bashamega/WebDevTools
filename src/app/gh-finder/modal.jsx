import React, { useState } from "react";
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
  width: "90%",
  maxWidth: 600,
  height: 400,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
};

export default function BasicModal({
  isDarkMode,
  selectedLabels,
  setSelectedLabels,
  handleParametersURL,
}) {
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = useState(false);
  const [labelsList, setLabelsList] = useState([
    "bug",
    "documentation",
    "Eddiehub:good-first-issue",
    "enhancement",
    "Feature",
    "good first issue",
    "help wanted",
  ]);
  const [filterInput, setFilterInput] = useState("");

  const handleChange = (inputLabel, event) => {
    if (!selectedLabels.includes(inputLabel)) {
      setSelectedLabels((prevSelectedLabels) => {
        const newSelectedLabels = [...prevSelectedLabels, inputLabel];
        handleParametersURL(newSelectedLabels, true);
        return newSelectedLabels;
      });
    } else {
      setSelectedLabels((prevSelectedLabels) => {
        const newSelectedLabels = prevSelectedLabels.filter(
          (label) => label !== inputLabel,
        );
        handleParametersURL(newSelectedLabels, false);
        return newSelectedLabels;
      });
    }
  };

  const handleClear = () => {
    setSelectedLabels([]);
    setOpen(false);
    handleParametersURL([], false);
  };

  const handleFilterInput = () => {
    if (filterInput.length <= 1 || labelsList.includes(filterInput)) {
      setFilterInput("");
    } else {
      const newLabelsList = [...labelsList, filterInput];
      setLabelsList(newLabelsList);

      setFilterInput("");
    }
  };

  return (
    <div>
      <Button className="p-2rounded-full space-x-1" onClick={handleOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="h-4 w-4 md:w-6 md:h-6 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 12.414V18a1 1 0 01-.553.894l-4 2A1 1 0 018 20v-7.586L3.293 6.707A1 1 0 013 6V4z"
          />
        </svg>
        <span className="sm:!text-sm !text-[12px]">Filter</span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className={`sm:!h-[300px] !overflow-y-auto ${
            isDarkMode ? "bg-slate-800 text-white" : "bg-slate-200 text-black"
          }`}
        >
          <FormGroup className="!grid sm:grid-cols-2">
            <input
              type="text"
              className={`
                w-full md:col-span-2
                p-1
                rounded-lg 
                border border-gray-300 
                focus:ring-2 focus:ring-blue-500 
                focus:outline-none 
                transition duration-200 ease-in-out 
                text-gray-700 
                placeholder-gray-400 
                shadow-sm 
                hover:shadow-md
                ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-400"
                    : "bg-gray-200 text-gray-500"
                } `}
              placeholder="Search issues"
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
            />
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
            <button
              className="inline-block px-2 py-2 h-10 w-32 text-l font-medium text-white bg-green-500 rounded-full
                         truncate hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "#164a6e" }}
              onClick={() => handleFilterInput()}
            >
              Submit
            </button>
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
