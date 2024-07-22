import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// const [data, setData] = React.useState([
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

export default function BasicModal() {
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [checked, setChecked] = React.useState(false);
  const [labelsList, setLabelsList] = React.useState([
    {
      name: "bug",
      checked: false,
    },
    {
      name: "documentation",
      checked: false,
    },
    {
      name: "Eddiehub:good-first-issue",
      checked: false,
    },

    {
      name: "enhancement",
      checked: false,
    },
    {
      name: "Feature",
      checked: false,
    },
    {
      name: "good first issue",
      checked: false,
    },

    {
      name: "help wanted",
      checked: false,
    },
  ]);
  const [selectedLabels, setselectedLabels] = React.useState([]);
  const [filteredIssues, setFilteredIssues] = React.useState("");

  const dummyData = [
    "bug",
    ,
    "documentation",
    ,
    "Eddiehub:good-first-issue",
    ,
    "enhancement",
    ,
    "Feature",
    ,
    "good first issue",
    ,
    "help wanted",
    "Kamla",
    "vimla",
    "Nina",
    "Raniya",
  ];

  const handleChange = (label, event) => {
    // setLabelsList([label.checked === event.target.checked]);
    const newSelectedLabels = [...selectedLabels];
    const index = newSelectedLabels.indexOf(label);
    if (index === -1) {
      newSelectedLabels.push(label);
    } else {
      newSelectedLabels.splice(index, 1);
    }
    setselectedLabels(newSelectedLabels);
  };

  React.useEffect(() => {
    console.log(filteredIssues, selectedLabels);
  });

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
                    name={label.name}
                    checked={selectedLabels.includes(label.name)}
                    onChange={() => handleChange(label.name)}
                  />
                }
                label={label.name}
              />
            ))}
          </FormGroup>
        </Box>
      </Modal>
    </div>
  );
}
