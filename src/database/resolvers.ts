import { User } from "../entities/User";

interface UserInput {
    id: number;
    name: string;
    password: string;
}  

const resolvers = {
    getUsers: async () => {
        return await User.find();
    },

    getUser: async ({ id }: { id: number }) => {
        return await User.findOne({
            where: { id: id }
        });
    },

    createUser: async ({ name, password }: UserInput) => {
        const newUser = new User();
        newUser.name = name;
        newUser.password = password;
        return await newUser.save();
    },

    updateUser: async ({ id, name, password }: UserInput) => {
        const userToUpdate = await User.findOne({
            where: { id: id }
        });
        if (!userToUpdate) {
            throw new Error('User not found');
        }
        userToUpdate.name = name || userToUpdate.name;
        userToUpdate.password = password || userToUpdate.password;
        return await userToUpdate.save();
    },

    deleteUser: async ({ id }: { id: number }) => {
        const userToDelete = await User.findOne({
            where: { id: id }
        });
        if (!userToDelete) {
            throw new Error('User not found');
        }
        await userToDelete.remove();
        return id;
    },
};

export default resolvers;