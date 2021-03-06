import { IParser, Parser } from "../services/Parser";

export const ZhiHuParser: IParser = {
  name: "知乎",
  parse: async page => {
    const { name, description } = await Parser.defaultNameDescriptionParsing(
      page
    );

    return { name: name.replace(" - 知乎", ""), description };
  }
};
