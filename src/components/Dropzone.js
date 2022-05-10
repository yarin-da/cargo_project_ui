import {DropzoneArea} from "material-ui-dropzone";
import parseCSV from "./CSVParser";

const dropStyle = {
    width: "70%",
    marginLeft: "24%",
    marginRight: "3%"
}

const Dropzone = ({ setContainer, setPackages }) => {
    return (
        <div style={dropStyle}>
            <DropzoneArea
                showPreviews={true}
                acceptedFiles={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
                showPreviewsInDropzone={false}
                showFileNames={true}
                previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                previewText="Selected files"
                onDropRejected={() => alert('You can only upload csv files')}
                onDrop={(droppedFiles) => {
                    parseCSV(
                        droppedFiles[0], 
                        ({ container, packages }) => {
                            setContainer(container);
                            setPackages(packages);
                        }
                    );
                }}
            />
        </div>
    )
};

export default Dropzone;