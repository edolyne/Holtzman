/* eslint-disable react/no-danger */
import { Component, PropTypes } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Meta from "../../components/shared/meta";

// loading state
import Loading from "../../components/@primitives/UI/loading";
import { nav as navActions } from "../../data/store";

import Headerable from "../../deprecated/mixins/mixins.Header";

import Split, { Left, Right } from "../../components/@primitives/layout/split";

import backgrounds from "../../util/backgrounds";
import react from "../../util/react";

import RelatedContent from "../../components/content/related-content";
import SingleVideoPlayer from "../../components/@primitives/players/video";

const defaultArray = [];

class StaffNewsSingleWithoutData extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    staffnews: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));
    if (this.headerAction) {
      this.headerAction({ title: "Staff News" });
    }
  }

  render() {
    const { content } = this.props.staffnews;

    if (!content) {
      // loading
      return (
        <div className="locked-ends locked-sides floating">
          <div className="floating__item">
            <Loading />
          </div>
        </div>
      );
    }

    const staffnews = content;
    const photo = backgrounds.image(staffnews);
    return (
      <div>
        <Meta
          title={staffnews.title}
          image={photo}
          id={staffnews.id}
          meta={[{ property: "og:type", content: "staffnews" }]}
        />
        <Split nav classes={["background--light-primary"]}>
          {(() => {
            if (staffnews.content.ooyalaId.length === 0) {
              return (
                <Right
                  mobile
                  background={photo}
                  classes={["floating--bottom", "overlay--gradient@lap-and-up"]}
                  ratioClasses={["floating__item", "overlay__item", "one-whole", "soft@lap-and-up"]}
                  aspect="square"
                />
              );
            }
            return <SingleVideoPlayer ooyalaId={staffnews.content.ooyalaId} />;
          })()}
        </Split>
        <Left scroll>
          <div className="one-whole">
            <section
              className={
                "soft@palm soft-double-sides@palm-wide-and-up soft@lap " +
                "soft-double@lap-wide-and-up push-top push-double-top@lap-and-up"
              }
            >
              <h2 className="capitalize">{staffnews.title}</h2>
              <div dangerouslySetInnerHTML={react.markup(staffnews)} />
            </section>
            <RelatedContent
              excludedIds={[staffnews.id]}
              tags={staffnews.content.tags || defaultArray}
            />
          </div>
        </Left>
      </div>
    );
  }
}

const GET_STAFFNEWS_QUERY = gql`
  query getStaffNews($id: ID!) {
    content: node(id: $id) {
      id
      ... on Content {
        entryId: id
        title
        status
        channelName
        meta {
          urlTitle
          siteId
          date
          channelId
        }
        content {
          body
          ooyalaId
          tags
          images(sizes: ["large"]) {
            fileName
            fileType
            fileLabel
            url
          }
        }
      }
    }
  }
`;

const withStaffNews = graphql(GET_STAFFNEWS_QUERY, {
  name: "staffnews",
  options: (ownProps) => ({
    variables: { id: ownProps.params.id },
  }),
});

export default connect()(
  withStaffNews(ReactMixin.decorate(Headerable)(StaffNewsSingleWithoutData))
);

export { StaffNewsSingleWithoutData, GET_STAFFNEWS_QUERY };
