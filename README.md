# nodeExpressMongoES6_promptStorer
A basic demo application of a prompt storer using Node Express Mongo ES6 modules and client side rendering with AJAX. Made for my webdev class


## Running the project 

Clone it, then create a `.env` file in the project folder that contains your `MONGO_URL` connection string. It defaults to `mongodb://localhost:27017`

Then in the project folder run

```
npm install
npm start
```

And open your browser on http://localhost:3000

## Deploying

You can deploy it [for free on Render](https://render.com/docs/deploy-node-express-app), with the database running on [MongoAtlas](https://www.mongodb.com/docs/atlas/)

Make sure you configure the right node version in the [package.json](./package.json) file. In this case we have:

```
 "engines": {
    "node": ">=18.18.0 <19.0.0"
  }
```

Then obtain the MONGO_URL from Mongo Atlas, and configure it on the render project in the environment settings. You can add it as a secret .env file

Finally, make sure that in Mongo Atlas you whitelist ips of your deployment on render https://render.com/docs/static-outbound-ip-addresses

And that's it

