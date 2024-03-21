import React from "react";
import {Alert} from "@mui/joy";

export function ErrorBar({message}: {message: string | null}) {
  return (
    <>
      {message ? (
        <Alert color="danger" size="md" variant="soft">
          {message}
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
}
