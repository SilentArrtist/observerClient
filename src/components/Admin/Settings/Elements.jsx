import { reset } from "../../../http/fileAPI";
const Elements = () => {
    const resetSettings=async()=>{
        try {
            if(window.confirm("Are you sure? All settings will be reset, including images and elements")){
                const {data} = await reset();
                alert(data.message);
                window.location.reload();
            }
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }
    return (
        <>
         <div className="settingBlock">
            <span id="resetBtn" onClick={()=>resetSettings()}>RESET ALL SETTINGS</span>
        </div>
        </>
    );
};

export default Elements;