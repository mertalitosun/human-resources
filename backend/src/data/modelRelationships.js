const Users = require("../models/users");
const Roles = require("../models/roles");
const Workers = require("../models/workers");
const Documents = require("../models/documents");
const Notifications = require("../models/notifications");



Users.belongsTo(Roles, { foreignKey: 'roleId' });
Roles.hasMany(Users, { foreignKey: 'roleId' });

Documents.belongsTo(Workers, { foreignKey: 'workerId', onDelete:"CASCADE" });
Workers.hasMany(Documents, { foreignKey: 'workerId', onDelete:"CASCADE" });

Workers.belongsTo(Users, { as: 'AddedBy', foreignKey: 'addedById' });
Users.hasMany(Workers, { as: 'AddedWorkers', foreignKey: 'addedById' });


Documents.belongsTo(Users, { as: 'UploadedBy', foreignKey: 'uploadedById' });
Users.hasMany(Documents, { as: 'UploadedDocuments', foreignKey: 'uploadedById' });

Documents.belongsTo(Users, { as: 'ApprovedBy', foreignKey: 'approvedById' });
Users.hasMany(Documents, { as: 'ApprovedDocuments', foreignKey: 'approvedById' });



Notifications.belongsTo(Users, { foreignKey: 'userId' });
Users.hasMany(Notifications, { foreignKey: 'userId' });

Notifications.belongsTo(Documents, { foreignKey: 'documentId' });
Documents.hasMany(Notifications, { foreignKey: 'documentId' });