
const {HTTP_STATUS} = require (
    "../../common/constants/http-status"
)


function createGetUsers(userRepository){
    return {
        execute(id){

     if (!id){
  
     return userRepository.findAll();
     }
   return  userRepository.findById(id);

        }
    }
}


module.exports = { createGetUsers }