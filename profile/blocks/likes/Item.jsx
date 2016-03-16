import { Component, PropTypes } from "react"
import Moment from "moment"
import { Link } from "react-router"

import { ImageLoader } from "../../../core/components/loading"
import LoadingStyles from "../../../core/components/loading/FeedItemSkeleton.css"

import inAppLink from "../../../core/util/inAppLink"

export default class LikesItem extends Component {

  static propTypes = {
    like: PropTypes.object.isRequired
  }

  backgroundStyles = {
    backgroundImage: `url('${this.props.like.image}')`
  }

  imageclasses = [
    "background--fill",
    "card__image",
    "ratio--landscape"
  ];

  // context from ImageLoader
  preloader = () => {
    return (
      <div
        className={`${this.imageclasses.join(" ")} ${LoadingStyles["load-item"]}`}
        >
        {this.children}
      </div>
    );
  }

  // context from ImageLoader
  renderElement = () => {
    return (
      <div
        className={this.imageclasses.join(" ")}
        style={this.backgroundStyles}
        >
        {this.children}
      </div>
    );
  }

  getDate(entry) {
    let date = new Date(entry.date);

    let time = Moment(date);
    let currentTime = new Date();

    if (date.getUTCFullYear() === currentTime.getUTCFullYear())
      return Moment(time).format("MMM D")
    else
      return Moment(time).format("MMM D, YYYY")
  }

  iconClasses = `${this.props.like.icon} soft-half-right`

  onClick = (e) => {
    if (e.currentTarget.href.match(/^https|http/).length > 0) {
      inAppLink(e)
    }
  }

  render() {

    const like = this.props.like;

    return (
      <section className="hard">
        <div className="grid">
          <div className="one-whole grid__item">
            <div className="card">
              <Link to={like.link} onClick={this.onClick} className="plain">
                <ImageLoader
                  src={this.props.like.image}
                  preloader={this.preloader}
                  renderElement={this.renderElement}
                  imageclasses={this.iamgeclasses}
                  ></ImageLoader>
                <div className="card__item soft text-dark-tertiary">
                  <h4 className="text-dark">{like.title}</h4>
                    <h7>{like.category}</h7>
                  <h7 className="text-right float-right">{this.getDate(like)}</h7>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

}
