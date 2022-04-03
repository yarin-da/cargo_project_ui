const View3D = () => {
    const style = {
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
    };
    const url = "./view_3d/index.html";
    return (
        <iframe style={style} src={url} sandbox="allow-scripts" />
    );
};

export default View3D;