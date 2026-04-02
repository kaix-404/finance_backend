import Record from "../models/Record.js";
import { buildFilter } from "../utils/buildFilter.js";

// CREATE
export const createRecordService = async (data, userId) => {
  return await Record.create({
    ...data,
    userId
  });
};

// GET (pagination + filtering)
export const getRecordsService = async (query) => {
  const { page = 1, limit = 10 } = query;

  const filter = buildFilter(query);
  const skip = (page - 1) * limit;

  const records = await Record.find(filter)
    .sort({ date: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Record.countDocuments(filter);

  return {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: records
  };
};

// UPDATE
export const updateRecordService = async (id, data, user) => {
  const record = await Record.findById(id);

  if (!record) return null;

  if (
    record.userId.toString() !== user.id &&
    user.role !== "admin"
  ) {
    throw new Error("Unauthorized");
  }

  if (Object.keys(data).length === 0) {
    throw new Error("No update data provided");
  }

  return await Record.findByIdAndUpdate(id, data, { new: true });
};

// DELETE (soft)
export const deleteRecordService = async (id, user) => {
  const record = await Record.findById(id);

  if (!record) return null;

  if (
    record.userId.toString() !== user.id &&
    user.role !== "admin"
  ) {
    throw new Error("Unauthorized");
  }

  return await Record.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};