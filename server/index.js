//import { UsersCollection } from '/imports/api/users';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    postData: function(username, email, password, Role, date) {
        try{
          console.log("back-end",username, email, password, Role, date);
          //Meteor.users.insert({username: username, email: email, password: password, Role: Role, createdAt: new Date()});
          Accounts.createUser({
            username: username,
            password: password,
            email: email,
            date: date,
            Role: Role
        });
            return data;
        }
        catch(error){
            return error;
        }
    },

    getData: function(){
        const data = Meteor.users.find({}, { sort: { createdAt: -1 } }).fetch();
        console.log(data)
        return data;
    },

    getFindData: function(value1, value2){
        let data;
        if(value1){
             data = Meteor.users.find({"username":{$regex:`${value1 }`,$options:"$i"}}).fetch();
        }
        else{
             data = Meteor.users.find({"emails.address":{$regex:`${value2 }`,$options:"$i"}}).fetch();
        }

        console.log("found data",data);
        return data;
    },
})