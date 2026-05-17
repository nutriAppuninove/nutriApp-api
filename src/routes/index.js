const { Router } = require("express");
const controllers = require("../controllers");

const router = Router();

// Form (Home)
router.post("/insert/post", controllers.form.submit);
router.get("/result/get", controllers.form.getResult);

// User
router.get("/user/profile", controllers.user.getProfile);
router.get("/user/history/:id", controllers.user.getHistory);
router.get("/user/:id", controllers.user.getById);

// Auth
router.post("/auth/register", controllers.auth.register);
router.post("/auth/login", controllers.auth.login);

// Health
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
