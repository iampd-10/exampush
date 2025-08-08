import taskSchema from "../models/taskSchema.js";
import dotenv from "dotenv";
dotenv.config();

export const addtask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const existing = await taskSchema.findOne({
      title: title,
      userId: req.userId,
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Title already exists",
      });
    }
    const data = await taskSchema.create({
      title,
      userId: req.userId,
      description,
    });
    if (data) {
      return res.status(200).json({
        success: true,
        message: "task created successfully hurray 🙌",
        data: data,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "could not access" });
  }
};
export const getTask = async (req, res) => {
  try {
    const data = await taskSchema.find({ userId: req.userId });
    if (data) {
      return res.status(200).json({
        success: true,
        message: "task fetched successfully ✨",
        data: data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "could not access",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const todoId = req.params.id;
    const data = await taskSchema.findByIdAndDelete({
      userId: req.userId,
      _id: todoId,
    });
    if (data) {
      return res.status(200).json({
        success: true,
        message: "task deleted successfully",
        data: data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "task not found",
        data: data,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "could not access" });
  }
};
