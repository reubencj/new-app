import Navbar from "../smallComponents/Navbar";
import ProfileForm from "../forms/ProfileForm";
const CONFIG = () => {
    {
        headers: {
            Authorization: sessionStorage.getItem("userToken")
        }
    }
}

const EditProfile = (props) => {

return (
    <div className="container">
        <Navbar userToken={CONFIG}/>
        <ProfileForm userToken={CONFIG}/>
    </div>
)
}

export default EditProfile;