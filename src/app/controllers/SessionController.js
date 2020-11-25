import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  // responsável por fazer o login do usuário
  async store(req, res) {
    try {
      const { login, password } = req.body;

      const user = await User.findOne({ login });

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      if (!(await user.compareHash(password))) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      return res.json({
        user,
        token: await user.generateToken(),
      });
    } catch (err) {
      return res.status(400).json({ error: 'User authentication failed' });
    }
  }

  async validateToken(req, res) {
    const token = req.body.token || '';
    jwt.verify(token, authConfig.secret, err => {
      return res.status(200).send({ valid: !err });
    });
  }
}

export default new SessionController();
