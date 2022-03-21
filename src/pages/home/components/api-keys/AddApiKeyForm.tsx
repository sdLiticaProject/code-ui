import Axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useContext } from "react";
import { FormWrapper, FormTitle, GenerateBtn, Input } from "./ApiKeys.styles";
import { ApiKeysContext } from "./ApiKeysContext";

function AddApiKeyForm(): JSX.Element {
  const [description, setDescription] = useState("");
  const { state: keys, update: setKeys } = useContext(ApiKeysContext);
  const handleAddApiKey = async () => {
    try {
      const res = await Axios.post(
        "/api/v1/Profile/apikeys",
        {
          description,
        },
        { headers: { Authorization: `cloudToken ${Cookies.get("token")}` } },
      );
      setDescription("");
      const result = [...keys, res.data.entity] as any;
      setKeys(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormWrapper>
      <FormTitle>Description</FormTitle>
      <Input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="Please add description for the new API key"
      />
      <GenerateBtn onClick={() => handleAddApiKey()}>Generate</GenerateBtn>
    </FormWrapper>
  );
}

AddApiKeyForm.propTypes = {};

export default AddApiKeyForm;
