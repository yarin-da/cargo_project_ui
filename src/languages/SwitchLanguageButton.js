import i18next from "i18next";

const SwitchLanguageButton = () => {
    return (
        <>
            <button onClick={()=> i18next.changeLanguage('en')}>English</button>
            <button onClick={()=> i18next.changeLanguage('he')}>עברית</button>
        </>

    )
};

export default SwitchLanguageButton;
