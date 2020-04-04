export default interface CompensatingTransaction {
    compensate(): Promise<void>
}
