const InputRange = ({ name, value, onChange }) => {
  return (
    <div>
      <h2 className=" text-white">
        {name}:{value}
      </h2>
      <input
        type="range"
        id="h-offset"
        name="h-offset"
        className="w-full "
        min="0"
        max="25"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputRange;
