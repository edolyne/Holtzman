/* eslint-disable */
import Util from "./_";
import Give from "./give";
import Groups from "./groups";
import Celebrate from "./celebrate";
import Profile from "./profile";
import Signup from "./signup";

if (process.env.NATIVE) {
  const Articles = require("./articles");
  const Devotionals = require("./devotionals");
  const Discover = require("./discover");
  const Locations = require("./locations");
  const Music = require("./music");
  const News = require("./news");
  const Event = require("./events");
  const Sections = require("./sections");
  const Series = require("./series");
  const Stories = require("./stories");
  const Studies = require("./studies");
  const Video = require("./video");
  const Welcome = require("./welcome");
}

let Routes = [];
Routes = Routes.concat(Profile, Give, Groups.Routes, Celebrate.Routes);

if (process.env.NATIVE) {
  Routes = Routes.concat(
    Articles.Routes,
    Devotionals.Routes,
    Discover.Routes,
    Locations.Routes,
    Music.Routes,
    News.Routes,
    Event.Routes,
    Sections.Routes,
    Series.Routes,
    Stories.Routes,
    Studies.Routes,
    Video.Routes,
    Welcome.Routes
  );
}

Routes = Routes.concat(Signup.Routes, Util.Routes);

export { Routes };

export default Routes;
