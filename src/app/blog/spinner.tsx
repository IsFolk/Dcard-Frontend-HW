import React from "react";
import {NextUIProvider, Spinner} from "@nextui-org/react";

export function CustomSpinner() {
  return (
    <div>
        <div className="flex gap-4 justify-center items-center">
            <Spinner color="primary"/>
        </div>
    </div>
  );
}

export default CustomSpinner;