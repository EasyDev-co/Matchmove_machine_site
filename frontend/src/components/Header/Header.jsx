import { Link } from "react-router-dom";

const Header = () => {
    return (
      <header>
        <h1 className="h2-bold">My Application</h1>
        <Link to="/authorization">auth</Link>
      </header>
    );
  };
  
  export default Header;