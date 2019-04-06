let executionMode = "development";
global.API_ENDPOINT = executionMode === "development" ? "http://192.168.25.8:4000/api/v1" : null;