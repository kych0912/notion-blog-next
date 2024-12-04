**인증**
----
쿠키에 저장된 값으로 유저 정보를 확인합니다.

* **URL**

  `/api/user/auth`

* **Method:**

  `GET`

* **Success Response:**

    * **Code:** 200 <br />
      **Content:** <br/>
      ```json
      {
        "user": {
            "login": "kych0912",
            "id": 102653189,
            "node_id": "",
            "avatar_url": "https://avatars.githubusercontent.com/u/102653189?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/kych0912",
            "html_url": "https://github.com/kych0912",
            "followers_url": "https://api.github.com/users/kych0912/followers",
            "following_url": "https://api.github.com/users/kych0912/following{/other_user}",
            "gists_url": "https://api.github.com/users/kych0912/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/kych0912/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/kych0912/subscriptions",
            "organizations_url": "https://api.github.com/users/kych0912/orgs",
            "repos_url": "https://api.github.com/users/kych0912/repos",
            "events_url": "https://api.github.com/users/kych0912/events{/privacy}",
            "received_events_url": "https://api.github.com/users/kych0912/received_events",
            "type": "User",
            "site_admin": false,
            "name": "YoungCheon Kim",
            "company": "Inha University",
            "blog": "",
            "location": "Incheon",
            "email": null,
            "hireable": null,
            "bio": "Frontend Developer",
            "twitter_username": null,
            "public_repos": 17,
            "public_gists": 0,
            "followers": 1,
            "following": 1,
            "created_at": "2022-03-30T07:41:39Z",
            "updated_at": "2024-06-20T11:07:38Z"
        },
        "message": "Token Verified",
        "id": {
            "id": "",
            "iat": 1718869164,
            "exp": 1719128364
        },
        "isLogged": true
    }
    ```
    
* **Failes Response:**

    * **Code:** 401 <br />
      **Content:** <br/>
      ```json
        { 
            message: 'Invalid Token', isLogged: false
        }
    ```
