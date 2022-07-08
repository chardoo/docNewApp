import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const hashAccessToken = async (token: string): Promise<string> => {
  const hashedToken = await bcrypt.hash(token, 12);
  return hashedToken;
};
const generateUserAccessToken = async (password:string): Promise<{
  accessToken: string;
  hashedToken: string;
}> => {
  const data = password;
  const accessToken = data
  const hashedToken = await hashAccessToken(accessToken);
  return { accessToken, hashedToken };
};

const checkAccessToken = async (accessToken: string, hashedToken: string): Promise<boolean> => {
  const isValid = await bcrypt.compare(accessToken, hashedToken);
  return isValid;
};

export default { generateUserAccessToken, checkAccessToken };
