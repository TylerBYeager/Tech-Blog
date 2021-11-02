# Model-View-Controller (MVC): Tech Blog
# Table of Contents
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributions](#contributions)
  * [Tests](#tests) (not available in this project)
  * [Questions](#questions)
  
  ## Description  
  This is an example "Tech Blog" application. Users are able to see posts, sign up for an account, add their own posts, and add comments to other posts. 
![snapshot](https://user-images.githubusercontent.com/89880190/139798478-ce3d4afa-018d-4203-99fe-9d1d588810bc.png)


  ## Code Snippets
  Here are some code snippets and what they accomplished. The first snippet is found within the controllers directory. This is the index.js file that contains all of the main routes that the app uses. /api will return an api response, / will redirect a user to the homepage where posts can be found, and /dashboard is used to find a user's own personal dashboard when logged in. 
  ```
    const router = require("express").Router();
    const apiRoutes = require("./api");
    const homeRoutes = require("./homeRoutes");
    const dashboardRoutes = require("./dashboardRoutes");

    router.use("/api", apiRoutes);
    router.use("/", homeRoutes);
    router.use("/dashboard", dashboardRoutes);


    module.exports = router;
  ```

  This second snippet is found within the models directory. This is also called index.js but pertains specifically to the models that have been created. This code in particular imports all of the established models and created relationships between them all. This allows for Users to have posts, posts to have comments, and comments to belong to users. 
  ```
    const User = require("./User");
    const Post = require("./Post");
    const Comment = require("./Comment");

    User.hasMany(Post, {
        foreignKey: "user_id"
    });

    Post.belongsTo(User, {
        foreignKey: "user_id",
        onDelete: "CASCADE"
    });

    User.hasMany(Comment, {
        foreignKey: "user_id",
        onDelete: "CASCADE"
    });

    Post.hasMany(Comment, {
        foreignKey: "post_id",
        onDelete: "CASCADE"
    });

    Comment.belongsTo(User, {
        foreignKey: "user_id",
        onDelete: "CASCADE"
    });

    Comment.belongsTo(Post, {
        foreignKey: "post_id",
        onDelete: "CASCADE"
    });

    module.exports = { User, Post, Comment };
  ```

  The third snippet is found within the controllers directory. Specifically this is the first "get" request from homeRoutes.js. This code uses an asynchronous request, with a try and a catch, in order to find all posts that have the associated attributes. The result is then mapped into a plain object and rendered onto the page through a handlebars.js file called homepage.
  ```
    router.get("/", async (req, res) => {
        try {
            const postData = await Post.findAll(
                {
                    attributes: ["id", "title", "content", "created_at"],
                    include: [
                        {
                            model: Comment,
                            attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                            include: {
                                model: User,
                                attributes: ["username"]
                            }
                        }
                    ]
                });
            const posts = postData.map(post => post.get({ plain: true }));
            res.status(200).render("homepage", { posts, loggedIn: req.session.loggedIn });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
  ```

  ## Installation
  To install:
  ```
  Once you have a working SSH key added to your Github account, go to the Tech-Blog repository. Click the green "code" button on the top right and clonecopy the @github.com link with the SSH key option to your clipboard. 
  ```

  Next, 
  ```
  Open Gitbash or Terminal and navigate to a directory that you would like to add the cloned repository. Once in your desired directory type in
  "git clone 'right click to paste'" and press enter. This will clone the repository onto your personal machine.
  ```
  Lastly, 
  ```
  Type 'ls' into your Gitbash or Terminal to see a list of items within the directory. If you have done the previous steps correctly then you should see a respository titled "Tech-Blog". Simply type in "code ." to open it in your code editor of choice. Lastly, check the package.json file to see the dependencies needed to run this. WIthin your terminal run an npm install. This will give you everything you need to run the app. From there, check the attached screencastify link near the top to see what to do next. 

  ```

  ## Usage
  This app functions very similarly to a live blog site that you might be familiar with. This required a lot of backend work and tinkering with routes in order to make. This app can be used to create posts, add comments, and see other's comments. 

  ## Built With
  * [JAVASCRIPT](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  * [NODE.JS](https://nodejs.org/en/)
  * [EXPRESS.JS](https://expressjs.com/)
  * [MYSQL](https://www.mysql.com/)
  * [SEQUELIZE](https://sequelize.org/)
  * [DOTENV](https://www.npmjs.com/package/dotenv)
  * [CSS](https://www.w3schools.com/css/)
  * [HTML](https://www.w3schools.com/html/)
  * [EXPRESS-SESSION](https://www.npmjs.com/package/express-session)
  * [HANDLEBARS.JS](https://handlebarsjs.com/)

  ## Deployed Link
* [See the Live Site!](https://tech-blog-1024.herokuapp.com) 

## Authors

* **Tyler Brian Yeager**

- [Link to Repo Site](https://github.com/TylerBYeager/Tech-Blog)
- [Link to Github](https://github.com/TylerBYeager/tylerbyeager.github.io)
- [Link to LinkedIn](https://www.linkedin.com/in/tyler-yeager-611926213/)

## Contributions

- UC Berkeley Coding Bootcamp & my pair programmers this week
- BCS learning assistants helping me get "unstuck" and gain a better understanding in the process

## License
![License](https://img.shields.io/badge/License-Apache-blue.svg)

## Questions
- wow_d2@hotmail.com
