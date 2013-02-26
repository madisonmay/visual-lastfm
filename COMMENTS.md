### Don't include `node_modules` in your repository

When using Node with Git, the best practice is to not add `node_modules` to your version control. You can do this by creating a `.gitignore` file in the root directory with the contents:

```
node_modules/
```

If you accidentally added `node_modules` to your version control (you'll see that it shows up on Github), run the command `git rm --cached -r node_modules/*` in the root directory to remove it from Git (but not the directory).

### Don't include your Last.fm keys in your repository.

See `/app.js` and also `/routes/user.js`.

Use environment variables instead. Add

```
export LASTFM_KEY=afsdkjasdfkjl
export LASTFM_SECRET=fkfkfkfkfkf
```

To a `.gitignore`'d script you run each time you open a terminal, or to your `~/.bashrc` so that it's set every time you open a terminal. Then use `process.env.LASTFM_KEY` instead of a string inside of your source code.

You can set environment variables on Heroku by doing `heroku config:add LASTFM_KEY=sadfasdfadfs`
