import Record from "../models/Record.js";

export const getSummary = async (req, res) => {
  const income = await Record.aggregate([
    { $match: { type: "income", isDeleted: false } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  const expense = await Record.aggregate([
    { $match: { type: "expense", isDeleted: false } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  res.json({
    totalIncome: income[0]?.total || 0,
    totalExpense: expense[0]?.total || 0,
    balance: (income[0]?.total || 0) - (expense[0]?.total || 0)
  });
};

export const getCategoryBreakdown = async (req, res) => {
  const data = await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: { category: "$category", type: "$type" },
        total: { $sum: "$amount" }
      }
    }
  ]);

  res.json(data);
};

export const getMonthlyTrends = async (req, res) => {
  const trends = await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type"
        },
        total: { $sum: "$amount" }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } }
  ]);

  res.json(trends);
};