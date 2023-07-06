import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const ToDoList = () => {
  const [itemIndex, setItemIndex] = useState(-1);
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState("");
  const [tasksDatabase, setTasksDatabase] = useState([
    {
      taskTitle: "Javascript",
      taskStatus: "1",
      checkComplete: false,
      createdOn: new Date(),
      id: Math.random(),
    },
    {
      taskTitle: "Reactjs",
      taskStatus: "1",
      checkComplete: false,
      createdOn: new Date(),
      id: Math.random(),
    },
    {
      taskTitle: "Asp.net",
      taskStatus: "2",
      checkComplete: true,
      createdOn: new Date(),
      id: Math.random(),
    },
    {
      taskTitle: "SQL",
      taskStatus: "1",
      checkComplete: false,
      createdOn: new Date(),
      id: Math.random(),
    },
  ]);
  const [tasks, setTasks] = useState(tasksDatabase);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(0);
  const [taskDone, setTaskDone] = useState(false);
  const [selectTaskStatus, setSelectTaskStatus] = useState("0");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    //if(tasks.length>0)
    // else {
    //     setTasks([{ title: "Abc", status: "1" },
    //     { title: "sds", status: "2" }])
    // }
  }, [tasks]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleAddTask = () => {
    setMode("Add");
    toggleModal();
    setTitle("");
    setStatus("0");
  };

  const handleEditTask = (e, key) => {
    setMode("Edit");
    let record = tasks[key];
    console.log(record);
    setTitle(record.taskTitle);
    setStatus(record.taskStatus);
    setItemIndex(key);
    toggleModal();
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 6000);
  }, [errorMessage]);

  const checkData = () => {
    if (title == "") {
      setErrorMessage("Please enter title");
      return false;
    } else if (status == "0") {
      setErrorMessage("Please select status");
      return false;
    }
    return true;
  };

  const handleSaveTask = () => {
    if (checkData()) {
      if (mode == "Edit") {
        let records = [...tasks];
        records[itemIndex].taskTitle = title;
        records[itemIndex].taskStatus = status;
        records[itemIndex].checkComplete = status === "2" ? true : false;
        setTasks([...records]);
        setTasksDatabase([...records]);
      } else {
        let newTaskItem = [
          {
            taskTitle: title,
            taskStatus: status,
            checkComplete: status === "2" ? true : false,
            createdOn: new Date(),
          },
        ];
        setTasks([...tasks, ...newTaskItem]);
        setTasksDatabase([...tasksDatabase, ...newTaskItem]);
      }

      setModal(false);
    }
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChange = (e, key) => {
    setTaskDone(e.target.checked);
    let records = [...tasks];
    if (e.target.checked) {
      records[key].taskStatus = "2";
      records[key].checkComplete = true;
    } else {
      records[key].taskStatus = "1";
      records[key].checkComplete = false;
    }

    setTasks([...records]);
  };

  const handleSelectTaskStatus = (e) => {
    setSelectTaskStatus(e.target.value);

    filterTasks(e.target.value);
  };

  const filterTasks = (val) => {
    if (val === "0") {
      setTasks(tasksDatabase);
    } else {
      let filteredTaskNew = tasksDatabase.filter((task) => {
        return task.taskStatus === val;
      });
      setTasks([...filteredTaskNew]);
    }
  };

  const handleDeleteTask = (e, key) => {
    let deletedTask = tasksDatabase.filter((task) => task.id !== key);
    if (selectTaskStatus != "0") {
      let filteredTaskNew = deletedTask.filter((task) => {
        return task.taskStatus === selectTaskStatus;
      });
      setTasks([...filteredTaskNew]);
    } else {
      setTasks([...deletedTask]);
    }
    setTasksDatabase(deletedTask);
  };

  Date.prototype.toShortFormat = function () {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = this.getDate();

    const monthIndex = this.getMonth();
    const monthName = monthNames[monthIndex];

    const year = this.getFullYear();
    const hour = this.getHours();
    const minutes = this.getMinutes();

    return `${hour}:${minutes} ${day}-${monthName}-${year}`;
  };

  return (
    <div className="container w-50">
      <h3 className="text-center my-2">To Do List</h3>
      <Row>
        <Col md={4}>
          <Button variant="primary" className="py-0" onClick={handleAddTask}>
            ADD
          </Button>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
          <Form.Select
            className="py-0"
            value={selectTaskStatus}
            onChange={handleSelectTaskStatus}
          >
            <option value={"0"}>All</option>
            <option value={"1"}>Incompleted Task</option>
            <option value={"2"}>Completed Task</option>
          </Form.Select>
        </Col>
      </Row>
      {tasks.length > 0 ? (
        <ul className="list-group p-0 mt-2">
          {tasks.map((item, key) => (
            <li className="list-group-item py-1" key={`li${key}`}>
              <Row>
                <Col md={1}>
                  <Form.Check
                    type="checkbox"
                    key={`chk${key}`}
                    onChange={(e) => handleChange(e, key)}
                    className="align-middle"
                    checked={item.checkComplete}
                  />
                </Col>
                <Col md={10}>
                  <div className="fw-bold" key={`status${key}`}>
                    {item.taskStatus == 2 ? (
                      <del>{item.taskTitle}</del>
                    ) : (
                      item.taskTitle
                    )}
                  </div>
                  <div
                    style={{ fontSize: "11px", fontStyle: "italic" }}
                    key={`created${key}`}
                  >
                    {item.createdOn.toLocaleString()}
                  </div>
                </Col>
                <Col md={1}>
                  <div className="d-flex flex-row justify-content-center">
                    <div
                      className="m-1 pointer"
                      key={`delete${key}`}
                      onClick={(e) => handleDeleteTask(e, item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                      </svg>
                    </div>
                    <div
                      className="m-1 pointer"
                      key={`update${key}`}
                      onClick={(e) => handleEditTask(e, key)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-file-check"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"></path>
                        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"></path>
                      </svg>
                    </div>
                  </div>
                </Col>
              </Row>
            </li>
          ))}{" "}
        </ul>
      ) : (
        <h6 className="text-center my-3">No Tasks Found</h6>
      )}

      <Modal show={modal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{mode} Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div style={{ color: "red", textAlign: "center" }}>{errorMessage}</div>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={handleTitle}
                placeholder="Enter Title"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select onChange={handleStatus} value={status}>
                <option value="0">Select Task</option>
                <option value="1">Incompleted Task</option>
                <option value="2">Completed Task</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveTask}>
            {mode} Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ToDoList;
