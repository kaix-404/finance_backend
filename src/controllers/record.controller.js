import {
  createRecordService,
  getRecordsService,
  updateRecordService,
  deleteRecordService
} from "../services/record.service.js";

// CREATE RECORD
export const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date } = req.body;

    if (!amount || !type || !category || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const record = await createRecordService(req.body, req.user.id);

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET RECORDS (pagination + filtering handled in service)
export const getRecords = async (req, res) => {
  try {
    const data = await getRecordsService(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE RECORD
export const updateRecord = async (req, res) => {
  try {
    const record = await updateRecordService(req.params.id, req.body, req.user);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (err) {
    if (err.message === "Unauthorized") {
        return res.status(403).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

// DELETE RECORD (SOFT DELETE)
export const deleteRecord = async (req, res) => {
  try {
    const record = await deleteRecordService(req.params.id, req.user);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Record deleted successfully" });
  } catch (err) {
        if (err.message === "Unauthorized") {
            return res.status(403).json({ message: err.message });
        }
    res.status(500).json({ message: err.message });
  }
};