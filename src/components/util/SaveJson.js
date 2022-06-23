import { saveAs } from "file-saver";

const jsonToBlob = (data) => {
    const str = JSON.stringify(data, null, 2);
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], { type: "application/json;charset=utf-8" });
    return blob;
};

function saveJson(filename, data){
    let blob = jsonToBlob(data);
    saveAs(blob, `${filename}.json`);
}

export default saveJson;