import fs from "fs";
import readline from "readline";
import process from "process";
import path from "path";
let menuChoice;

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu() {
  console.log("Enter The Process You Want to Continue:");
  console.log("1. Create a Folder");
  console.log("2. Create a File");
  console.log("3. Delete a Folder");
  console.log("4. Delete a File");
  console.log("5. Re-Name a Folder/File");
  console.log("6. Write in File");
  console.log("7. Exit");
  r.question("Enter your choice\n", function (choice) {
    menuChoice = choice;
    ops(choice);
  });
}

(() => {
  menu();
})();

function ops(ch) {
  ch = parseInt(ch);

  switch (ch) {
    case 1:
      r.question(
        "Enter Path Where You want to create a Folder:\n",
        (pathName) => {
          r.question("Now Enter folder Name:\n", (folderName) => {
            if (!fs.existsSync(folderName)) {
              fs.mkdirSync(path.join(pathName, folderName));
              console.log(`${folderName} file Created`);
              menu();
            }
          });
        }
      );

      break;
    case 2:
      r.question(
        "Enter Path Where You want to create a File:\n",
        (pathName) => {
          r.question(" Now Enter file Name:\n", (fileName) => {
            if (!fs.existsSync(fileName)) {
              fs.writeFileSync(path.join(pathName, fileName), "");
              console.log(`${fileName} file Created`);
              menu();
            }
          });
        }
      );

      break;

    case 3:
      r.question("Enter Path of the Folder to Delete:\n", (pathName) => {
        r.question(" Now Enter folder Name to Delete:\n", (dir) => {
          fs.rm(path.join(pathName, dir), { recursive: true, force: true });
          menu();
        });
      });

      break;

    case 4:
      r.question("Enter Path of file to Delete:\n", (pathName) => {
        r.question(
          "Enter the FileName With Extention To delete\n",
          (delFile) => {
            console.log(delFile);
            if (fs.existsSync(path.join(pathName, delFile))) {
              fs.unlinkSync(path.join(pathName, delFile));
              console.log("File Deleted");
              menu();
            } else {
              console.log("File Does not exist");
              menu();
            }
          }
        );
      });

      break;

    case 5:
      r.question(
        "Enter Path of folder/file to Rename (Note: for file add extension too):\n",
        (pathName) => {
          r.question(
            "Enter folder/file Name to Rename (Note: for file add extension too): \n",
            (oldname) => {
              let oldPath = path.join(pathName, oldname);
              r.question("Enter New Folder Name\n", (newName) => {
                let newPath = path.join(pathName, newName);
                try {
                  fs.renameSync(oldPath, newPath);
                  console.log("Folder Name Changed");
                  menu();
                } catch (err) {
                  console.error(err);
                }
              });
            }
          );
        }
      );

      break;
    case 6:
      r.question("Enter path of file you want to Write:\n", (pathName) => {
        r.question(" Now Enter Name of the file :\n", (fileName) => {
          r.question("Enter The Content:\n", (content) => {
            console.log(content);
            try {
              let writeFilePath = path.join(pathName, fileName);
              console.log(writeFilePath);
              fs.appendFileSync(
                writeFilePath,
                content,
                { flag: "a+" },
                (err) => {
                  console.error(err);
                }
              );
            } catch (err) {
              console.error(err);
            }
            menu();
          });
        });
      });

      break;
    case 7:
      process.exit();
      break;
    default:
      console.log("Wrong Input");
      process.exit();
      break;
  }
}
