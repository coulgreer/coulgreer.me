import { rest } from "msw";
import helloData from "./hello.json";

export const handlers = [
  rest.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/hello",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(helloData));
    }
  ),
];
