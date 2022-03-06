import background from './images/background.jpeg'
import logo from './images/logo.png'
import '../styles/Header.css'
import Button from '@mui/material/Button';
import UploadFileButton from "./UploadFileButton";


const Header = () => {
    return (
        <div className="head">
            <div className="rectangle" />
            <div className="home" role="button">home</div>
            <div className="support">support</div>
            <div className="products">products</div>
            <img className="logo" src={logo} width="25%" height="8%"/>
            <div className="text">
                <img src={background}  width="100%" height="100%"/>
                <h1 className="text-on-image">
                    LET YOUR SUCCESS <br/>
                    RIDE WITH US.<br/>
                    <UploadFileButton/>
                </h1>
            </div>
        </div>
    )


};

export default Header;