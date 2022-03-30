import Navbar from "../smallComponents/Navbar";
import ProfileForm from "../forms/ProfileForm";
const HEADER = () => {
    {
        headers: {
            Authorization: sessionStorage.getItem("user_token")
        }
    }
}

const EditProfile = (props) => {
const {userId} = props;

return (
    <div className="container">
        <Navbar userId={userId} />
        <ProfileForm userId={userId} />
    </div>
)
}

export default EditProfile;