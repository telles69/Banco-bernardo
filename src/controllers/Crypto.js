const crypto = require('crypto');

const algorithm = "aes-256-cbc";
const key = Buffer.from('3f8b29cde17245a8c76de9812af34bd92e7180fa4cb6d1f07246b8cf1039a71d', 'hex');
const iv = Buffer.from('e5f9327b8ca146f3dc92b7e80c4f53ad', 'hex');

function encrypt(text){
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted; 
}

export default encrypt;