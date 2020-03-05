const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// The project must have the these classes: `Employee`, `Manager`, `Engineer`
let role = ["manager", "engineer", "intern"];
let bodycounts = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function promptUser() {
    
    return inquirer.prompt([
        {
            type:"list",
            message:"What is your role?",
            choices: role,
            name: "role"
        },
        {
            message:"what is your name?",
            name:"name"
        },
        {
            message:"What is your employee id?",
            name:"id"
        },
        {
            message:"What is your email?",
            name:"email"
        },
        
    ])
    .then(function(data) {
        console.log(data);
        if (data.role === "manager") {
            inquirer.prompt([
                {
                    message:"What is your office number?",
                    name:"officenumber"
                } 
            ]).then(function(extraData){
                let newManager = new Manager(data.name, data.id, data.email, extraData.officenumber);
                bodycounts.push(newManager);
                writeFile();
            })
        } else if (data.role === "engineer") {
            inquirer.prompt([
                {
                    message:"What is your GitHub username",
                    name:"github"
                }
            ]).then(function(extraData){
                let newEngineer = new Engineer(data.name, data.id, data.email, extraData.github);
                bodycounts.push(newEngineer);
                writeFile();
            })
        } else if (data.role === "intern") {
            inquirer.prompt([
                {
                    message:"What school did you attend to?",
                    name:"school"
                }
            ]).then(function(extraData){
                let newIntern = new Intern(data.name, data.id, data.email, extraData.school);
                bodycounts.push(newIntern);
                writeFile();
            })
        }
        
    })
        
}

// The project must generate a `team.html` page in the `output` directory, that displays a nicely formatted team roster. Each team member should display the following in no particular order:

//   * Name

//   * Role

//   * ID

//   * Role-specific property (School, link to GitHub profile, or office number)


promptUser();
function writeFile(){
    fs.writeFile("team.html", render(bodycounts), function(err) {
        if (err) throw err;
    })
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```