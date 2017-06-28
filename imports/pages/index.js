/* eslint-disable */
import Util from "./_";
import Give from "./give";
import Groups from "./groups";
import Celebrate from "./celebrate";
import Profile from "./profile";
import Signup from "./signup";
let Articles,
  Devotionals,
  Discover,
  Locations,
  Music,
  News,
  Event,
  Sections,
  Series,
  Stories,
  Studies,
  Video,
  Welcome;

if (process.env.NATIVE) {
  Articles = require("./articles");
  Devotionals = require("./devotionals");
  Discover = require("./discover");
  Locations = require("./locations");
  Music = require("./music");
  News = require("./news");
  Event = require("./events");
  Sections = require("./sections");
  Series = require("./series");
  Stories = require("./stories");
  Studies = require("./studies");
  Video = require("./video");
  Welcome = require("./welcome");
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
