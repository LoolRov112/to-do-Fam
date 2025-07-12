const express = require("express");
const router = express.Router();
const pool = require("../db");

// קבלת כל המשפחות
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM families");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching families:", err);
    res.status(500).send("Server error");
  }
});

router.get("/:nickName", async (req, res) => {
  try {
    const { nickName } = req.params;

    const result = await pool.query(
      `SELECT * FROM families WHERE family_nickname = $1`,
      [nickName]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Family not found" });
    }

    res.json(result.rows[0]); // נחזיר רק את התוצאה הראשונה
  } catch (err) {
    console.error("Error fetching family by email:", err);
    res.status(500).send("Server error");
  }
});

// הוספת משפחה חדשה
router.post("/", async (req, res) => {
  const {
    family_nickname,
    creator_name,
    creator_email,
    phone,
    password,
    username,
  } = req.body;

  if (
    !family_nickname ||
    !creator_name ||
    !creator_email ||
    !phone ||
    !password ||
    !username
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // בדיקה אם המשפחה כבר קיימת לפי nickname או אימייל
    const existing = await pool.query(
      "SELECT * FROM families WHERE family_nickname = $1 OR creator_email = $2",
      [family_nickname, creator_email]
    );
    if (existing.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Family nickname or email already exists" });
    }

    // יצירת המשפחה
    const familyResult = await pool.query(
      `INSERT INTO families (family_nickname, creator_name, creator_email, phone, password)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [family_nickname, creator_name, creator_email, phone, password]
    );

    const newFamily = familyResult.rows[0];

    // יצירת חבר משפחה ראשי
    const memberResult = await pool.query(
      `INSERT INTO members (family_id, full_name, username, password, is_creator, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [newFamily.id, creator_name, username, password, true]
    );

    res.status(201).json({
      family: newFamily,
      member: memberResult.rows[0],
    });
  } catch (err) {
    console.error("Error creating family or member:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
