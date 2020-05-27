const crypto = require('crypto');

const utils = {
    md5(password) {
        const md5_hash = crypto.createHash('md5');
        md5_hash.update(password);
        return md5_hash.digest('hex')
    }
}
module.exports = utils
