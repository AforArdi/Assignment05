const signInBtn = document.getElementById('btn-signup');

signInBtn.addEventListener('click', function(){
    const inputUsername = document.getElementById('input-username');
    const username = inputUsername.value;
    const inputPassword = document.getElementById('input-password');
    const password = inputPassword.value;

    if (username == 'admin' && password == 'admin123'){
        alert('Successfully Logged In');
        window.location.assign('home.html');
    }else{
        alert('Invalid Credential!');
        return;
    }
})