const {User, Thought} = require('../models');

const resolvers = {
    Query: {
        thoughts: async(parent, {username}) => {
            //ternary operator (if/else): check if there is such username, if there is, then return it, if not just return an empty string.
            const params = username ? {username} : {};
            return Thought.find(params).sort({createdAt: -1});
        },

        thought: async(parent,{_id}) =>{
            return Thought.findOne({_id});
        },

        users: async() =>{
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },

        user: async(parent, {username}) => {
            return User.findOne({username})
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        }
    }
};

module.exports = resolvers;