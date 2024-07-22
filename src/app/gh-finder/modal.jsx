import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
};
//   {
//     id: 1,
//     name: "john",
//     gender: "m",
//   },
//   {
//     id: 2,
//     name: "mary",
//     gender: "f",
//   },
// ]);

// const updateFieldChanged = (index) => (e) => {
//   console.log("index: " + index);

//   console.log("property name: " + e.target.name);
//   let newArr = [...data];
//   newArr[index] = e.target.value;

//   setData(newArr);
// };

// return data.map((datum, index) => {
//   <li key={datum.name}>
//     <input
//       type="text"
//       name="name"
//       value={datum.name}
//       onChange={updateFieldChanged(index)}
//     />
//   </li>;
// });

export default function BasicModal({ selectedLabels, setSelectedLabels }) {
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
      <Button onClick={handleOpen}>Filter</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="bg-gray-800">
          <FormGroup>
            {labelsList.map((label) => (
              <FormControlLabel
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
            className="w-[20px] p-0 m-0 absolute right-0 rounded-full"
          >
            <Delete />
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
