**유저저 게시글 가져오기**
----
id에 해당하는 유저의 게시글들을 가져옵니다.

* **URL**

  `/api/post/user/[id]`

* **Method:**

  `GET`

* **Success Response:**

    * **Code:** 200 <br />
      **Content:** <br/>
    ```json
      {
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
        "id": "85d2a88f-3f4d-498c-adc6-e8c73be8c432",
        "date": "2024-06-19T15:00:00.000Z",
        "description": "ㅁㄴㅇㅂㅈㅇㅂㅈ",
        "author": "test1",
        "title": "김영천 | 상상프렌즈 포트폴리오",
        "image": "https://www.notion.so/image/https%3A%2F%2Fimages.unsplash.com%2Fphoto-1472289065668-ce650ac443d2%3Fixlib%3Drb-1.2.1%26q%3D85%26fm%3Djpg%26crop%3Dentropy%26cs%3Dsrgb?table=block&id=85d2a88f-3f4d-498c-adc6-e8c73be8c432&cache=v2",
        "avatar": null
    },
    {
        "id": "fc8a8084-07fb-4a5c-a9fb-499b17c79ed7",
        "date": "2024-06-19T15:00:00.000Z",
        "description": "test\n",
        "author": "YoungCheon Kim",
        "title": "김영천 | 프론트엔드 개발",
        "image": "https://www.notion.so/image/https%3A%2F%2Fimages.unsplash.com%2Fphoto-1472289065668-ce650ac443d2%3Fixlib%3Drb-1.2.1%26q%3D85%26fm%3Djpg%26crop%3Dentropy%26cs%3Dsrgb?table=block&id=fc8a8084-07fb-4a5c-a9fb-499b17c79ed7&cache=v2",
        "avatar": "https://avatars.githubusercontent.com/u/102653189?v=4"
    }]

      ```
    
* **Failes Response:**

    * **Code:** 404 <br />
      **Content:** <br/>