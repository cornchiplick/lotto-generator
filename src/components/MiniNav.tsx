import {URL} from "@/constants/constants";
import {Link, useLocation} from "react-router-dom";

const MiniNav = () => {
  const {pathname} = useLocation();

  return (
    <div className="flex h-10 w-full flex-row items-center justify-end gap-4">
      <Link to="/" className={`${pathname === URL.HOME ? "nav-link-active" : "nav-link-inactive"}`}>
        Home
      </Link>
      <Link
        to="/record"
        className={`${pathname === URL.RECORD ? "nav-link-active" : "nav-link-inactive"}`}>
        Record
      </Link>
      <Link
        to="/stats"
        className={`${pathname === URL.STATS ? "nav-link-active" : "nav-link-inactive"}`}>
        Stats
      </Link>
    </div>
  );
};

export default MiniNav;
