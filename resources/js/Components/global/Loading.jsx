import { Oval } from "react-loader-spinner";

function Loader() {
    return (
        <Oval
            visible={true}
            height="40"
            width="40"
            color="#000"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
}
export default Loader;
