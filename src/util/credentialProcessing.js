const bcrypt= require('bcrypt');

async function encrypt(value){
    const hashPwd = await bcrypt.hash(value,10);
    return hashPwd;
}

async function validate(value,hash){
    const result = bcrypt.compare(value, hash);
    return result;
}

module.exports = {
    encrypt,
    validate
}