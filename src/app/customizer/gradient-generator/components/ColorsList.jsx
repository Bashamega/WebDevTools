import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, color) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 15px 0 0`,
  background: color,
  position: "relative",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  display: "flex",
  padding: grid,
  paddingLeft: 10,
  paddingBottom: 45,
  overflow: "auto",
  overflowY: "hidden",
});

const ColorsList = ({ colorsList, setColorsList }) => {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const updatedItems = reorder(
      colorsList,
      result.source.index,
      result.destination.index,
    );
    setColorsList(updatedItems);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              <div className="rounded-lg border-[3px] border-gray-900 shadow-[0px_0px_1px_2px_#5B656F] hover:shadow-[0px_0px_1px_2px_#9CA8B4] flex justify-center items-center min-w-[84px] min-h-[84px] mr-[15px]">
                <button
                  className="outline-none text-white rounded-full justify-center items-center text-4xl font-thin h-full w-full active:scale-75 transition-all duration-300 ease-in-out "
                  onClick={() =>
                    setColorsList([
                      ...colorsList,
                      {
                        id: `item-${new Date().getTime().toString()}`,
                        color: "#3b82f6",
                        position: 50,
                      },
                    ])
                  }
                >
                  +
                </button>
              </div>

              {colorsList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        item.color,
                      )}
                      className="group rounded-lg border-[3px] border-gray-900 shadow-[0px_0px_1px_2px_#5B656F] hover:shadow-[0px_0px_1px_2px_#9CA8B4]"
                    >
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-transparent outline-none text-[#ffffff] px-2 py-1 rounded-full w-10 h-10 justify-center items-center text-2xl font-normal flex opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out cursor-grab">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="9" r="1"></circle>
                          <circle cx="19" cy="9" r="1"></circle>
                          <circle cx="5" cy="9" r="1"></circle>
                          <circle cx="12" cy="15" r="1"></circle>
                          <circle cx="19" cy="15" r="1"></circle>
                          <circle cx="5" cy="15" r="1"></circle>
                        </svg>
                      </div>
                      <input
                        type="color"
                        className={`cursor-pointer bg-[${item.color}]`}
                        value={item.color}
                        onChange={(e) => {
                          const newItems = [...colorsList];
                          newItems[index].color = e.target.value;
                          setColorsList(newItems);
                        }}
                      />

                      <div className="absolute -bottom-13 left-1/2 transform -translate-x-1/2 flex justify-center items-center flex-col w-full">
                        <div className="w-full max-w-xs mx-auto">
                          <div className="text-center text-xs">
                            {item.position}
                          </div>
                          <input
                            type="range"
                            min="0"
                            // max="100"
                            value={item.position}
                            onChange={(e) => {
                              const newItems = [...colorsList];
                              newItems[index].position = e.target.value;
                              setColorsList(newItems);
                            }}
                            className="w-full h-1 bg-gray-200 rounded-full appearance-none focus:outline-none"
                          />
                        </div>

                        <button
                          onClick={() => {
                            if (colorsList.length === 1) return;
                            const newItems = [...colorsList];
                            newItems.splice(index, 1);
                            setColorsList(newItems);
                          }}
                          className="bg-transparent mt-1 outline-none text-neutral-400 hover:text-white px-2 py-1 rounded-full w-5 h-5 justify-center items-center text-2xl font-normal flex opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ColorsList;
