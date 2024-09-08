**게시글 보기**
----
특정 유저의 게시글을 가져옵니다
유저의 쿠키를 확인하여 작성자 여부도 확인합니다.

* **URL**

  `/api/post/[user]/[id]`

* **Method:**

  `GET`

* **Success Response:**

    * **Code:** 200 <br />
      **Content:** <br/>
      * 부모 페이지의 경우
    ```json
      {
        "data": [
            {
                "id": "85d2a88f-3f4d-498c-adc6-e8c73be8c432",
                "date": "2024-06-19T15:00:00.000Z",
                "description": "ㅁㄴㅇㅂㅈㅇㅂㅈ",
                "author": "test1",
                "title": "김영천 | 상상프렌즈 포트폴리오",
                "image": "https://www.notion.so/image/https%3A%2F%2Fimages.unsplash.com%2Fphoto-1472289065668-ce650ac443d2%3Fixlib%3Drb-1.2.1%26q%3D85%26fm%3Djpg%26crop%3Dentropy%26cs%3Dsrgb?table=block&id=85d2a88f-3f4d-498c-adc6-e8c73be8c432&cache=v2",
                "avatar": null,
            }
        ],
        "isAuthor": false,
        "isChild":false
      }

    ```

    * 자식 페이지일 경우
    ```json
      {
        "data": [
            {
                "id": "85d2a88f-3f4d-498c-adc6-e8c73be8c432",
            }
        ],
        "isAuthor": false,
        "isChild":true
      }
    ```

    
* **Failes Response:**

    * **Code:** 404 <br />
      **Content:** <br/>
      ```json
      {message:"Post Not Found",isSuccess:false}
      ```
    