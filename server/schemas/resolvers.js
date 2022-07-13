const {User, Thought} = require('../models');

const resolvers = {
    Query: {
        thoughts: async(parent, {username}) => {
            //ternary operator (if/else): check if there is such username, if there is, then return it, if not just return an empty string.
            const params = username ? {username} : {};
            return Thought.find(params).sort({createdAt: -1});
        }
    }
};

module.exports = resolvers;