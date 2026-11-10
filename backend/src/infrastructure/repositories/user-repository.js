function createUserRepository(users){
    return{
        findAll(){
            return users;
        },
        findById(id) {
            return users.find((user) => user.id === id);
        }
    };
}
module.exports = {createUserRepository};