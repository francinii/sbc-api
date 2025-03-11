import { appSettings } from "../settings/app-settings";

const BASE_URL = `${appSettings.apiURL}Product`;

async function fetchExample(item: string, item2: string) {
  const response = await fetch(`${BASE_URL}/get-model/${item}/${item2}`);
  if (!response.ok) {
    const errorMsg = "Failed to fetch product"
    handleError(errorMsg);
  }
  return await response.json();;
}

async function handleError(errorMsg: string) {
  throw new Error(errorMsg);
}

export const ExampleServices = {
  fetchExample
}
