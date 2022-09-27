let taskList = []; //allthe list in entry //to use for delete fn to remove everything
let badList = []; //when you mark as bad list
const hrPerWek = 24 * 7;

const handleOnSubmit = (e) => {
  const frmData = new FormData(e);

  const task = frmData.get("task");
  const hr = +frmData.get("hr"); //+ is used here to change string to arithmatic number

  const obj = {
    task,
    hr,
  };

  //reduce method
  // const sth=reduce.(()=>{})

  const totaltaskHrs = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  const total = totaltaskHrs + hr;
  console.log(total);
  if (total > hrPerWek) {
    return alert(
      "Sorry! U don't have enough hrs to add this task for this week"
    );
  }

  taskList.push(obj);
  console.log(taskList);
  display();
  totaltaskHours();
};

const display = () => {
  let str = "";

  taskList.map((item, i) => {
    str += `
        <tr>
        <th scope="row">1</th>
        <td>${item.task}</td>
        <td>${item.hr}hr</td>
        <td>
          <button onclick="deleteItem(${i})" class="btn btn-danger">
            <i class="fa-solid fa-trash"></i>
          </button>
          <button onclick="markAsNotToDo(${i})" class="btn btn-success">
            <i class="fa-solid fa-arrow-right-long"></i>
          </button>
        </td>
      </tr>`;
  });

  document.getElementById("task-list").innerHTML = str;
  totaltaskHours();
};

const totaltaskHours = () => {
  const total = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  document.getElementById("totalHrs").innerText = total + totalBadHours();
};

//delete
const deleteItem = (i) => {
  if (!window.confirm("Are u sure u want to delete?")) {
    console.log("inside here after cancel");
    return;
  }

  const tempArg = taskList.filter((item, index) => {
    return i !== index;
  });
  taskList = tempArg;
  display();
  console.log("ok delete statement executed");
};

//moving item from left to right
const markAsNotToDo = (i) => {
  const itm = taskList.splice(i, 1)[0];
  badList.push(itm);
  displayBadList();
  display();
};
const displayBadList = () => {
  let str = "";

  badList.map((item, i) => {
    str += `
        <tr>
                  <th scope="row">${i + 1}</th>
                  <td>${item.task}</td>
                  <td>${item.hr}</td>
                  <td>
                    <button onclick="markAsToDo(${i})" class="btn btn-success">
                      <i class="fa-solid fa-arrow-left-long"></i>
                    </button>
                    <button onclick="deleteBadItem(${i})" class="btn btn-danger">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>`;
  });

  document.getElementById("bad-list").innerHTML = str;
  totaltaskHours();
  totalBadHours();
};
const totalBadHours = () => {
  // const total = badList.reduce((subTtl, item) => {
  //   return subTtl + item.hr;
  // });
  const total = badList.reduce((s, i) => s + i.hr, 0);
  document.getElementById("totalBadHrs").innerText = total;
  return total;
};

///delete bad list
//delete
const deleteBadItem = (i) => {
  if (!window.confirm("Are u sure u want to delete?")) {
    console.log("inside here after cancel");
    return;
  }

  const tempArg1 = badList.filter((item, index) => {
    return i !== index;
  });
  badList = tempArg1;
  displayBadList();
  //display();
  console.log("ok delete statement executed");
};

///moving from right to left
//moving item
const markAsToDo = (i) => {
  //alert("here in marktodo");
  const itm1 = badList.splice(i, 1)[0];
  taskList.push(itm1);
  displayBadList();
  display();
};
