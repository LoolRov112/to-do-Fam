const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM members");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching families:", err);
    res.status(500).send("Server error");
  }
});

router.get("/:familyId/user/:userName/:password", async (req, res) => {
  const { familyId, userName, password } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM members WHERE family_id = $1 AND username = $2`,
      [familyId, userName]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    const member = result.rows[0];

    if (member.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.json(member);
  } catch (err) {
    console.error("Error fetching member:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/:familyId/:userName", async (req, res) => {
  const { familyId, userName } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM members WHERE family_id = $1 AND username = $2`,
      [familyId, userName]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    const member = result.rows[0];

    res.json(member);
  } catch (err) {
    console.error("Error fetching member:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/:familyId", async (req, res) => {
  const { familyId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM members WHERE family_id = $1`,
      [familyId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No members found for this family" });
    }
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const {
    family_nickname,
    full_Name,
    username,
    password,
    is_creator,
    createdAt = new Date(),
  } = req.body;

  if (!family_nickname || !full_Name || !username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const family = await pool.query(
      "SELECT id FROM families WHERE family_nickname = $1",
      [family_nickname]
    );

    if (family.rows.length === 0) {
      return res.status(404).json({ error: "Family not found" });
    }

    const family_id = family.rows[0].id;

    const memberCheck = await pool.query(
      `SELECT * FROM members 
        WHERE family_id = $1 AND (username = $2 OR username = $3)`,
      [family_id, full_Name, username]
    );

    if (memberCheck.rows.length > 0) {
      return res.status(409).json({
        error:
          "Member with same name or username already exists in this family",
      });
    }

    const result = await pool.query(
      `INSERT INTO members 
        (family_id, full_Name, username, password, is_creator, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
      [family_id, full_Name, username, password, is_creator, createdAt]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding member:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:fam_id/:name", async (req, res) => {
  const { fam_id, name } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM members WHERE family_id = $1 AND (username = $2 OR full_name = $2)`,
      [fam_id, name]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching member:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:nickname/:memberId/role", async (req, res) => {
  const { nickname, memberId } = req.params;
  const { is_creator } = req.body;

  try {
    // שלב 1: מצא את המשפחה לפי nickname
    const familyResult = await pool.query(
      "SELECT id FROM families WHERE family_nickname = $1",
      [nickname]
    );

    if (familyResult.rows.length === 0) {
      return res.status(404).json({ error: "Family not found" });
    }

    const familyId = familyResult.rows[0].id;

    // שלב 2: עדכן את is_creator של החבר הספציפי
    const updateResult = await pool.query(
      `UPDATE members 
       SET is_creator = $1 
       WHERE id = $2 AND family_id = $3 
       RETURNING *`,
      [is_creator, memberId, familyId]
    );

    if (updateResult.rows.length === 0) {
      return res.status(404).json({ error: "Member not found in this family" });
    }

    res.status(200).json(updateResult.rows[0]);
  } catch (err) {
    console.error("Error updating member role:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
