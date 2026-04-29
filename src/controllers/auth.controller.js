const userRepository = require("../repository/user.repository");

// POST /api/auth/register — cria um novo usuário
const register = async (req, res) => {
  try {
    const { nome, email, senha, idade } = req.body;

    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ message: "nome, email e senha são obrigatórios" });
    }

    const existente = await userRepository.findByEmail(email);
    if (existente) {
      return res.status(409).json({ message: "Email já cadastrado" });
    }

    // TODO: aplicar hash na senha (bcrypt) antes de persistir
    const user = await userRepository.save({ nome, email, senha, idade });

    res.status(201).json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      idade: user.idade,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao registrar usuário",
      error: error.message,
    });
  }
};

// POST /api/auth/login — autentica um usuário existente
const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res
        .status(400)
        .json({ message: "email e senha são obrigatórios" });
    }

    const user = await userRepository.findByEmail(email);

    if (!user || user.senha !== senha) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // TODO: gerar e retornar JWT
    res.status(200).json({
      id: user.id,
      nome: user.nome,
      email: user.email,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao fazer login", error: error.message });
  }
};

module.exports = { register, login };
