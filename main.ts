#! usr/bin/env node
import inquirer from "inquirer";

// define a the studnt class
class student{
    static counter = 1000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string){
        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }

    //metod to enroll a student is a course

    enroll_course(course: string){
        this.courses.push(course);
    }

    // method to view a student balance

    view_balance(){
        console.log(`balance for ${this.name} : ${this.balance}`);
    }

    // mehtod to pay student fees

    pay_fees(amount: number){
        this.balance -= amount;
        console.log(`${amount} fees paid successfully for ${this.name}`);
    }

    // mehtod to show student status

    show_status(){
        console.log(`id: ${this.id}`);
        console.log(`name: ${this.name}`);
        console.log(`courses: ${this.courses}`);
        console.log(`balance: ${this.balance}`);
    }
}

//define a student manager class to manage students

class student_manager {
students: student[]
constructor(){
    this.students = []
}

//mehtod to add new student 

add_student(name: string){
   let Student = new student(name);
   this.students.push(Student);
   console.log(`student: ${name} added successfully. student id: ${Student.id}`);
}
enroll_student(student_id: number, course: string){
    let student = this.find_student(student_id);
    if (student){
        student.enroll_course(course);
        console.log(`${student.name} enrollled in ${course} successfully`);
    }
}
    view_student_balance(student_id: number){
        let student = this.find_student(student_id);
        if (student){
            student.view_balance();
        }
        else{
            console.log("student not found please enter a correct student id.")
        }
    }
    pay_student_fees(student_id: number, amount: number){
        let student = this.find_student(student_id);
        if (student){
            student.pay_fees(amount);
        }
        else{
            console.log("student not found please enter a correct student id")
        }
    }

    show_student_status(student_id: number){
        let student = this.find_student(student_id);
        if (student){
            student.show_status();
        }
    }

    find_student(student_id: number){
        return this.students.find(std => std.id === student_id);
    }
}

async function main() {
    console.log("welcome to student management system");
    console.log("-".repeat(50));
    let Student_manager = new student_manager();
    
    while(true){
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "select an option",
                choices: ["add student", "enroll student", "view student balance", "pay fees", "show status", "exit"]
            }
        ]);

        switch(choice.choice){
            case "add student":
            let name_input = await inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "enter a student name",
                    }
                
            ]);
            Student_manager.add_student(name_input.name);
            break;

            case "enroll student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter a student id",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "enter a course name",
                    }
                ]);
            Student_manager.enroll_student(course_input.student_id, course_input.course);
            break;
        
            case "view student balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter a student id",
                    }
                ]);
                Student_manager.view_student_balance(balance_input.student_id)
                break;

            case "pay fees":
                let fees_input =await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter a student id",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "enter the amount to pay",
                    }
                ]);
        Student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
        break;

    case "show status":
        let status_input = await inquirer.prompt([
            {
                name: "student_id",
                type: "number",
                message: "enter a student id"
            }
        ]);
        Student_manager.show_student_status(status_input.student_id);
        break;
        case "exit":
            console.log("exiting.");
            process.exit();
        }
    }}
    main();