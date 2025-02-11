<div class="status-bar" style="text-align: center;"> 🛠 Project completed 🛠 </div>

# Social Network

This fullstack project is a social network that allows you to create a profile, a post, follow other profiles, comment on publications, among other points.

# 📑 Table of Contents

1.  [Technologies Used](#technologies-used)
2.  [Setup and Installation](#setup-and-installation)
3.  [Project Structure](#project-structure)
4.  [License](#license)
5.  [Author](#author)


<h1 id="technologies-used">🛠 Technologies Used </h1>

- **Node.js** for backend
- **RabbitMQ** for messaging
- **MinIO** for upload images
- **Swagger** for API Documentation
- **React.js** for frontend
- **React Native** for mobile
- **MUI** for styles on frontend and mobile

---
<h1 id="setup-and-installation">⚙️ Setup and Installation </h1>

## Prerequisites

- Node.js: https://nodejs.org/pt/download
- React.js
- React Native

## Steps

1. **Clone the repository:**
    ```bash
        git clone https://github.com/igorttosta/Social-Network.git
    ```
2. **Configure your ip in the project:**
    ```bash
        Social Network -> frontend -> src -> service -> constants.ts -> (SERVER_ADDRESS: "http://0.0.0.0:4000/v1",)
    ```
3. **Build the images on docker-compose:**
    ```bash
        docker compose build
    ```
4. **Start docker-compose:**
    ```bash
        docker compose up
    ```

<h1 id="project-structure">📂 Project Structure </h1>

```bash
    ├── api
    │   ├── lib
    │   │   ├── pubsub.js
    │   │   ├── upload.js
    │   │
    │   ├── model
    │   │   ├── Comments.js
    │   │   ├── index.js
    │   │   ├── Post.js
    │   │   ├── Profile.js
    │   │   ├── User.js
    │   │
    │   ├── public
    │   │   ├── index.html
    │   │   ├── upload.html
    │   │
    │   ├── routers
    │   │   ├── commentRouters.js
    │   │   ├── feedRouters.js
    │   │   ├── index.js
    │   │   ├── postRouters.js
    │   │   ├── profileRouters.js
    │   │   ├── securityRouters.js
    │   │   ├── userRouters.js
    │   │
    │   ├── app.js
    │   ├── index.js
    │
    ├── frontend
    │   ├── public
    │   │   ├── index.html
    │   ├── src
    │   │   ├── api
    │   │   │   ├── server.tsx
    │   │   ├── assets
    │   │   │   ├── logo.svg
    │   │   ├── components
    │   │   │   ├── AuthForm
    │   │   │   │   ├── index.css
    │   │   │   │   ├── index.tsx
    │   │   │   ├── CustomActionIcon
    │   │   │   │   ├── index.tsx
    │   │   │   ├── CustomAppBar
    │   │   │   │   ├── index.tsx
    │   │   │   ├── CustomAvatar
    │   │   │   │   ├── index.tsx
    │   │   │   ├── CustomChatBubbleIcon
    │   │   │   │   ├── index.tsx
    │   │   │   ├── CustomFavoriteIcon
    │   │   │   │   ├── index.tsx
    │   │   │   ├── CustomIconButton
    │   │   │   │   ├── index.tsx
    │   │   │   ├── Dropzone
    │   │   │   │   ├── index.css
    │   │   │   │   ├── index.tsx
    │   │   │   ├── PostCard
    │   │   │   │   ├── index.css
    │   │   │   │   ├── index.tsx
    │   │   ├── Models
    │   │   │   ├── Post.ts
    │   │   ├── pages
    │   │   │   ├── Home
    │   │   │   │   ├── index.tsx
    │   │   │   ├── NewPost
    │   │   │   │   ├── index.tsx
    │   │   │   ├── PostDetail
    │   │   │   │   ├── index.tsx
    │   │   │   ├── Profile
    │   │   │   │   ├── index.tsx
    │   │   │   ├── Profiles
    │   │   │   │   ├── index.tsx
    │   │   │   ├── Signin
    │   │   │   │   ├── index.tsx
    │   │   │   ├── Signup
    │   │   │   │   ├── index.tsx
    │   │   ├── service
    │   │   │   ├── constants.ts
    │   │   ├── App.tsx
    │   │   ├── index.tsx
    │ 
    ├── mobile 
    ├── docker-compose.yml 
    └── README.md
 ```

<h1 id="license">📜 License </h1>

Distributed under the MIT License. See `LICENSE` for more information.

<h1 id="author">✒️ Author </h1>

Made by **Igor T Matos**. For more information: my [LinkedIn](https://www.linkedin.com/in/matos-igor-tosta/)
