const express = require("express");
const router = express.Router();
const pool = require("../db");
const { use } = require("react");

router.get("/:familyId", async (req, res) => {
  const { familyId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE family_id = $1",
      [familyId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).send("Server error");
  }
});

router.get("/:familyId/user/:userId", async (req, res) => {
  const { familyId, userId } = req.params;

  try {
    const userResult = await pool.query(
      `SELECT * FROM members WHERE family_id = $1 AND id = $2`,
      [familyId, userId]
    );

    if (userResult.rows.length === 0) {
      console.log("Member not found");
      return res.status(404).json({ error: "Member not found" });
    }

    const tasksResult = await pool.query(
      `SELECT * FROM tasks WHERE family_id = $1 AND user_id = $2`,
      [familyId, userId]
    );

    return res.json(tasksResult.rows); // אפילו אם הוא []
  } catch (err) {
    console.error("Error fetching member or tasks:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const {
    family_id,
    user_id,
    name,
    description,
    due_date,
    done = false,
    created_at = new Date(),
  } = req.body;

  if (!family_id || !user_id || !name || !due_date || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks (family_id, user_id, name, description, due_date, done, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [family_id, user_id, name, description, due_date, done, created_at]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const {
    family_id,
    user_id,
    name,
    description,
    due_date,
    done,
    created_at = new Date(),
  } = req.body;

  // בדיקת שדות חובה בלבד
  if (!family_id || !user_id || !name || !due_date || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const result = await pool.query(
      `UPDATE tasks 
       SET family_id = $1, user_id = $2, name = $3, description = $4, due_date = $5, done = $6, created_at = $7 
       WHERE id = $8 
       RETURNING *`,
      [
        family_id,
        user_id,
        name,
        description,
        due_date,
        done,
        created_at,
        taskId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:taskId", async (req, res) => {
  const { taskId } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [taskId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted", task: result.rows[0] });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/done/:taskId", async (req, res) => {
  const { taskId } = req.params;

  try {
    const result = await pool.query(
      "UPDATE tasks SET done = NOT done WHERE id = $1 RETURNING *",
      [taskId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error toggling task done status:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
