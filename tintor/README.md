<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="https://res.cloudinary.com/dblglqzca/image/upload/v1734237693/tintor-images/unnamed_rcpnvo.png" alt="Logo" width="200" height="60">
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
        <a href="#tintor-project">Tintor Project</a>
    </li>
    <li>
        <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

# Tintor Project

Tintor is an platform to connect mentors and mentees in the corporate world. It aims to provide a platform for professionals to connect, share knowledge, and collaborate.

# Built With

[![Typescript][Typescript]][Typescript-url] [![React][React.js]][React-url] [![Tailwindcss][Tailwindcss]][Tailwindcss-url] [![Node][Node.js]][Node-url]  [![Express][Express]][Express-url] <br>  [![Python][Python]][Python-url] [![Flask][Flask]][Flask-url]

# Getting Started

### Prerequisites

- Node.js (v18) <br> [Install Node.js]
- yarn
  ```sh
  npm install yarn@latest -g
  ```
- Python <br> [Install Python]
- Docker Desktop <br> [Install Docker Desktop on Windows]
- Git Bash <br> [Install Git Bash on Windows]

### Installation

1.  Clone the repo

    ```sh
    git clone https://github.com/doandat8888/tintor.git
    ```

2.  Run backend server <br> 2.1 Open a terminal in the current project directory and move to backend folder

    ```sh
    cd tintor-be
    ```

    2.2 Create `.env` file and input environment variables

    ```dosini
    # Inside .env
    PORT=8080
    ACCESS_TOKEN_SECRET = "76766d67364e35119f0c5a198a173fb980452ae08347a79c8e419239425bebcd"
    REFRESH_TOKEN_SECRET = "7419a0f8c33d71ae21624e1404c122a7cf9c60299121e853093964cf72bddd35"
    MONGO_URI=mongodb+srv://clvhackathon2024:clvhackathon2024@cluster0.5sjx9.mongodb.net/
    TOKEN_EXPIRE_IN=1d
    REFRESH_TOKEN_EXPIRE_IN=3d
    CLOUDINARY_CLOUD_NAME=dblglqzca
    CLOUDINARY_API_KEY=296631443492296
    CLOUDINARY_API_SECRET=YjU9MvI5gqTUVCxvBm4kzqFXLU0
    TINTOR_MATCHING_URL=http://localhost:8888
    ```

    2.3 Install NPM packages

    ```sh
    npm i
    ```

    2.4 Run backend server

    ```sh
    npm start
    ```

3.  Run frontend server <br> 3.1 Open a new terminal in the current project directory and move to frontend folder

    ```sh
    cd tintor-fe
    ```

    3.2 Create `.env` file and input environment variables

    ```dosini
    # Inside .env
    VITE_FIREBASE_API_KEY='AIzaSyD2Bl8MU0dCUyqkkIvRS30E11rNMtjZP_I'
    VITE_AUTH_DOMAIN='hackathon-project-e259e.firebaseapp.com'
    VITE_PROJECT_ID='hackathon-project-e259e'
    VITE_STORAGE_BUCKET='hackathon-project-e259e.firebasestorage.app'
    VITE_MESSAGING_SENDER_ID='1058058939074'
    VITE_APP_ID='1:1058058939074:web:a5e116eedce5148b62695b'
    VITE_API_URL='http://localhost:8080/'
    ```

    3.3 Install NPM packages

    ```sh
    yarn
    ```

    3.4 Run frontend server

    ```sh
    yarn dev
    ```
4. Build docker image

    ```sh
        docker-compose build
    ```

5.  Run flask server (Make sure that you've installed <b>pip</b>) <br> 5.1 Open a new terminal in the current project directory and move to matching folder

    ```sh
    cd tintor-matching
    ```

    5.2 Install PIP packages

    ```sh
    pip install -r requirements.txt
    ```

    5.3 Run flask server

    ```sh
    python test.py
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- MARKDOWN LINKS & IMAGES -->

[Typescript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Python-url]: https://www.python.org/
[Tailwindcss]: https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss
[Tailwindcss-url]: https://tailwindcss.com/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[Express]: https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[Flask]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=Flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/2.2.x/
[Install Docker Desktop on Windows]: https://docs.docker.com/desktop/install/windows-install/
[Install Node.js]: https://nodejs.org/en/download
[Python]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[Install Python]: https://www.python.org/downloads/
[Install Git Bash on Windows]: https://git-scm.com/download/win
