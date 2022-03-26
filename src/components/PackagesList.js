import AddPackage from "./AddPackage";
import Package from "./Package";

const PackagesList = ({ packages, setPackages }) => {
    const addPackage = () =>
        setPackages(prev => [...prev, new Package()]);

    const deletePackage = (id) => {
        const newPackages = packages.filter(p => p.id !== id);
        console.log('packages', packages);
        console.log('newPackages', newPackages)
        setPackages(newPackages);
    };

    const onChange = (values) => {
        const newPackages = packages.map(p => p.id === values.id ? values : p);
        setPackages(newPackages);
    };

    return (
        <div>
            {packages.map((values, index) =>
                <AddPackage
                    key={index}
                    values={values}
                    addButton={index === packages.length - 1}
                    onAdd={addPackage}
                    onDelete={deletePackage}
                    onChange={onChange}
                />
            )}
        </div>
    );
};

export default PackagesList;