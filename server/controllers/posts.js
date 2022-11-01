module.exports = {
    getAllPosts :(req, res) => {
        console.log('getting posts')
    },
    getCurrentUserPosts: (req, res) => {
        console.log('getting users posts')
    }, 
    addPost: (req, res) => {
        console.log('adding a post')
    }, 
    editPost: (req, res) => {
        console.log('editing post')
    }, 
    deletePost: (req, res) => {
        console.log('deleting a post')
    }
}