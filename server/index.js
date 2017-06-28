if (process.env.WEB && process.env.NODE_ENV === "production") {
  // cdn party
  if (
    Meteor.settings.cdnPrefix &&
    __meteor_runtime_config__.ROOT_URL.match("localhost") === null
  ) {
    Meteor.startup(() => {
      WebAppInternals.setBundledJsCssPrefix(Meteor.settings.cdnPrefix);
    });
  }

  // load the application
  /* eslint-disable */
  const run = require("../imports/util/router/server");
  const { routes, client, server } = require("../imports");
  /* eslint-enable */

  run(routes, client, server);
}
