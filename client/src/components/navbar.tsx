import { UserData } from '../interfaces/UserData';

import { Link } from 'react-router-dom';

type NavBarProps = {
     context: {
        loginToken: string | null,
        setLoginToken: (loginToken: string | null) => void,
        userData?: UserData | null,
        setUserData?: (userData: UserData) => void
     }
}

const NavBar = (props:NavBarProps) => {

    const { loginToken, setLoginToken } = props.context;

    return (
        <nav id="navBar" className="navBar">
            <h2 id="navTitle" className="navTitle">Shonen Showdown</h2>
            <ul id="navList" className="navList">
                <li id="navDash" className="navDash">
                    <Link to="/" aria-label="Go to Battle Dash">Battle Dash</Link></li>
                {loginToken && <li id="navTeams" className="navTeams">
                    <Link to="/teamsRoom" aria-label="Go to Locker Room">Locker Room</Link>
                </li>}
                {loginToken && <li id="navBattle" className="navBattle">
                    <Link to="/battleRoom" aria-label="Go to Battle Room">Battle Room</Link>
                </li>}
                {loginToken ? 
                (<li id="navLogOut" className="navLogOut">
                    <Link to="/login" aria-label="Go to Login Page" onClick={() => {
                        localStorage.removeItem('LOGIN_TOKEN');
                        setLoginToken(null);
                    }}>Log Out</Link>
                </li>) : null}
                {!loginToken && <li id="navLogin" className="navLogin">
                    <Link to="/login" aria-label="Go to Login Page">Login</Link>
                </li>}
                {!loginToken && <li id="navSignUp" className="navSignUp">
                    <Link to="/signUp" aria-label="Go to Sign Up Page">SignUp</Link>
                </li>}
            </ul>
        </nav>
    );
};

export default NavBar;