# heroku-deploy-archive
The successor of the heroku-build plugin

## Installation
After installing the [Heroku Toolbelt](https://toolbelt.heroku.com/) run:

```shell
$ heroku plugins:install heroku-deploy-archive
```
the plugin should now be listed under `heroku plugins`:

```shell
$ heroku plugins
=== Installed Plugins
heroku-deploy-archive
```

## Usage

After loggin in with the heroku toolbelt (`heroku auth`) bundle all the files you need to be deployed together as a tarball, like this:

```shell
cd files-to-be-deployed
tar cvvf deploy-me.tgz ./*
```
then deploy with:

```shell
$ heroku deploy:archive -app your-app ./deploy-me.tgz some-version
```

Where `some-version` should be replaced with a meaningful version information (it's up to you).

For instance you may want to do:

```shell
$ heroku deploy:archive --app ./deploy-me.tgz "$(git rev-parse HEAD)"
```
which will use the current git commit hash as the version to be displayed on the "Activity" panel on heroku.com.

## Contributing

Found a bug or have an improvement or new feature in mind? Awesome!
Just go for it with either a pull request or an issue - also check out [the Contributing.md file](https://github.com/AVGP/heroku-deploy-archive/blob/master/CONTRIBUTING.md)

## License
MIT License.
