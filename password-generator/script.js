const generate = document.getElementById('pw-generate');
const copy = document.getElementById('copy-btn');
const passwordOutput = document.getElementById('password');
const passwordLength = document.getElementById('pw-length');
const passwordNumbers = document.getElementById('pw-numbers');
const passwordUpper = document.getElementById('pw-upper');
const passwordSymbols = document.getElementById('pw-symbols');

generate.addEventListener('click', generatePassword);
copy.addEventListener('click', copyToClipboard);

const passwordObj = {
    'lower' : 'abcdefghijklmnopqrstuvwxyz',
    'upper' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'numbers' : '0123456789',
    'symbols' : '+[]!$%&_-='
}

function generatePassword()
{
    var passwordObjSelector = ['lower'];

    if (passwordLength.value > 25 || passwordLength.value < 1)
    {
        alert('Check password length parameters. Maximum password length is 25 characters.');
        return
    }

    if (passwordNumbers.checked)
    {
        passwordObjSelector.push('numbers');
    }

    if (passwordUpper.checked)
    {
        passwordObjSelector.push('upper');
    }

    if (passwordSymbols.checked)
    {
        passwordObjSelector.push('symbols');
    }

    var password = "";
    while (password.length < passwordLength.value)
    {
        // determine what kind of char to input
        let selector = Math.floor(Math.random() * passwordObjSelector.length);
        // using selector, get data from that in passwordObject
        let range = passwordObjSelector[selector];
        let randomNumber = Math.floor(Math.random() * (passwordObj[range].length));
        // find random char within selection range
        let randomChar = passwordObj[range][randomNumber];
        password = password.concat(randomChar);
    }
    passwordOutput.innerHTML = password;
}

function copyToClipboard()
{
    var password = passwordOutput.innerHTML;
    console.log(password);  

    if (!password)
    {
        return;
    }

    navigator.clipboard.writeText(password);
    alert('Copied password clipboard.');
}