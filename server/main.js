import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
//import { UsersCollection } from '/imports/api/users';

import './index'

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  // if (UsersCollection.find().count() === 0) {
  //   UsersCollection.insert({
  //   _id: "1",
  //   usename: "Shreyansh Roy",
  //   createdAt: new Date()
  // })
//}
});
