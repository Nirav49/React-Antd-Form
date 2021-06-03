import React, { Fragment, useState } from "react";
import "antd/dist/antd.css";
import { Button, Divider, Upload } from "antd";

const Forms2 = () => {
  const [edit, setEdit] = useState();

  const get = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
  };

  const getDataHandler = async () => {
    try {
      const response = await fetch(
        "https://react-form-c8550-default-rtdb.firebaseio.com/users.json"
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("something Went Wrong !.");
      }
      const loads = [];
      for (const keys in data) {
        loads.push({
          id: keys,
          First_Name: data[keys].FirstName,
          Last_Name: data[keys].LastName,
          E_mail: data[keys].Email,
          Pass_word: data[keys].Password,
          Date_of_Birth: data[keys].Date_Of_Birth,
          Phone_number: data[keys].Phone_Number,
          gender: data[keys].Gender,
          country: data[keys].Country,
          state: data[keys].State,
          city: data[keys].City,
          skills: data[keys].Skills,
        });
      }
      setEdit(loads);
      if (edit) {
        console.log(edit);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Fragment>
      <Button type="primary" onClick={getDataHandler}>
        Get Your Data
      </Button>
      <Divider orientation="middle">User Data</Divider>
      {edit &&
        edit.map((da) => {
          return (
            <div>
              <Divider orientation="middle">User :{da.id}</Divider>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                onChange={handleChange}
              >
                <img
                  src={
                    "https://media.istockphoto.com/photos/confident-young-african-man-picture-id1194667952?b=1&k=6&m=1194667952&s=170667a&w=0&h=Sp_H-3_oHXDfvNAVC1uTMCO9xh-_w4_LvZQY1j2KvEc="
                  }
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              </Upload>
              <ul key={da.id}>
                <li>First_name:{da.First_Name}</li>
                <li>Last_name:{da.Last_Name}</li>
                <li>Email:{da.E_mail}</li>
                <li>Password:{da.Pass_word}</li>
                <li>Date-of-Birth:{da.Date_of_Birth}</li>
                <li>Gender:{da.gender}</li>
                <li>Country:{da.country}</li>
                <li>state:{da.state}</li>
                <li>city:{da.city}</li>
                <li>Skills:{da.skills}</li>
              </ul>
            </div>
          );
        })}
    </Fragment>
  );
};
export default Forms2;
