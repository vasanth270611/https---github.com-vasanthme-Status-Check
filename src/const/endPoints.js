const devHost1 = "http://localhost1";
const devHost2 = "http://localhost2";
const devHost3 = "http://localhost";
const qaHost = "http://localhost";
const sitHost = "http://localhost";
const prodHost = "http://localhost";

export const envEnum = {
  dev: "dev",
  sit: "sit",
  qa: "qa",
  prod: "prod",
};

export const apiEndPoints = {
  [envEnum.dev]: {
    healthstatus: [
      `${devHost1}:8090/${envEnum.dev}/healthstatus`,
      `${devHost2}:8090/${envEnum.dev}/healthstatus`,
      `${devHost3}:8090/${envEnum.dev}/healthstatus`,
    ],
    getdetails: [
      `${devHost1}:8098/${envEnum.dev}/getdetails`,
      `${devHost2}:8098/${envEnum.dev}/getdetails`,
      `${devHost3}:8098/${envEnum.dev}/getdetails`,
    ],
    adddetails: [
      `${devHost1}:8056/${envEnum.dev}/adddetails`,
      `${devHost2}:8056/${envEnum.dev}/adddetails`,
      `${devHost3}:8056/${envEnum.dev}/adddetails`,
    ],
    updatedetails: [
      `${devHost1}:8060/${envEnum.dev}/updatedetails`,
      `${devHost2}:8060/${envEnum.dev}/updatedetails`,
      `${devHost3}:8060/${envEnum.dev}/updatedetails`,
    ],
    deletedetails: [
      `${devHost1}:8058/${envEnum.dev}/deletedetails`,
      `${devHost2}:8058/${envEnum.dev}/deletedetails`,
      `${devHost3}:8058/${envEnum.dev}/deletedetails`,
    ],
    getAvailabilityPercent: [
      `${devHost1}:8500/${envEnum.dev}/availabilitypercent`,
      `${devHost2}:8500/${envEnum.dev}/availabilitypercent`,
      `${devHost3}:8500/${envEnum.dev}/availabilitypercent`,
    ],
  },
  [envEnum.sit]: {
    healthstatus: `${sitHost}:8090/${envEnum.sit}/healthstatus`,
    getdetails: `${sitHost}:8098/${envEnum.sit}/getdetails`,
    adddetails: `${sitHost}:8056/${envEnum.sit}/adddetails`,
    updatedetails: `${sitHost}:8060/${envEnum.sit}/updatedetails`,
    deletedetails: `${sitHost}:8058/${envEnum.sit}/deletedetails`,
    getAvailabilityPercent: `${sitHost}:9500/${envEnum.sit}/availabilitypercent`,
  },
  [envEnum.qa]: {
    healthstatus: `${qaHost}:8090/${envEnum.qa}/healthstatus`,
    getdetails: `${qaHost}:8098/${envEnum.qa}/getdetails`,
    adddetails: `${qaHost}:8056/${envEnum.qa}/adddetails`,
    updatedetails: `${qaHost}:8060/${envEnum.qa}/updatedetails`,
    deletedetails: `${qaHost}:8058/${envEnum.qa}/deletedetails`,
  },
  [envEnum.prod]: {
    healthstatus: `${prodHost}:8090/${envEnum.prod}/healthstatus`,
    getdetails: `${prodHost}:8098/${envEnum.prod}/getdetails`,
    adddetails: `${prodHost}:8056/${envEnum.prod}/adddetails`,
    updatedetails: `${prodHost}:8060/${envEnum.prod}/updatedetails`,
    deletedetails: `${prodHost}:8058/${envEnum.prod}/deletedetails`,
  },
};
