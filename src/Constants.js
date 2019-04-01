let executionMode = "development";
global.API_ENDPOINT = executionMode === "development" ? "http://localhost:4000/api/v1" : null;