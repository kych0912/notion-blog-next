**로그아웃**
----
로그아웃 합니다. 쿠키를 삭제합니다.

* **URL**

  `/api/user/logout`

* **Method:**

  `GET`

* **Success Response:**

    * **Code:** 200 <br />
      **Content:** <br/>
    
* **Failes Response:**

    * **Code:** 401 <br />
      **Content:** <br/>
      ```json
        { 
            message: 'Token Not Found', isLogged: false
        }
    ```