import Axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";
import type { FunctionComponent } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Icon, TableCol, TableRow, TableRowHeader, TableWrapper } from "./ApiKeys.styles";
import trashIcon from "./static/trash.svg";
import copyIcon from "./static/copy.svg";
import { ApiKeysContext } from "./ApiKeysContext";

type ApiKeyType = {
  id: string;
  description: string;
  key: string;
};

type ApiKeyTypeExtended = Omit<ApiKeyType, "key"> & { apiKey: ApiKeyType["key"] } & {
  handleDeleteApiKey: (id: string) => void;
};

const ApiKey: FunctionComponent<ApiKeyTypeExtended> = ({
  id,
  description,
  apiKey,
  handleDeleteApiKey,
}) => {
  return (
    <TableRow>
      <TableCol>{id}</TableCol>
      <TableCol>{description}</TableCol>
      <TableCol>
        {apiKey}
        <CopyToClipboard text={apiKey}>
          <Icon style={{ marginLeft: "10px" }} src={copyIcon} />
        </CopyToClipboard>
        <Icon src={trashIcon} aria-hidden="true" onClick={() => handleDeleteApiKey(id)} />
      </TableCol>
    </TableRow>
  );
};

const ApiKeys: FunctionComponent = () => {
  const { state: keys, update: setKeys } = useContext(ApiKeysContext);

  useEffect(() => {
    async function fetchKeys() {
      const res = await Axios.get("/api/v1/Profile/apikeys", {
        headers: {
          Authorization: `cloudToken ${Cookies.get("token")}`,
        },
      });
      setKeys(res.data.entities);
    }
    fetchKeys();
  }, [setKeys]);

  const handleDeleteApiKey = async (apiKeyId: string) => {
    try {
      await Axios.delete(`/api/v1/Profile/apikeys/${apiKeyId}`, {
        headers: {
          Authorization: `cloudToken ${Cookies.get("token")}`,
        },
      });

      setKeys((prev) => {
        return prev.filter((key: ApiKeyType) => key.id !== apiKeyId);
      });
    } catch (error) {
      console.error("failed to delete");
    }
  };

  return (
    <>
      {keys.length > 0 && (
        <TableWrapper>
          <TableRowHeader>
            <TableCol>#</TableCol>
            <TableCol>Description</TableCol>
            <TableCol>Key</TableCol>
          </TableRowHeader>
          {keys.map((i: ApiKeyType) => {
            return (
              <ApiKey
                handleDeleteApiKey={handleDeleteApiKey}
                id={i.id}
                description={i.description}
                key={i.id}
                apiKey={i.key}
              />
            );
          })}
        </TableWrapper>
      )}
    </>
  );
};

export default ApiKeys;
