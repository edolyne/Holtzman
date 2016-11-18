import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Meteor } from "meteor/meteor";

import Authorized from "../../../blocks/authorzied";

import {
  modal as modalActions,
  header as headerActions,
  give as giveActions,
} from "../../../store";

import Details from "./Details";
import Layout from "./Layout";
import Confirm from "./Details/Confirm";
import Recover from "./Recover";

class TemplateWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    schedules: PropTypes.object,
    accounts: PropTypes.object,
    give: PropTypes.object,
  }

  componentDidMount() {
    if (process.env.NATIVE) {
      const item = { title: "Schedule Your Giving" };
      this.props.dispatch(headerActions.set(item));
    }
  }

  confirm = (e) => {
    const { dataset } = e.currentTarget;
    const { id } = dataset;
    this.props.dispatch(giveActions.setRecoverableSchedule(Number(id)));

    return true;
  }

  cancel = (e) => {
    const { dataset } = e.currentTarget;
    const { id } = dataset;
    const { dispatch } = this.props;

    this.props.dispatch(modalActions.render(Confirm, {
      onFinished: () => {
        dispatch(giveActions.deleteSchedule(id));

        // eslint-disable-next-line
        Meteor.call("give/schedule/cancel", { id }, () => { });
      },
    }));
  }


  render() {
    const { schedules, accounts, give } = this.props;
    const { recoverableSchedules } = give;

    return (
      <Layout
        accountsReady={!accounts.loading}
        schedules={schedules.schedules}
        schedulesReady={!schedules.loading}
        accounts={accounts.accounts}
        cancelSchedule={this.cancel}
        recoverableSchedules={recoverableSchedules}
        confirm={this.confirm}
      />
    );
  }
}

const SCHEDULED_TRANSACTIONS_QUERY = gql`
  query GetScheduleTransactions {
    schedules: scheduledTransactions(cache: false) {
      numberOfPayments
      next
      end
      id
      reminderDate
      code
      gateway
      start
      date
      details {
        amount
        account {
          name
          description
        }
      }
      payment {
        paymentType
        accountNumber
        id
      }
      schedule {
        value
        description
      }
    }
  }
`;

const withScheduledTransactions = graphql(SCHEDULED_TRANSACTIONS_QUERY, { name: "schedules" }, {
  options: { ssr: false },
});

const FINANCIAL_ACCOUNTS_QUERY = gql`
  query GetFinancialAccounts {
    accounts {
      description
      name
      id: entityId
      summary
      image
      order
      images { fileName, fileType, fileLabel, s3, cloudfront }
    }
  }
`;

const withFinancialAccounts = graphql(FINANCIAL_ACCOUNTS_QUERY, { name: "accounts" }, {
  options: { ssr: true },
});

const mapStateToProps = (store) => ({
  give: store.give,
});

const Template = withScheduledTransactions(
  withFinancialAccounts(
    connect(mapStateToProps)(
      TemplateWithoutData
    )
  )
);

const Routes = [
  { path: "schedules", component: Template },
  {
    path: "schedules/transfer",
    component: Authorized,
    indexRoute: { component: Recover },
  },
  {
    path: "schedules/:id",
    component: Authorized,
    indexRoute: { component: Details },
  },
];

export default {
  Template,
  Routes,
};

export {
  TemplateWithoutData,
};
