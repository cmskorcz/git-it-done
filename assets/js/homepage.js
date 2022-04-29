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

getUserRepos();