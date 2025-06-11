export function calculateDebts(expenses) {
  const balanceMap = {}; // { userId: amount }

  expenses.forEach(exp => {
    const { amount, paidBy, splitBetween } = exp;
    if (!paidBy || !Array.isArray(splitBetween) || splitBetween.length === 0) return;

    const splitAmount = amount / splitBetween.length;

    // Sadala
    splitBetween.forEach(userId => {
      if (!balanceMap[userId]) balanceMap[userId] = 0;
      balanceMap[userId] -= splitAmount;
    });

    if (!balanceMap[paidBy]) balanceMap[paidBy] = 0;
    balanceMap[paidBy] += amount;
  });

  // No balansa izveido maksājumus no tiem, kam jāmaksā, uz tiem, kam ir parāds
  const debtors = [];
  const creditors = [];

  Object.entries(balanceMap).forEach(([userId, balance]) => {
    if (balance < -0.01) {
      debtors.push({ userId, amount: -balance });
    } else if (balance > 0.01) {
      creditors.push({ userId, amount: balance });
    }
  });

  const transactions = [];

  // Sadarina parādniekus ar kreditoriem
  while (debtors.length && creditors.length) {
    const debtor = debtors[0];
    const creditor = creditors[0];
    const amount = Math.min(debtor.amount, creditor.amount);

    transactions.push({
      from: debtor.userId,
      to: creditor.userId,
      amount
    });

    debtor.amount -= amount;
    creditor.amount -= amount;

    if (debtor.amount < 0.01) debtors.shift();
    if (creditor.amount < 0.01) creditors.shift();
  }

  return transactions;
}
