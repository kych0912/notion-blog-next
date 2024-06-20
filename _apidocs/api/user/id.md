**유저 정보 가져오기**
----
유저의 닉네임, 아바타, 게시글을 가져옵니다.

* **URL**

  `/api/user/[id]`

* **Method:**

  `GET`

* **Success Response:**

    * **Code:** 200 <br />
      **Content:** <br/>

      ```json
      {
          "data": [
              [
                  {
                      "seq": 6,
                      "id": "YoungCheon Kim",
                      "password": "",
                      "avatar": "https://avatars.githubusercontent.com/u/102653189?v=4"
                  }
              ],
              [
                  {
                      "id": "183b9a8d-59ce-4ba4-a5af-0ad0883b6ce3",
                      "date": "2024-06-19T15:00:00.000Z",
                      "description": "a",
                      "author": "YoungCheon Kim",
                      "title": "Term Project Proposal",
                      "image": "https://www.notion.so/images/page-cover/rijksmuseum_jan_lievens_1627.jpg",
                      "avatar": "https://avatars.githubusercontent.com/u/102653189?v=4"
                  },
                  {
                      "id": "fc8a8084-07fb-4a5c-a9fb-499b17c79ed7",
                      "date": "2024-06-19T15:00:00.000Z",
                      "description": "test\n",
                      "author": "YoungCheon Kim",
                      "title": "김영천 | 프론트엔드 개발",
                      "image": "https://www.notion.so/image/https%3A%2F%2Fimages.unsplash.com%2Fphoto-1472289065668-ce650ac443d2%3Fixlib%3Drb-1.2.1%26q%3D85%26fm%3Djpg%26crop%3Dentropy%26cs%3Dsrgb?table=block&id=fc8a8084-07fb-4a5c-a9fb-499b17c79ed7&cache=v2",
                      "avatar": "https://avatars.githubusercontent.com/u/102653189?v=4"
                  }
              ]
          ]
      }
      ```
    
* **Failes Response:**

    * **Code:** 404 <br />
      **Content:** <br/>
      ```json
      
      ```
    