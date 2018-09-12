var {createCipheriv, createDecipheriv, randomBytes} = require('crypto'),

    algorithm = 'aes-256-ctr',
    key = process.env.KEY || 'b2df428b9929d3ace7c598bbf4e496b2';

function encrypt(text){
    const iv = new Buffer(randomBytes(16)); //random 16 digit values are generated every time
    const cipher = createCipheriv(algorithm, key, iv);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return `${iv.toString('hex')}:${crypted.toString()}`;
}
 
function decrypt(text){
  const textParts = text.split(':');

  //extract the IV from the first half of the value
  const IV = new Buffer(textParts.shift(), 'hex');

  //extract the encrypted text without the IV
  const encryptedText = new Buffer(textParts.join(':'), 'hex');

  //decipher the string
  const decipher = createDecipheriv(algorithm, key, IV);
  let decrypted = decipher.update(encryptedText,  'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted.toString();
}

module.exports = { decrypt, encrypt };