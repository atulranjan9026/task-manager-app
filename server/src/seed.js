const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Task = require('./models/Task');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log('Cleared existing data');

    // Create test users
    const users = [
      {
        email: 'test1@example.com',
        password: 'password123'
      },
      {
        email: 'test2@example.com',
        password: 'password123'
      }
    ];

    const createdUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return User.create({
          email: user.email,
          password: hashedPassword
        });
      })
    );
    console.log('Created test users');

    // Create sample tasks for each user
    const tasks = [
      {
        title: 'Complete Project Documentation',
        description: 'Write comprehensive documentation for the project',
        priority: 'High',
        status: 'incomplete'
      },
      {
        title: 'Code Review',
        description: 'Review team members\' code submissions',
        priority: 'Medium',
        status: 'complete'
      },
      {
        title: 'Update README',
        description: 'Update project README with latest changes',
        priority: 'Low',
        status: 'incomplete'
      }
    ];

    await Promise.all(
      createdUsers.map(async (user) => {
        const userTasks = tasks.map(task => ({
          ...task,
          userId: user._id
        }));
        return Task.insertMany(userTasks);
      })
    );
    console.log('Created sample tasks');

    console.log('Seed data created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData(); 