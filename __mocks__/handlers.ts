import { rest } from "msw";
import data from "./hello.json";
import headwords from "./headwords.json";

export const handlers = [
  rest.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${headwords["202_RESPONSE"]}`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(data));
    }
  ),
  rest.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${headwords["404_RESPONSE"]}`,
    (req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json({
          title: "No Definitions Found",
          message:
            "Sorry pal, we couldn't find definitions for the word you were looking for.",
          resolution:
            "You can try the search again at later time or head to the web instead.",
        })
      );
    }
  ),
  rest.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/",
    (req, res, ctx) => {
      return res(ctx.status(404));
    }
  ),
  rest.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${headwords["500_RESPONSE"]}`,
    (req, res, ctx) => {
      return res(ctx.status(500));
    }
  ),
];
