const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Password is required');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.9t45w1v.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

mongoose.connect(url);

if (process.argv.length === 3) {
  console.log('phonebook: ');
  Person.find({}).then((people) => {
    people.forEach((person) => console.log(person));
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then(() => {
    mongoose.connection.close();
  });
}
