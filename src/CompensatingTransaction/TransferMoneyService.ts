import TransactionHandler from './TransactionHandler'

export class TransferMoneyService implements TransactionHandler {
    public async handle(): Promise<void> {
        await this.authoriseTransfer()
        await this.transferTheAmount()
        await this.clearTransaction()
    }

    private async authoriseTransfer(): Promise<boolean> {
        return true
    }

    private async transferTheAmount(): Promise<boolean> {
        return true
    }

    private async clearTransaction(): Promise<boolean> {
        return false
    }
}
