import {Link} from "react-router-dom";

const MiniNav = () => {
  return (
    <div className="flex h-10 w-full flex-row items-center justify-end gap-2">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/record">Record</Link>
      </div>
      <div>
        <Link to="/stats">Stats</Link>
      </div>
    </div>
  );
};

export default MiniNav;
