import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import 'dotenv/config';

export default class Utils{
  constructor(){

  }

  static async generatePasswordHash(plainText){
    try {
      const saltRounds = 10;
      return await bcrypt.hash(plainText, saltRounds);
      
    } catch (error) {
      throw error;
    }
  }

  static generateJwtToken(userDoc){
    try {
      return "Bearer " + jwt.sign({
        _id: userDoc._id,
        firstName: userDoc.firstName
      }, process.env.JWT_PRIVATE_KEY, {expiresIn: '1d'} )
    } catch (error) {
      throw error;
    }
  }

}