let userFormEl = document.getElementById('user-form');
let nameInputEl = document.getElementById('username');

const getUserRepos = (user) => {
    let userApi = `https://api.github.com/users/${user}/repos`;

    fetch(userApi)
        .then((res) => {
            res.json()
                .then((data) => {
                    console.log(data);
                })
        });
};

const formSubmitHandler = (event) => {
    event.preventDefault();
    let username = nameInputEl.value.trim();
    
    if (username) {
        getUserRepos(username);
        nameInputEl.value = '';
    } else {
        alert('Please enter a GitHub username');
    }
}

getUserRepos();
userFormEl.addEventListener('submit', formSubmitHandler)