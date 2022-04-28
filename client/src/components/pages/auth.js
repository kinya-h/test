class Auth{
    constructor(){
        this.authenticated = false
    }

    login(cb){
        this.authenticated= true
        cb()
    }


    logout(cb){
        this.authenticatedh = false
    }


    isauthenticated(){
        return this.authenticated
    }
}
export default new Auth()