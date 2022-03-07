import { useState } from "react";
import AddPackage from "./AddPackage";

const PackagesList = () => {
    const [itemID, setItemID] = useState(1);
    const [packages, setPackages] = useState([
        {
            id: 0
        },
    ]);

    function addPackage() {
        setPackages(prev => [...prev, { id: itemID }]);
        setItemID(prev => prev + 1);
    }

    function deletePackage(index) {
        console.log(index)
        setPackages(prev => prev.filter((x, i) => i !== index));
    }


    return (
        <div>
                {packages.map((menuItemData, i) =>
                    <div>
                        <AddPackage
                            addButton={i === packages.length - 1}
                            onAdd={addPackage}
                            onDelete={() => deletePackage(i)}
                        />
                    </div>

                )}
        </div>
    );
};

export default PackagesList;