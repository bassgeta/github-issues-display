# Github issues display (with GraphQL!)

To get this up and running, pull it and then:

1.Generate a Github access token at [settings](https://github.com/settings/tokens). Generate a new classic token with the scope of repo: public_repo

2. create a .env file at the root of the project it should looke something like this
```
VITE_GITHUB_ACCESS_TOKEN=<your token>
```
3. run `npm install`
4. run `npm run dev`
5. For tests run `npm run test`

That should be it! :)
