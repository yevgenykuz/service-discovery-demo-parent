import dayjs from "dayjs";


export const logTypes = {
    sink: "sink",
    propagator: "propagator",
    entryPoint: "entryPoint",
}
export function getLogTypeDisplayName(logType){
    switch (logType){
        case logTypes.sink:
            return "Bank Storage";
        case logTypes.entryPoint:
            return "Bank Gateway"
        case logTypes.propagator:
            return "Bank Analysis"
        case "all":
            return "All"
        default:
            return ;
    }
}

export class Logger {
    #logs = [];
    #uniqueId = 0


    get logs() {
        return [...this.#logs];
    }
    get sinkLogs() {
        return this.#logs.filter(x => x.type === logTypes.sink)
    }
    get propagatorLogs() {
        return this.#logs.filter(x => x.type === logTypes.propagator)
    }
    get entryPointLogs() {
        return this.#logs.filter(x => x.type === logTypes.entryPoint)
    }
    getLogs(logsType){
        if(!logsType)
            return this.logs
        return this.#logs.filter(entry=>entry.type === logsType)
    }

    log(logType, message) {
        const id = this.#uniqueId++;
        this.#logs.push({id ,message, type: logType, date: dayjs().set("millisecond", 0).toDate()})
        this.saveToLocalStorage()
    }
    logSink(message) {
        this.log(logTypes.sink, message)
    }
    logPropagator(message) {
        this.log(logTypes.propagator, message)
    }
    logEntryPoint(message) {
        this.log(logTypes.entryPoint, message)
    }


    clear() {
        this.#logs = []
        this.saveToLocalStorage()
    }
    clearType(type) {
        if(type === "all")
            return this.clear()
        this.#logs = this.logs.filter(x => x.type !== logTypes[type])
        this.saveToLocalStorage()
    }
    clearSink() {
        this.clearType(logTypes.sink)
    }
    clearPropagator() {
        this.clearType(logTypes.propagator)
    }
    clearEntryPoint() {
        this.clearType(logTypes.entryPoint)
    }

    loadFromLocalStorage() {
        const loadedLogs = getLogsFromLocalStorage()
        if( this.#logs.length !== loadedLogs.length)
            this.#logs = loadedLogs
    }
    saveToLocalStorage(){
        saveLogsToLocalStorage(this.#logs)
    }

}
function getLogsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("logs") || "[]")
}
function saveLogsToLocalStorage(logs) {
    localStorage.setItem("logs", JSON.stringify(logs))
}

export const loggerInstance = new Logger()

