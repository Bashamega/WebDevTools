import { GrAdd } from "react-icons/gr";
import { MouseEventHandler } from "react";

interface AddFieldButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const AddFieldButton = ({ onClick }: AddFieldButtonProps) => (
  <button
    onClick={onClick}
    className="flex p-1 pl-3 pr-3 mt-2 text-zinc-300 bg-black border border-gray-700 rounded-md ml-7 w-fit hover:bg-gray-800"
  >
    <span className="pt-1 pr-2 text-zinc-300">
      <GrAdd />
    </span>{" "}
    ADD ANOTHER FIELD
  </button>
);
