import { useOutletContext } from 'react-router-dom';

const loginUser = async () => {
    const usernameInput = document.getElementById('loginUsername') as HTMLInputElement;
    const passwordInput = document.getElementById('loginPassword') as HTMLInputElement;

    const usernameSpan = document.getElementById('loginUsernameSpan') as HTMLSpanElement;
    const passwordSpan = document.getElementById('loginPasswordSpan') as HTMLSpanElement;

    if (!usernameInput.value || !passwordInput.value) {
        if (!usernameInput.value) { usernameSpan.innerHTML = 'Please enter a username'; } else { usernameSpan.innerHTML = ''; }
        if (!passwordInput.value) { passwordSpan.innerHTML = 'Please enter a password'; } else { passwordSpan.innerHTML = ''; }
        return null;
    } else {
        usernameSpan.innerHTML = '';
        passwordSpan.innerHTML = '';
    }

    const username = usernameInput.value;
    const password = passwordInput.value;
    
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.status === 200) {
        const { token } = await response.json();
        localStorage.setItem('LOGIN_TOKEN', token);
        return token;
    } else {
        return null;
    }
}

const Login = () => {

    const { setLoginToken } = useOutletContext<{
        loginToken: string | null,
        setLoginToken: (loginToken: string | null) => void
    }>();

    return (
        <div id="loginPage">
            <div id="loginImage"></div>
            <div id="loginRoom">
                <h1 id="loginTitle">Login</h1>
                <form id="loginForm">
                    <label htmlFor="loginUsername">Username:<span id="loginUsernameSpan"></span></label>
                    <input type="text" id="loginUsername" name="loginUsername" placeholder='Username' />
                    <label htmlFor="loginPassword">Password:<span id="loginPasswordSpan"></span></label>
                    <input type="password" placeholder='Password' id="loginPassword" name="loginPassword" />
                    <input type="button" value="Submit" id="loginSubmit" onClick={async () => {
                        const token = await loginUser();
                        if (token) {
                            setLoginToken(token);
                            window.location.href = '/';
                        } else {
                            document.getElementById('loginUsernameSpan')!.innerHTML = 'Invalid username or password';
                        }
                    }}/>
                </form>
            </div>
        </div>
    );
}

export default Login;