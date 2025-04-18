import { Command, program } from "commander";
import fs, { readFileSync } from "fs";
import { readFile } from "fs/promises";
const commander = new Command();

program.option("-c");

program
  .name("cli-todo")
  .description("A CLI for managing your todo list")
  .version("1.0.0");

program
  .command("add")
  .description("Add a Todo in your file")
  .argument("<todo>", "Todo to add")
  .action((todo) => {
    let todos = [];

    if (fs.existsSync("todo.json")) {
      const data = fs.readFileSync("todo.json", "utf-8");
      todos = JSON.parse(data).todos;
    }

    todos.push({ todo });

    fs.writeFile("todo.json", JSON.stringify({ todos }, null, 2), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Todo added: ${todo}`);
      }
    });
  });

program
  .command("list")
  .description("List all Todos")
  .action(() => {
    const data = fs.readFileSync("todo.json", "utf-8");
    const todos = JSON.parse(data).todos;
    console.log(todos);
  });

program
  .command("delete")
  .description("Delete a Todo")
  .argument("<index>", "Index of the Todo to delete")
  .action((index) => {
    const data = readFileSync("todo.json", "utf-8");
    const todos = JSON.parse(data).todos;
    if (index >= 0 && index < todos.length) {
      todos.splice(index, 1);
      fs.writeFileSync(
        "todo.json",
        JSON.stringify({ todos }, null, 2),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Todo deleted: ${index}`);
          }
        }
      );
    } else {
      console.log("Invalid index");
    }
  });

program.parse(process.argv);
