function createGetPosts(postRepository) {

    return {
        execute(userId) {

           if (!userId){
        
    return postRepository.findAll();
           }
     return postRepository.findByUserId(userId);
   
        }
    };

}

module.exports = { createGetPosts };