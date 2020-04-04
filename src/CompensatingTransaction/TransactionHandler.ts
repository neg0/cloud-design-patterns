export default interface TransactionHandler {
    handle(): Promise<void>
}
