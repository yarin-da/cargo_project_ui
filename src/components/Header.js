import background from './images/background.jpeg'
import logo from './images/logo.png'
import '../styles/Header.css'
import UploadFileButton from "./UploadFileButton";
import ExampleInputFileButton from "./ExampleInputFileButton";


const Header = () => {
    return (
        <div className="head">
            <div className="rectangle" />
            <div className="home" role="button">home</div>
            <div className="support">support</div>
            <div className="products">products</div>
            <img className="logo" src={logo} width="25%" height="8%"/>
            <div className="text">
                <img src={background}  className="image" width="100%" height="auto"/>
                <h1 className="text-on-image">
                    LET YOUR SUCCESS <br/>
                    RIDE WITH US.<br/>
                    <UploadFileButton/>
                    <ExampleInputFileButton/>
                </h1>
            </div>
        </div>
    )


};

export default Header;