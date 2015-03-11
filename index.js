var Source = require('./source'),
    Build  = require('./build');

exports.topics = [{
  name: 'deploy',
  description: 'Deploy an archive via the Build API'
}];

exports.commands = [
  {
    topic: 'deploy',
    command: 'archive',
    description: 'Deploys an archive via the Build API',
    help: '/path/to/archive your.version.here',
    needsApp: true,
    needsAuth: true,
    args: [{name: 'archive'}, {name: 'version'}],
    run: function (context) {
      Source.create(context.app, context.auth.password).then(function(sourceUrls) {
        Source.upload(sourceUrls.uploadUrl, context.args.archive).then(function(uploadResult) {
          console.log("Upload completed.", uploadResult);
          new Build(context.app, context.auth.password, sourceUrls.downloadUrl, context.args.version).then(function(buildResult) {
            console.log("Build created: https://heroku.com/" + context.app + "/activity/builds/" + buildResult);
          });
        });
      });
    }
  }
];