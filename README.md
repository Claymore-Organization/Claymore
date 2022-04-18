# Claymore
See the live site [Here](https://claymore-d6749.web.app/)
### Web Framework
We've decided to use <b>Express</b> as our web framework, for these reasons:

* Learning curve and developers’ previous experience
* Community support and overall industry use/adaptation
* Integration with other third party libraries and API’s
* Simplicity and ease of use


### QA/Helpful Tools We Have Set up 

* <b>Eslint</b> is the linter our group uses. We use it to automatically lint our code through the [eslint plugin for vscode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

* <b>npm-check</b> is the tool we use for detecting dependency updates. As it is meant to be installed globally through npm, we didn't include it in package.json

### Starting the front end locally

```
Claymore/frontend$ npm install
Claymore/frontend$ npm run local
```

### Deployment

You'll need to create a .env file with the correct variables, and have access to firebase - see private discussions on slack.

```bash
Claymore/frontend$ firebase login
```

You can test before deploying with

```bash
Claymore/frontend$ npm run preview
```

Once the site appears fine, you can run

```bash
Claymore/frontend$ npm run deploy
```

and navigate to [https://claymore-d6749.web.app/](https://claymore-d6749.web.app/) to see the deployed site. It should deploy quite quickly (~30sec)
