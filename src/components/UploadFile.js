import Dropzone from "./Dropzone";
import ExampleInputFileButton from "./ExampleInputFileButton";
import CustomText from "./CustomText";
import { useState } from "react";

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
            <div style={{ display: 'flex', justifyContent: 'center', margin: 15 }}>
                <ExampleInputFileButton/>
            </div>
            <Dropzone setContainer={setContainer} setPackages={setPackages} />
        </div>
    )
};

export default UploadFile;