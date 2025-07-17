import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/* Criar usuario */
export const createUser = async (req, res) => {
  if (req.body == null) {
    return res.status(400).json({
      status: 400,
      message: 'Não foi encontrado informações para criar o usuario.',
    });
  }
  let json = req.body;

  try {
    if (await User.findOne({ where: { email: json.email } })) {
      return res.status(409).json({
        status: 409,
        message: 'Email já registrado no banco de dados.',
      });
    }

    json.password_hash = await bcrypt.hash(
      json.password,
      await bcrypt.genSalt(10)
    );
    delete json.password;
    json.subscription_expires_at = Date.now() + 7 * 24 * 60 * 60 * 1000; //7 dias gratis

    const userToCreate = User.build(json);
    await userToCreate.save();

    return res
      .status(201)
      .json({ status: 201, message: 'Conta criada com sucesso.' });
  } catch (error) {
    res.status(500).json({ status: 500, error: error});
  }
};

/* Logar usuario */
export const authUser = async (req, res) => {
  if (req.body == null) {
    return res.status(400).json({
      message: 'Não foi encontrado informações para criar o usuario.',
    });
  }

  try {
    if ((await User.findOne({ where: { email: req.body.email } })) == null) {
      return res.status(404).json({
        status: 401,
        message: 'Conta não autorizada.',
      });
    }

    const user = await User.findOne({ where: { email: req.body.email } });
    const valid = await bcrypt.compare(req.body.password, user.password_hash);
    if (!valid) {
      return res
        .status(401)
        .json({ status: 401, message: 'Conta não autorizada.' });
    }

    const jwtCode = jwt.sign(
      {
        email: user.email,
        username: user.username,
        admin: user.admin,
        preferences: user.preferences,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    return res.status(200).json({
      status: 200,
      message: 'Conta autorizada com sucesso.',
      token: jwtCode,
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error});
  }
};
