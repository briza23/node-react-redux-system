import axios from "axios";

function receiveTransactionReports(transactionReports) {
    return {
        type: "RECV_TRANSACTION_REPORTS",
        transactionReports
    };
}

function receiveHourlyReports(hourlyReports) {
    return {
        type: "RECV_HOURLY_REPORTS",
        hourlyReports
    };
}

function receiveLiveQueues(liveQueues) {
    return {
        type: "RECV_LIVE_QUEUES",
        liveQueues
    };
}

export function getTransactionReports() {
    return (dispatch) => {
        return axios({
            url: "https://api.cocobeach.site/api/v1/transactions/reports/stats",
            timeout: 20000,
            method: "get",
            responseType: "json"
        })
            .then((response) => {
                dispatch(receiveTransactionReports(response.data.data));
            })
            .catch((error) => {
                alert(error);
            });
    };
}

export function getGraphData() {
    return (dispatch) => {
        return axios({
            url: "https://api.cocobeach.site/api/v1/transactions/reports/hourly",
            timeout: 20000,
            method: "get",
            responseType: "json"
        })
            .then((response) => {
                dispatch(receiveHourlyReports(response.data.data));
            })
            .catch((error) => {
                alert(error);
            });
    };
}

export function getLiveQueues() {
    return (dispatch) => {
        return axios({
            url: "https://api.cocobeach.site/api/v1/transactions/live_queues",
            timeout: 20000,
            method: "get",
            responseType: "json"
        })
            .then((response) => {
                dispatch(receiveLiveQueues(response.data.data));
            })
            .catch((error) => {
                alert(error);
            });
    };
}
