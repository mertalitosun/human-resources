
const Users = require("../models/users");
const Roles = require("../models/roles");

const bcrypt = require("bcrypt");


const dummyData = async () => {
    const roleCount = await Roles.count();
    if (roleCount === 0) {
        await Roles.bulkCreate([
            { name: "Admin" },
            { name: "İnsan Kaynakları" },
            { name: "3. Parti Firma Kullanıcısı" },
        ]);
    }
};

module.exports = dummyData;