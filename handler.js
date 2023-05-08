import { genCombine } from "@proxtx/combine-rest/request.js";
import { genModule } from "@proxtx/combine/combine.js";
import config from "@proxtx/config";

export const evaluate = async (value) => {
  let triggers = await genCombine(value.api, "public/triggers.js", genModule);
  return await triggers.checkTrigger(config.pwd, value.config);
};
