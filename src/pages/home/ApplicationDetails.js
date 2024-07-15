import * as React from "react";
import { useLocation } from "react-router-dom";
import AvailibilityDetail from "./AvailibilityDetail";

export default function ApplicationDetails() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let app_id = params.get("app_id");
  return (
    <div>
      {app_id && <AvailibilityDetail app_id={app_id} />}
      {!app_id && <div>Please specify the app</div>}
    </div>
  );
}
