const User = require('../models/User'); // adapte le chemin si besoin

module.exports = async function seedUsers() {
    try {
        // === Admin ===
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.warn('ADMIN_EMAIL et ADMIN_PASSWORD_HASH non définis');
        } else {
            const existingAdmin = await User.findOne({ email: adminEmail });
            if (!existingAdmin) {
                await User.create({
                    firstName: 'Pierre',
                    lastName: 'LeBlanc',
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
                console.log('✅ Admin seedé avec succès !');
            } else {
                console.log('ℹ️ Admin déjà existant, seed ignoré.');
            }
        }

        // === Utilisateur standard ===
        const userEmail = process.env.USER_EMAIL;
        const userPassword = process.env.USER_PASSWORD;
        if (!userEmail || !userPassword) {
            console.warn('USER_EMAIL et USER_PASSWORD_HASH non définis, utilisateur non seedé');
        } else {
            const existingUser = await User.findOne({ email: userEmail });
            if (!existingUser) {
                await User.create({
                    firstName: 'Clara',         // <-- Nouveau prénom
                    lastName: 'Bernard',        // <-- Nouveau nom
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
                console.log('✅ Utilisateur seedé avec succès !');
            } else {
                console.log('ℹ️ Utilisateur déjà existant, seed ignoré.');
            }
        }
    } catch (err) {
        console.error('❌ Erreur lors du seed :', err);
    }
};