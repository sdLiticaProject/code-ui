/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

export function createCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    state: defaultValue,
    update: defaultUpdate,
  });
  function Provider(props: React.PropsWithChildren<Record<string, unknown>>) {
    const [state, update] = React.useState(defaultValue);
    return <ctx.Provider value={{ state, update }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const [ctx, provider] = createCtx([]);
export const ApiKeysContext = ctx;
export const ApiKeysProvider = provider;
