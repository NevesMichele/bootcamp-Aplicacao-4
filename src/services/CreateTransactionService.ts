import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw Error("Invalid balance, couldn't create the transaction");
    }

    const transcation = this.transactionsRepository.create({
      title,
      type,
      value: Number(value.toFixed(2)),
    });

    return transcation;
  }
}

export default CreateTransactionService;
