import React, { useState } from "react";
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
import {
  EditOutlined,
  FileDoneOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

function Todo() {
  const [form] = Form.useForm();
  const [todo, setTodo] = useState({
    text: "",
    status: false,
    edit: false,
  });
  const [editText, setEditText] = useState({
    text: "",
    status: false,
    edit: false,
  });
  const [todos, setTodos] = useState([]);
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
        <Form
          form={form}
          onFinish={() => {
            setTodos([todo, ...todos]);
            form.setFieldsValue({
              todoinp: "",
            });
          }}
        >
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
                setTodo((prev) => ({ ...prev, text: e.target.value }));
              }}
            />
          </Form.Item>
        </Form>
      </Col>
      <Col style={{ margin: "15px" }} span={16}>
        {todos.map((e, i) => (
          <Col span={24} style={{ margin: "10px" }}>
            {e.edit ? (
              <Input.Group compact>
                <Input
                  style={{
                    width: "calc(100% - 137px)",
                  }}
                  onChange={(e) => {
                    setEditText({
                      text: e.target.value,
                      status: e.status,
                      edit: false,
                    });
                  }}
                />
                <Button
                  disabled={editText.text.length <= 0}
                  onClick={() => {
                    let temp = [...todos];
                    for (let k = 0; k < temp.length; k++) {
                      if (k === i) temp[k] = editText;
                    }
                    setTodos(temp);
                  }}
                  type="primary"
                >
                  Save
                </Button>
                {"   "}
                <Button
                  onClick={() => {
                    let updated = todos.map((e, ind) => {
                      return ind === i ? { ...e, edit: false } : { ...e };
                    });
                    setTodos(updated);
                  }}
                  type="primary"
                >
                  Cancel
                </Button>
              </Input.Group>
            ) : (
              <Alert
                message={e.text}
                type={e.status ? "success" : "warning"}
                showIcon
                action={
                  <React.Fragment>
                    <Button
                      onClick={() => {
                        let updated = todos.map((e, ind) => {
                          return ind === i ? { ...e, edit: !e.edit } : { ...e };
                        });
                        setTodos(updated);
                      }}
                      size="small"
                      type="text"
                    >
                      <EditOutlined />
                    </Button>
                    <Button
                      onClick={() => {
                        let updated = todos.map((e, ind) => {
                          return ind === i
                            ? { ...e, status: !e.status }
                            : { ...e };
                        });
                        setTodos(updated);
                      }}
                      size="small"
                      type="text"
                    >
                      <FileDoneOutlined />
                    </Button>
                    <Popconfirm
                      title="Are you sure to delete this todo?"
                      onConfirm={() => {
                        setTodos(todos.filter((evt, ind) => ind !== i));
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
            )}
          </Col>
        ))}
      </Col>
    </React.Fragment>
  );
}

export default Todo;
