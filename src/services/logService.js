import Log from '../models/logModel.js';

export const insertLog = async (user_id, action, req) => {
  let ip =
    req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  if (ip.startsWith('::ffff:')) {
    ip = ip.replace('::ffff:', '');
  }

  return await Log.create({ user_id, action, ip });
};
