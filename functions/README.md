# Claymore Backend

## Testing locally

```
functions$ firebase login
functions$ npm install
functions$ npm run serve
```

Then navigate to [http://localhost:5001/claymore-d6749/us-central1/default](http://localhost:5001/claymore-d6749/us-central1/default) or something like
[http://localhost:5001/claymore-d6749/us-central1/default/user](http://localhost:5001/claymore-d6749/us-central1/default/user) to access a nontrivial endpoint.

## Deploying

The backend is already deployed at
[https://us-central1-claymore-d6749.cloudfunctions.net/default/user](https://us-central1-claymore-d6749.cloudfunctions.net/default/user)

You can update it with

```bash
functions$ npm run deploy
```

You can look at and change the database at [https://claymore-d6749-default-rtdb.firebaseio.com/](https://claymore-d6749-default-rtdb.firebaseio.com/)