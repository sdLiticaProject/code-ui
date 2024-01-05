import React from "react";
import styled from "styled-components";

const NewDashboardForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  background-color: #f7f7f7;
  border-radius: 5px;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 70px;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #3f88c5;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;


const NewForm = (data): JSX.Element => {

    return (
        <NewDashboardForm>
            <Title>{data.title}</Title>
            {data.labels.map(label => (
                <>
                    <Label>{label.name}</Label>
                    <Input type={label.type} placeholder={label.placeholder} />
                </>
            ))}
            <Button>Create</Button>
        </NewDashboardForm>
    );
}

export default NewForm;