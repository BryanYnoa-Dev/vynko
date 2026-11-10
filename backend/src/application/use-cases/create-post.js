function initCreatePost(userRepository, postRepository,generateId){
    return {
        execute(postData){



            if (!postData || typeof postData !== "object" || Array.isArray(postData)){
                return {
                    success: false,
                    error: "Invalid post data"
                };

            }
            if (
                typeof postData.content !=="string" || !postData.content.trim()){
                    return {
                        success:false,
                        error: "Invalid post content"
                    };
                }
            const tContent = postData.content.trim();
            const author = userRepository.findById(postData.user_id);
            

            if (!author){
                return {
                    success: false,
                    error: "User does not exist"
                };
            }
            const id = generateId();
            const newPost = {
                pId: id,
                user_id:postData.user_id,
                displayName: author.displayName,
                content: tContent
            }
            postRepository.create(newPost);
            
            return {
                success: true,
                data: newPost
            };
             
           
        }
        
    }
}

module.exports = { initCreatePost };