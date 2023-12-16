const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // getSingleUser query
    async getSingleUser(_, { id }) {
      return await User.findById(id).populate('savedBooks');
    },
  },

  Mutation: {
    // createUser mutation
    async createUser(_, { username, email, password }) {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // login mutation
    async login(_, { email, password }) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    // saveBook mutation
    async saveBook(_, { userId, bookData }) {
      return await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { savedBooks: bookData } },
        { new: true, runValidators: true }
      );
    },

    // deleteBook mutation
    async deleteBook(_, { userId, bookId }) {
      return await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
