import User from '../models/User';

class UserController {
  async store(req, res) {
    const { login } = req.body;
    try {
      if (await User.findOne({ login })) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }
      const user = await User.create(req.body);
      return res.json({ user });
    } catch (err) {
      return res.status(400).json({ error: req.body });
    }
  }
}

export default new UserController();
