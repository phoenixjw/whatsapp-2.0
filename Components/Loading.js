import { BarLoader } from "react-spinners";

function Loading() {
    return (
        <center style={{display: "grid", placeItems: "center", height: "100vh"}}>
            <div>
                <img 
                 src="/whatsapp-logo.png" 
                 alt=""
                 style={{ marginBottom: 10}}
                 height={200}
                />
             <BarLoader color="#25D366"/>
            </div>
        </center>
    )
}

export default Loading;