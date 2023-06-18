
export default function Search() {
    var searchval = ""
    return (
      <input 
      type="search"
      placeholder="Search .."
      className="ml-80"
      value={searchval}
      ></input>
      
    );
  }
  