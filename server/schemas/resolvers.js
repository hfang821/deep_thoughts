const {User, Thought} = require('../models');
const { AuthenticationError } = require('apollo-server-express');

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
    },

    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);

            return user;
        },

        login: async(parent, {email, password}) => {
            const user = await User.findOne({email});
            
            if(!user){
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                throw new AuthenticationError('Incorrect Credentials');
            }

            return user;
        }
    }
};

module.exports = resolvers;