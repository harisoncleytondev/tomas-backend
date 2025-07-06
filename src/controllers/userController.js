import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';

export const createUser = async (json) => {
    let response = {};

    if (await User.findOne( {where: { email: json.email} } )) {
        response = { status: 409, message: "Email já registrado no banco de dados." }
        return response;
    }

    json.password_hash = await bcrypt.hash(json.password, await bcrypt.genSalt(10));
    delete json.password;
    //7 dias gratis
    json.subscription_expires_at = Date.now() + 7 * 24 * 60 * 60 * 1000;

    const userToCreate = User.build(json);
    await userToCreate.save();

    return response = { status: 201, message: "Conta criada com sucesso." };
}