const analiseRepository = require("../repository/analise.repository");
const userRepository = require("../repository/user.repository");

// Busca o usuário pelo userId recebido em query e anexa a última análise dele.
const getProfile = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId é obrigatório" });
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const ultimaAnalise = await analiseRepository.findLatest(userId);

    res.status(200).json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      idade: user.idade,
      ultimaAnalise,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar perfil", error: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userRepository.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const analises = await analiseRepository.findAllByUser(id);

    res.status(200).json(analises);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar histórico", error: error.message });
  }
};

// Retorna um usuário pelo id da rota com a lista completa de análises.
const getById = async (req, res) => {
  try {
    const user = await userRepository.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar usuário", error: error.message });
  }
};

module.exports = { getProfile, getById, getHistory };
