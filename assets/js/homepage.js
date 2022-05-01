let userFormEl = document.getElementById('user-form');
let nameInputEl = document.getElementById('username');
let repoContainerEl = document.getElementById('repos-container');
let repoSearchTerm = document.getElementById('repo-search-term');

const getUserRepos = (user) => {
    let userApi = `https://api.github.com/users/${user}/repos`;

    fetch(userApi)
        .then((res) => {
            res.json()
                .then((data) => {
                    displayRepos(data, user);
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
};

const displayRepos = (repos, searchTerm) => {
    repoContainerEl.textContent = '';
    repoSearchTerm.textContent = searchTerm;

    for (let i = 0; i < repos.length; i++) {
        let repoName = `${repos[i].owner.login}/${repos[i].name}`;

        let repoEl = document.createElement('div');
        repoEl.classList = 'list-item flex-row justify-space-between align-center';

        let titleEl = document.createElement('span');
        titleEl.textContent = repoName;

        repoEl.appendChild(titleEl);

        let statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';

        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = `<i class="fas fa-times status-icon icon-danger"></i>${repos[i].open_issues_count} issue(s)`;
        } else {
            statusEl.innerHTML = `<i class="fas fa-check-square status-icon icon-success"></i>`;
        }

        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }
}

getUserRepos();
userFormEl.addEventListener('submit', formSubmitHandler);