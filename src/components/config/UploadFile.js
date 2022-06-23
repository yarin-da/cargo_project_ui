import Dropzone from "../util/Dropzone";
import ExampleInputFileButton from "../util/ExampleInputFileButton";
import CustomText from "../util/CustomText";
import '../../styles/Config.css';

const UploadFile = ({ setContainer, setPackages }) => {
    return (
        <div>
            <CustomText 
                style={{display: 'flex', justifyContent: 'center', marginBottom: 15}} 
                text="uploadFile" 
                variant="h4" 
            />
            <CustomText text="uploadFileExplanation1" />
            <CustomText text="uploadFileExplanation2" />
            <CustomText text="uploadFileExplanation3" />
            <div className="example-input-file">
                <ExampleInputFileButton/>
            </div>
            <Dropzone setContainer={setContainer} setPackages={setPackages} />
        </div>
    )
};

export default UploadFile;