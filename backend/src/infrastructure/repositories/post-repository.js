function createPostRepository(posts){
    return{
        findAll(){
            return posts;
        },
        findByUserId(userId) {
            return  posts.filter((post) => post.user_id === userId);
        },
        create(postC){
            posts.push(postC)
            return postC;
        }
    };
}
module.exports = {createPostRepository};