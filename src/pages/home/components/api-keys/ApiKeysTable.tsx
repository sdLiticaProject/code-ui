import Axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useContext } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { TableRow, TableWrapper, TableCol, Icon, TableRowHeader } from './ApiKeys.styles';
import trashIcon from './static/trash.svg';
import copyIcon from './static/copy.svg';
import { ApiKeysContext } from './ApiKeysContext';

type ApiKeyType = { id: string; description: string; key: string };
type ApiKeyTypeExtended = Omit<ApiKeyType, 'key'> & { apiKey: ApiKeyType['key'] } & { handleDeleteApiKey: (id: string) => void };

function ApiKey({ id, description, apiKey, handleDeleteApiKey }: ApiKeyTypeExtended): JSX.Element {
  return (
    <TableRow>
      <TableCol>{id}</TableCol>
      <TableCol>{description}</TableCol>
      <TableCol>
        {apiKey}
        <CopyToClipboard text={apiKey}>
          <Icon style={{ marginLeft: '10px' }} src={copyIcon} />
        </CopyToClipboard>
        <Icon src={trashIcon} aria-hidden="true" onClick={() => handleDeleteApiKey(id)} />
      </TableCol>
    </TableRow>
  );
}

function ApiKeys(): JSX.Element {
  const { state: keys, update: setKeys } = useContext(ApiKeysContext);

  useEffect(() => {
    async function fetchKeys() {
      const res = await Axios.get('/api/v1/Profile/apikeys', {
        headers: {
          Authorization: `cloudToken ${Cookies.get('token')}`,
        },
      });
      setKeys(res.data.entities);
    }
    fetchKeys();
  }, []);

  const handleDeleteApiKey = async (apiKeyId: string) => {
    try {
      const res = await Axios.delete(`/api/v1/Profile/apikeys/${apiKeyId}`, {
        headers: {
          Authorization: `cloudToken ${Cookies.get('token')}`,
        },
      });
      setKeys((prev) => {
        const newState = prev.filter((key: ApiKeyType) => {
          return key.id !== apiKeyId;
        });
        return newState;
      });
    } catch (error) {
      console.log('failed to delete');
    }
  };

  if (keys.length > 0)
    return (
      <TableWrapper>
        <TableRowHeader>
          <TableCol>#</TableCol>
          <TableCol>Description</TableCol>
          <TableCol>Key</TableCol>
        </TableRowHeader>
        {keys.map((i: ApiKeyType) => {
          return <ApiKey handleDeleteApiKey={handleDeleteApiKey} id={i.id} description={i.description} key={i.id} apiKey={i.key} />;
        })}
      </TableWrapper>
    );

  return <></>;
}

export default ApiKeys;
