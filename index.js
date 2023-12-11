// libraries

const express = require("express");
const path = require("path");
const port = 8000;

// initialisations

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();

// app methods and middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

var contactList = [
  {
    name: "saurabh shukla",
    phoneNo: "9898989898",
  },
  {
    name: "dubes",
    phoneNo: "6262626262",
  },
  {
    name: "chandu",
    phoneNo: "8282828282",
  },
  {
    name: "shivam",
    phoneNo: "8282828282",
  },
];

// app methods

app.get("/", function (req, res) {
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("There is error in fetching data from DB");
      return;
    }

    return res.render("home", {
      title: "My Contact List",
      contact_List: contacts,
    });
  });
});

app.get("/practise", function (req, res) {
  return res.render("practise", {
    title: "My Practise",
  });
});

app.post("/create-contact", function (req, res) {
  Contact.create(
    {
      name: req.body.name,
      phoneNo: req.body.phoneNo,
    },
    function (err, newContact) {
      if (err) {
        console.log("error in creating a contact");
        return;
      }

      console.log("************", newContact);

      return res.redirect("/");
    }
  );
});

app.get("/delete-contact/", function (req, res) {
  
  // fetch id from url 

  let id = req.query.id;

  // let contactIndex = contactList.findIndex(
  //   (contact) => contact.phoneNo == phoneNo
  // );

  // if (contactIndex != -1) {
  //   contactList.splice(contactIndex, 1);
  // }

  Contact.findByIdAndDelete(id, function(err){
    if(err){
      console.log('There is error in deleting the contacts');
    }

    return res.redirect('back');
  });
  
});

app.listen(port, function (err) {
  if (err) {
    console.log("We found an error while running server", err);
  }

  console.log("server is up at port", port);
});
