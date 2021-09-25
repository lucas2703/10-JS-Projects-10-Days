const APIURL = 'https://api.github.com/users/'

var main = document.getElementById('profile-container');

async function getUser(username)
{
    var response = await fetch(`${APIURL + username}`);
    var responseData = await response.json();
    return responseData;
}

function displayInfo(userData)
{
    var profileImg = document.createElement('div');
    profileImg.classList.add('profile-img');
    profileImg.innerHTML = `
        <img src=${userData.avatar_url} height="200" width="200">
    `;

    main.appendChild(profileImg);

    if (userData.bio == null)
    {
        userData.bio = "No bio found.";
    }

    var profileText = document.createElement('div');
    profileText.classList.add('profile-text');
    profileText.innerHTML = `
        <h3>${userData.name}</h3>
        <p>${userData.bio}</p>

        <ul class="comms">
            <li><i class="fas fa-eye"></i>${userData.following}</li>
            <li><i class="fas fa-heart"></i>${userData.followers}</li>
            <li><i class="fas fa-upload"></i>${userData.public_repos}</li>
        </ul>
    `; 
    
    main.appendChild(profileText);
}

document.getElementById('input').addEventListener('keypress', async function(e) {
    if (e.key != 'Enter')
    {
        return
    }

    if (document.getElementsByClassName('profile-img'))
    {
        main.innerHTML = '';
    }

    var searchVal = document.getElementById('input').value;

    var userData = await getUser(searchVal);

    if (userData.message == "Not Found")
    {
        alert("Profile not found.");
        return
    }
    

    document.getElementById('input').value = '';
    console.log(userData);

    displayInfo(userData);
})