
export default function Search() {
    var searchval = ""
    return (
      <input 
      type="search"
      placeholder="Search .."
      className="grow mx-4"
      value={searchval}
      ></input>
      
    );
  }
  