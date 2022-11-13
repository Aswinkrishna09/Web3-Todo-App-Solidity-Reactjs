import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Form,
  Input,
  Popconfirm,
  Row,
  Space,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ethers } from "ethers";
import { TaskContractAddress } from "./config";
import TaskAbi from "./TaskContract.json";

function Todo() {
  const [form] = Form.useForm();
  const [todo, setTodo] = useState({
    taskText: "",
    isDeleted: false,
  });
  useEffect(() => {
    getTodos();
  }, []);

  const [todos, setTodos] = useState([]);
  const addTodo = async (e) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log(ethers);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );
        console.log("adding todo....... ", todo.taskText, " ", todo.isDeleted);
        await TaskContract.addTask(todo.taskText, todo.isDeleted);
        let res = await TaskContract.getAllTasks();
        console.log("tasks ", res);
        setTodos(res);
        form.setFieldsValue({
          todoinp: "",
        });
      } else {
        console.log("Ethereum object didn't find");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTodos = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log(ethers);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );
        let res = await TaskContract.getAllTasks();
        console.log("tasks ", res);
        setTodos(res);
      } else {
        console.log("Ethereum object didn't find");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTodo = async (id) => {
    console.log(id)
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log(ethers);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );
        await TaskContract.deleteTask(id, true);
        console.log("deleted");
        let res = await TaskContract.getAllTasks();
        console.log("tasks ", res);
        setTodos(res);
      } else {
        console.log("Ethereum object didn't find");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Col span={16}>
        <Row style={{ margin: "10px" }} justify="space-between">
          <Col span={8}>
            <h1>Todo App</h1>
          </Col>
          <Col span={16}>
            <Row justify="end">
              <Space>
                <Badge status="success" text="Completed" />
                <Badge status="warning" text="Pending" />
              </Space>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={16}>
        <Form form={form} onFinish={addTodo}>
          <Form.Item
            name="todoinp"
            rules={[
              {
                required: true,
                message: "Please input your todo!",
              },
            ]}
          >
            <Input
              className="todo-inp"
              name="edittodoinp"
              placeholder="Please enter todos"
              value={todo.text}
              onChange={(e) => {
                setTodo((prev) => ({ ...prev, taskText: e.target.value }));
              }}
            />
          </Form.Item>
        </Form>
      </Col>
      <Col style={{ margin: "15px" }} span={16}>
        {todos.map((e, i) => (
          <Col key={e.taskId} span={24} style={{ margin: "10px" }}>
            <Alert
              message={e.taskText}
              type={"success"}
              showIcon
              action={
                <React.Fragment>
                  <Popconfirm
                    title="Are you sure to delete this todo?"
                    onConfirm={() => {
                      // setTodos(todos.filter((evt, ind) => ind !== i));
                      deleteTodo(e.taskId);
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button size="small" type="text">
                      <DeleteOutlined />
                    </Button>
                  </Popconfirm>
                </React.Fragment>
              }
            />
          </Col>
        ))}
      </Col>
    </React.Fragment>
  );
}

export default Todo;
