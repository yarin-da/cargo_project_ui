import background from "./images/background.jpeg";
import logo from "./images/logo.png";
import UploadFileButton from "./UploadFileButton";
import ExampleInputFileButton from "./ExampleInputFileButton";
import ShowInfo from "./ShowInfo";
import "../styles/Header.css";


const Header = ({ setContainer, setPackages }) => {
    return (
        <div className="head">
            <div className="header-nav">
                <img src={logo} />
                <div className="header-nav-links">
                    <div className="nav-link">Home</div>
                    <div className="nav-link">Support</div>
                    <div className="nav-link">Products</div>
                </div>
            </div>
            <div className="text">
                <img src={background} className="image" />
                <h1 className="header-title">
                    LET YOUR SUCCESS <br/>
                    RIDE WITH US.<br/>
                    <UploadFileButton setContainer={setContainer} setPackages={setPackages} />
                    <ExampleInputFileButton/>
                    <ShowInfo/>
                </h1>
            </div>
        </div>
    )


};

export default Header;