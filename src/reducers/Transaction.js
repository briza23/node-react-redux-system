import { combineReducers } from "redux";

function transactionReportsStats(state = { stats_per_category: {
    payment: {
        total: 0,
        ave_queue_time: 0,
        total_queue_time: 0,
        total_transactions: 0
    },
    withdrawal: {
        total: 0,
        ave_queue_time: 0,
        total_queue_time: 0,
        total_transactions: 0
    },
    encashment: {
        total: 0,
        ave_queue_time: 0,
        total_queue_time: 0,
        total_transactions: 0
    },
    deposit: {
        total: 0,
        ave_queue_time: 0,
        total_queue_time: 0,
        total_transactions: 0
    }}, overall_stats: {
        total_transactions: 0,
        total_average_queue_time: null,
        total_amount: 0
    }
}, action) {
    switch(action.type) {
    case "RECV_TRANSACTION_REPORTS":
        return action.transactionReports;
    default:
        return state;
    }
}

function hourlyReports(hourlyReports = [], action) {
    switch (action.type) {
    case "RECV_HOURLY_REPORTS":
        return action.hourlyReports;
    default:
        return hourlyReports;
    }
}

function liveQueues (liveQueues = [], action) {
    switch (action.type) {
    case "RECV_LIVE_QUEUES":
        return action.liveQueues;
    default:
        return liveQueues;
    }
}

const transactions = combineReducers({
    transactionReportsStats,
    hourlyReports,
    liveQueues
});

export default transactions;