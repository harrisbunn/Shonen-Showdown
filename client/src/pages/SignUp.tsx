const signUp = () => {
    const username = document.getElementById("signUpUsername") as HTMLInputElement;
    const password = document.getElementById("signUpPassword") as HTMLInputElement;
    const confirm = document.getElementById("signUpConfirm") as HTMLInputElement;

    const usernameSpan = document.getElementById("signUpUsernameSpan") as HTMLSpanElement;
    const passwordSpan = document.getElementById("signUpPasswordSpan") as HTMLSpanElement;
    const confirmSpan = document.getElementById("signUpConfirm") as HTMLSpanElement;

    if (!username.value || !password.value || !confirm.value) {
        if (!username.value) { usernameSpan.innerHTML = "Please enter a username"; } else { usernameSpan.innerHTML = ""; }
        if (!password.value) { passwordSpan.innerHTML = "Please enter a password"; } else { passwordSpan.innerHTML = ""; }
        if (!confirm.value) { confirmSpan.innerHTML = "Please confirm your password"; } else { confirmSpan.innerHTML = ""; }
        return;
    } else {
        usernameSpan.innerHTML = "";
        passwordSpan.innerHTML = "";
        confirmSpan.innerHTML = "";
    }
    if (password.value !== confirm.value) {
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
            username: username.value,
            win: 0,
            loss: 0,
            tie: 0,
            password: password.value
        })
    }).then(response => {
        if (response.status === 200) {
            window.location.href = "/login";
        } else {
            alert("Failed to sign up");
        }
    });
}

const SignUp = () => {
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