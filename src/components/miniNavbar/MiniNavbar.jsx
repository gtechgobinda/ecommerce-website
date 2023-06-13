import "./MiniNavbar.scss";
const MiniNavbar = () => {
  return (
    <>
      <header className="mini-navbar">
        <div className="navbar-content">
          <ul className="left">
            <li>All</li>
            <li>Headphones</li>
            <li>Earbuds</li>
            <li>Speakers</li>
            <li>Watchs</li>
          </ul>
        </div>
      </header>
      <hr />
    </>
  );
};

export default MiniNavbar;
