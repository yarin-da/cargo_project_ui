# Cargo Optimizer UI

This repository is only part of the Cargo Optimizer project. 

The UI is written in javascript (React framework).

---

## Two Main Parts

There are two main parts for this codebase: gathering input from the user and viewing the server's output.

### First Part: Input Gathering

There are 2 ways to get the user's input:

1. Files: the user can upload a file with his inputs. We accepts two formats: CSV and JSON.
2. Manual: the user can add packages manually with a datagrid and forms.

### Second Part: Solution View

We use variants of `three.js` in React to view the solution in 3D. We also let the user edit the solution to his liking and exporting to a file.

---

## Links

[Youtube Video](https://youtu.be/Zvjm5s7ZOZs)

[Website](https://cargo-optimizer.herokuapp.com/)
