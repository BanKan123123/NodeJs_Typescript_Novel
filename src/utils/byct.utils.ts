import * as bcrypt from 'bcrypt';

class HandlePassword {
    cryptPassword(password: string, callback: (err: Error | undefined, hash: string) => void) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return callback(err, "");

            bcrypt.hash(password, salt, function (err, hash) {
                return callback(err, hash);
            });

        });
    };

    comparePassword(plainPass: string, hashword: string, callback: (err: Error | undefined, isPasswordMatch: boolean) => void) {
        bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
            return callback(err, isPasswordMatch);
        });
    }
}

export default new HandlePassword();