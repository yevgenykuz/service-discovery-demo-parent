export const HOME = "/"
export const LOGIN = "/login"
export const DEPOSIT = "/deposit"
export const DEPOSIT_PROCESSING = "/deposit/processing"
export const DEPOSIT_SUCCESSFUL = "/deposit/successful"
export const CHECK_BALANCE = "/balance"
export const LOGS_ENTRY_POINT = "/logs/entry"
export const LOGS_PROPAGATOR = "/logs/propagator"
export const LOGS_SINK = "/logs/sink"
export const LOGS = "/logs"

export function getAllowedRoutesWithoutLogin() {
    return [LOGS,
        LOGS_ENTRY_POINT,
        LOGS_PROPAGATOR,
        LOGS_SINK
    ]
}
