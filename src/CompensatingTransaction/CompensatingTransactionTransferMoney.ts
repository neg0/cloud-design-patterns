import CompensatingTransaction from './CompensatingTransaction'

export default class CompensatingTransactionTransferMoney
    implements CompensatingTransaction {
    public async compensate(): Promise<void> {
        await this.identifyTransactionById()
        await this.revertTransferAmount()
    }

    public async identifyTransactionById(): Promise<boolean> {
        return true
    }

    public async revertTransferAmount(): Promise<boolean> {
        return true
    }
}
