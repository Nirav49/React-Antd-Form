import React, { Fragment } from "react";
import Forms2 from "./Forms2";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Select,
  Button,
  Typography,
  Layout,
  DatePicker,
  Image,
} from "antd";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 8,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 8,
    },
    sm: {
      span: 8,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Forms = () => {
  const [form] = Form.useForm();
  const { Header } = Layout;
  const { Title } = Typography;

  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };

  const dateFormat = "DD/MM/YYYY";

  const onFinish = (inputs) => {
    const {
      email,
      password,
      firstname,
      dob,
      lastname,
      phone,
      gender,
      country,
      state,
      city,
      skills,
    } = inputs;
    console.log(inputs);

    fetch("https://react-form-c8550-default-rtdb.firebaseio.com/users.json", {
      method: "POST",
      body: JSON.stringify({
        FirstName: firstname,
        LastName: lastname,
        Email: email,
        Password: password,
        Date_Of_Birth: dob,
        Phone_Number: phone,
        Gender: gender,
        Country: country,
        State: state,
        City: city,
        Skills: skills,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json() && alert("Successfully Registered");
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+91</Option>
        <Option value="87">0235</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Fragment>
      <Layout>
        <Header>
          <Title style={{ color: "white", textAlign: "center" }} level={2}>
            Form Validation
          </Title>
        </Header>
      </Layout>
      <Image
        width={200}
        style={{ marginLeft: "40vw" }}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "+91",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="firstname"
          label="Firstname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your Firstname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Lastname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your Lastname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="dob" label="DateOfBirth" {...config}>
          <DatePicker format={dateFormat} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Please select gender!",
            },
          ]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[
            {
              required: true,
              message: "Please input your Country!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="state"
          label="State"
          rules={[
            {
              required: true,
              message: "Please input your State!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[
            {
              required: true,
              message: "Please input your City!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="skills"
          label="Skills"
          rules={[
            {
              required: true,
              message: "Please input your Skills!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "50px" }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <Layout style={{textAlign: "center"}}>
        <Forms2 />
      </Layout>
    </Fragment>
  );
};

export default Forms;
