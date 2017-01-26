
import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";

import { liked as likedActions, modal } from "../../../data/store";
import OnBoard from "../../people/accounts";

const TOGGLE_LIKE_MUTATION = gql`
  mutation ToggleLike($nodeId: String!) {
    toggleLike(nodeId: $nodeId) {
      like {
        id
      }
    }
  }
`;

const withToggleLike = graphql(TOGGLE_LIKE_MUTATION);

export const classWrapper = (propsReducer) => (WrappedComponent) => {
  export class LikesWrapper extends Component {
    getNodeId = () => {
      if(propsReducer && typeof propsReducer === "function" ) {
          return propsReducer(this.props);
      } else {
        console.warn("propsReducer was either not passed, or is not a function")
        return null;
      };
    };

    toggleLike = () => {
      const { dispatch, mutate } = this.props;
      if (!Meteor.userId()) { //if not logged in, show login modal
        dispatch(modal.render(OnBoard, {
          coverHeader: true, modalBackground: "light",
        }));
      } else { // if logged in, toggle like state in redux, remote with gql query
        const nodeId = this.getNodeId();
        if(nodeId) {
          dispatch(likedActions.toggle({ entryId: nodeId }));
          mutate({ variables: { nodeId: nodeId } });
        }
      }

      return { type: "FALSY", payload: {} };
    }

    render = () => <WrappedComponent {...this.props} onLike={this.toggleLike} />;
  }
  return connect()(withToggleLike(LikesWrapper)); // the actual component to be wrapped in a function
}

export default classWrapper;
