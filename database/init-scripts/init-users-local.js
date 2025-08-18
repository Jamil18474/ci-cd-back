/**
 * MongoDB initialization script for admin user
 * Creates default administrator account if it doesn't exist
 * Ajoute aussi un utilisateur de test si non existant
 */
db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

db.createCollection('users');

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const userEmail = process.env.USER_EMAIL;
const userPassword = process.env.USER_PASSWORD;

if (!adminEmail || !adminPassword) {
    print('❌ ADMIN_EMAIL and ADMIN_PASSWORD_HASH required');
    quit(1);
}

if (!userEmail || !userPassword) {
    print('❌ USER_EMAIL AND USER_PASSWORD_HASH required');
    quit(1);
}

// Création de l'admin
const existingAdmin = db.users.findOne({ email: adminEmail });

if (!existingAdmin) {
    const result = db.users.insertOne({
        firstName: 'Marie',
        lastName: 'Dubois',
        email: adminEmail,
        password: adminPassword,
        birthDate: new Date('1990-01-01'),
        city: 'Lyon',
        postalCode: '69001',
        role: 'admin',
        permissions: ['read', 'delete'],
        createdAt: new Date(),
        updatedAt: new Date()
    });

    if (result.acknowledged) {
        print('✅ Admin user created');
    }
}

// Création d'un utilisateur de test
const existingUser = db.users.findOne({ email: userEmail });

if (!existingUser) {
    const result = db.users.insertOne({
        firstName: 'Lucas',
        lastName: 'Martin',
        email: userEmail,
        password: userPassword,
        birthDate: new Date('1998-05-15'),
        city: 'Bordeaux',
        postalCode: '33000',
        role: 'user',
        permissions: ['read'],
        createdAt: new Date(),
        updatedAt: new Date()
    });

    if (result.acknowledged) {
        print('✅ Test user created');
    }
}