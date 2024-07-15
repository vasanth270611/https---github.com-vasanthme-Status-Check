import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import HealthStatus from "./components/HealthStatus";
import { apiEndPoints, envEnum } from "../../const";
import { useDispatch, useSelector } from "react-redux";
import { getHealthStatus } from "../../store/action";
import { httpCall } from "../../sevices/http";
import { UPDATE_HEALTH_STATUS } from "../../store/type";

function HealthStatusPage({ pageName }) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [env, setEnv] = useState(null);

  const currentData = useSelector((state) => state.healthStatus.data);

  useEffect(() => {
    let env = null;

    switch (pageName) {
      case "DEV":
        env = envEnum.dev;
        break;
      case "SIT":
        env = envEnum.sit;
        break;
      case "QA":
        env = envEnum.qa;
        break;
      case "PROD":
        env = envEnum.prod;
        break;

      default:
        env = envEnum.dev;
        break;
    }
    if (env) {
      setEnv(env);
    }
  }, [pageName]);

  useEffect(() => {
    if (env) {
      dispatch(getHealthStatus(env));
    }
  }, [env]);

  useEffect(() => {
    if (currentData) {
      setData(currentData);
    }
  }, [currentData]);

  const enableDisable = async (app_name, envName, status) => {
    try {
      const currentEndPoint = apiEndPoints[env].getdetails + "?table=config";
      const tableconfig = await httpCall(currentEndPoint);
      const currentConfig = tableconfig?.find(
        (data) =>
          data.app_name === app_name &&
          data.app_id === app_name + "_" + envName.toUpperCase()
      );

      if (currentConfig) {
        const currentEndPoint =
          apiEndPoints[env].updatedetails + "?table=config";
        const reqBody = {
          appId: currentConfig.app_id,
          appName: currentConfig.app_name,
          appTypeId: currentConfig.app_type_id,
          description: currentConfig.description,
          enableHealthCheck: status,
          envId: currentConfig.env_id,
          healthCheckURL: currentConfig.check_url,
          hostId: currentConfig.host_id,
          httpMethod: currentConfig.http_method,
          recipientList: currentConfig.recipient_list,
          responseBodyBased: currentConfig.response_body_based,
          responseCodeBased: currentConfig.response_code_based,
          schedule: currentConfig.schedule,
        };
        const result = await httpCall(currentEndPoint, "POST", reqBody);
        dispatch({
          type: UPDATE_HEALTH_STATUS,
          payload: {
            app_name,
            envName,
            status,
          },
        });
      }
    } catch (error) {
      console.log("error while updating status", error.message);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h6">{pageName} health status</Typography>
        </Grid>
        <Grid item xs={12}>
          <HealthStatus data={data} enableDisable={enableDisable} />
        </Grid>
      </Grid>
    </>
  );
}

export default HealthStatusPage;
