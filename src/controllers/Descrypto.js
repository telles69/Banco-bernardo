const crypto = require('crypto');

const algorithm = "aes-256-cbc";
const key = Buffer.from('3f8b29cde17245a8c76de9812af34bd92e7180fa4cb6d1f07246b8cf1039a71d', 'hex');
const iv = Buffer.from('e5f9327b8ca146f3dc92b7e80c4f53ad', 'hex');

function decrypt(Text) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(Text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export default decrypt; 