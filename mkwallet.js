var lightwallet = require("eth-lightwallet");

if (!process.argv[2]) {
    console.log('Usage: ' + process.argv[1] + ' <password>');
    console.log('Creates a new lightwallet with given password');
    process.exit();
}

var password = process.argv[2];

lightwallet.keystore.createVault({
    password: password,
    seedPhrase: lightwallet.keystore.generateRandomSeed(),
    hdPathString: "m/0'/0'/0'"
}, function (err, ks) {

    ks.keyFromPassword(password, function (err, pwDerivedKey) {
        if (!ks.isDerivedKeyCorrect(pwDerivedKey)) {
            throw new Error("Incorrect derived key!");
        }

        try {
            ks.generateNewAddress(pwDerivedKey, 1);
        } catch (err) {
            console.log(err);
            console.trace();
        }
        var addresses = ks.getAddresses();
        var address = addresses[0];
        var prv_key = ks.exportPrivateKey(address, pwDerivedKey);

        // Public key is already part of the address
        var pub_key = address;

        console.log('Keystore JSON:', ks.serialize());
        console.log('Address:', address);
        console.log('Private Key:', prv_key);
        console.log('Public Key:', pub_key);
    });
});
