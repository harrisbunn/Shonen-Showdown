import { useNavigate } from "react-router-dom";



const SignUp = () => {
    const navigate = useNavigate();


    ///////////////////////////////////////////////////////
    //------------------Sign Up Page---------------------//
    ///////////////////////////////////////////////////////
    const signUp = () => {
        
        const usernameInput = document.getElementById("signUpUsername") as HTMLInputElement;
        const passwordInput = document.getElementById("signUpPassword") as HTMLInputElement;
        const confirmInput = document.getElementById("signUpConfirm") as HTMLInputElement;

        const usernameSpan = document.getElementById("signUpUsernameSpan") as HTMLSpanElement;
        const passwordSpan = document.getElementById("signUpPasswordSpan") as HTMLSpanElement;
        const confirmSpan = document.getElementById("signUpConfirmSpan") as HTMLSpanElement;

        if (!usernameInput.value || !passwordInput.value || !confirmInput.value) {
            if (!usernameInput.value) { usernameSpan.innerHTML = "Please enter a username"; } else { usernameSpan.innerHTML = ""; }
            if (!passwordInput.value) { passwordSpan.innerHTML = "Please enter a password"; } else { passwordSpan.innerHTML = ""; }
            if (!confirmInput.value) { confirmSpan.innerHTML = "Please confirm your password"; } else { confirmSpan.innerHTML = ""; }
            return;
        } else {
            usernameSpan.innerHTML = "";
            passwordSpan.innerHTML = "";
            confirmSpan.innerHTML = "";
        }
        if (passwordInput.value !== confirmInput.value) {
            confirmSpan.innerHTML = "Passwords do not match";
            return;
        } else {
            confirmSpan.innerHTML = "";
        }
        
        fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameInput.value,
                win: 0,
                loss: 0,
                tie: 0,
                password: passwordInput.value
            })
        }).then(response => {
            if (response.status === 200) {
                navigate("/login");
            } else {
                alert("Failed to sign up");
            }
        });
    }
    return (
        <div id="signUpPage">
            <div id="signUpImage"></div>
            <div id="signUpRoom">
                <h1 id="signUpTitle">Sign Up</h1>
                <form id="signUpForm">
                    <label htmlFor="signUpUsername">Username:<span id="signUpUsernameSpan"></span></label>
                    <input type="text" id="signUpUsername" name="signUpUsername" placeholder="Username" />
                    <label htmlFor="signUpPassword">Password:<span id="signUpPasswordSpan"></span></label>
                    <input type="password" id="signUpPassword" name="signUpPassword" placeholder="Password" />
                    <label htmlFor="signUpConfirm">Confirm Password:<span id="signUpConfirmSpan"></span></label>
                    <input type="password" id="signUpConfirm" name="signUpConfirm" placeholder="Confirm Password" />
                    <input type="button" onClick={() => {
                        signUp();
                    }} value="Submit" id="signUpSubmit"/>
                </form>
            </div>
        </div>
    );
}

export default SignUp;