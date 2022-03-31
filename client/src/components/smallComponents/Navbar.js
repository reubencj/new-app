import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "@reach/router";


const Navbar = (props) => {
    const { userToken } = props; 
    const navigate = useNavigate();

  // conditional rendering of the navbar is dependent on whether a user is logged in.
  // This is done by checking to see if a userId has been passed down to this component.
    return (
    <div> {userToken?
        <nav className="navbar navbar-light" style={{backgroundColor: "#1E90FF"}}> 
            <div className="container-fluid">
                <a className="navbar-brand">News App</a>
                <Link className="nav-link active" aria-current="page" onClick={(e) => sessionStorage.removeItem("userToken")} to="/">Logout</Link>
            </div>
        </nav>
        :
        <nav className="navbar navbar-light" style={{backgroundColor: "#1E90FF"}}>
            <div className="container-fluid">
                <a className="navbar-brand">News App</a>
                <Link className="nav-link active" aria-current="page" to="/">Login</Link>
            </div>
        </nav>
        }
    </div>
    );
};

// const Navbar2 = (props) => {
//     const { page } = props; //Do we want to do something like this
  
//     // conditional rendering of the navbar is dependent on whether a user is logged in.
//     // This is done by checking to see if a userId has been passed down to this component.
//     return (
//       <div> {(() => {

//             if(page == "home"){

//                 return (
//                     <nav className="navbar navbar-light" style="background-color: #1E90FF;"> 
//                         <div className="container-fluid">
//                             <a className="navbar-brand">News App</a>
//                         </div>
//                     </nav>
//                 )
//             }
//             else if (page == "feed") {
//                 return(
//                     <nav className="navbar navbar-light" style="background-color: #1E90FF;">
//                     <div className="container-fluid">
//                         <a className="navbar-brand">News App</a>
//                         <ul className="nav justify-content-end">
//                             <li className="nav-item">
//                                 <a className="nav-link active" aria-current="page" href="/favorites">favorites</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link active" aria-current="page" href="/myprofile">edit profile</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link active" aria-current="page" href="/">logout</a>
//                             </li>
//                         </ul>
//                     </div>
//                 </nav>
//                 )}
//             else {
//                 return (
//                     <nav className="navbar navbar-light" style="background-color: #1E90FF;">
//                     <div className="container-fluid">
//                         <a className="navbar-brand">News App</a>
//                         <ul className="nav justify-content-end">
//                             <li className="nav-item">
//                                 <a className="nav-link active" aria-current="page" href="/">logout</a>
//                             </li>
//                         </ul>
//                     </div>
//                 </nav>
//                 )}
//       })}
//       </div>
//     );
//   };

export default Navbar;
