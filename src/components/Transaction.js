import PropTypes from 'prop-types'
import * as TransactionActions from "../actions/Transaction";
import React from "react";
import { connect } from "react-redux";
// import {Row, Col, Button, Navbar, MenuItem, Nav, NavItem, NavDropdown} from "react-bootstrap";
import { Chart } from 'react-google-charts';
import VisibleNavBar from "./Navbar";
// import { setPusherClient } from 'react-pusher';

import { formatCurrency, formatTime } from "../helpers";

class Transaction extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getTransactionReports();
        this.props.getGraphData();
        this.props.getLiveQueues();
    }

    change_active(){
        
    }

    render() {
        const { transactionReportsStats } = this.props;
        //this.props.transactionReportsStats
        const { overall_stats, stats_per_category } = transactionReportsStats;
        const { deposit, encashment, payment, withdrawal } = stats_per_category;
        let display;
        if (Object.keys(this.props.hourlyReports).length > 1) {
            let data = [['Time', 'Amount']];
            this.props.hourlyReports.map(object => data.push([object.hour, object.amount]));
            display = (<Chart
                chartType="AreaChart"
                data={data}
                graph_id="AreaChart"
                width="100%"
                height="267px"
                legend_toggle
            />)
        }
        let live_queues = this.props.liveQueues.map ((liveQueue, i) => {
            return (
                <tr key={"live_queue_" + i}>
                    <td>{liveQueue.name}</td>
                    <td>{liveQueue.address}</td>
                    <td className="transac-success-color"><strong>ONLINE</strong></td>
                    <td><span className="label label-default badge-transac-default">{liveQueue.queued}</span></td>
                    <td><span className="label label-success badge-transac-success">{liveQueue.current_queue}</span></td>
                </tr>
            )
        });

        return (
            <div>
                <VisibleNavBar />
                <div className="nav-left">
                      <ul className="nav nav-stacked utransac-ul-left">
                        <li className="active"><a data-toggle="tab" href="#dashboard"><img width="15px" src="dashboard.png"/> Dashboard</a></li>
                        <li><a data-toggle="tab" href="#branch-queues"><img width="15px" src="branches.png"/> Branch Queues</a></li>
                      </ul>
                </div>
                <div className="col-md-2"/>
                <div className="col-md-10 right-view">
                    <div className="margin-container-left">
                        <div className="tab-content">
                            <div id="dashboard" className="tab-pane fade in active">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="row custom-box-container-header">
                                            <div className="col-md-6">
                                                <h4>Today's Production: PHP {formatCurrency(overall_stats.total_amount)}</h4>
                                            </div>
                                            <div className="col-md-6">
                                                <h4>TOTAL TRANSACTIONS: {overall_stats.total_transactions}</h4>
                                            </div>
                                        </div>
                                        <div className="custom-box-container">
                                            {display}
                                        </div>
                                    </div>
                                    <div className="col-md-4 padding-0">
                                        <div className="col-md-6 padding-0">
                                            <div className="custom-box-container-small">
                                                <div className="text-center">
                                                    <img width="50px" src="withdrawal.png"/>
                                                    <h4>Withdrawal</h4>
                                                    <h4 className="u-transac-font-head">PHP {formatCurrency(withdrawal.total)}</h4>
                                                    <span className="pull-left average-queue">Average Queue</span>
                                                    <span className="pull-right average-queue">{formatTime(withdrawal.ave_queue_time)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="custom-box-container-small">
                                                <div className="text-center">
                                                    <img width="50px" src="deposit.png"/>
                                                    <h4>Deposit</h4>
                                                    <h4 className="u-transac-font-head">PHP {formatCurrency(deposit.total)}</h4>
                                                    <span className="pull-left average-queue">Average Queue</span>
                                                    <span className="pull-right average-queue">{formatTime(deposit.ave_queue_time)}</span>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 margin-top-10 padding-0">
                                            <div className="custom-box-container-small">
                                                <div className="text-center">
                                                    <img width="50px" src="encashment.png"/>
                                                    <h4>Encashment</h4>
                                                    <h4 className="u-transac-font-head">PHP {formatCurrency(encashment.total)}</h4>
                                                    <span className="pull-left average-queue">Average Queue</span>
                                                    <span className="pull-right average-queue">{formatTime(encashment.ave_queue_time)}</span>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 margin-top-10">
                                            <div className="custom-box-container-small">
                                                <div className="text-center">
                                                    <img width="50px" src="payment.png"/>
                                                    <h4>Payment</h4>
                                                    <h4 className="u-transac-font-head">PHP {formatCurrency(payment.total)}</h4>
                                                    <span className="pull-left average-queue">Average Queue</span>
                                                    <span className="pull-right average-queue">{formatTime(payment.ave_queue_time)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="custom-box-container-live-queue margin-top-10">
                                            <strong>LIVE QUEUES</strong>
                                            <table className="table table-striped">
                                                <thead>
                                                  <tr>
                                                    <th>Branch Name</th>
                                                    <th>Location</th>
                                                    <th>Status</th>
                                                    <th>Total Queues</th>
                                                    <th>In cashier</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                    {live_queues.slice(0, 5)}
                                                </tbody>
                                            </table>
                                            <div className="text-center">
                                                <a data-toggle="tab" href="#branch-queues"><button className="btn btn-default custom-button1">View all branches</button></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="branch-queues" className="tab-pane fade">
                                <table className="table table-striped">
                                    <thead>
                                      <tr>
                                        <th>Branch Name</th>
                                        <th>Location</th>
                                        <th>Status</th>
                                        <th>Total Queues</th>
                                        <th>In cashier</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                        {live_queues}
                                    </tbody>
                                </table>
                            </div>
                            <div id="branch-transactions" className="tab-pane fade">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Transaction.propTypes = {
};

function mapStateToProps(state) {
    return state;
}

const VisibleTransactions = connect(
    mapStateToProps,
    TransactionActions
)(Transaction);

export default VisibleTransactions;
