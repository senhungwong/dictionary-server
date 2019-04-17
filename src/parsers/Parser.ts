import { ZhiHuZhuanLanParser } from "./ZhihuZhuanlan";
import { parse } from "url";
import * as puppeteer from "puppeteer";
import { DefaultParser } from "./Default";

export interface Parser {
  name: string;
  parse: (
    page: puppeteer.Page
  ) => Promise<{ name: string; description: string | undefined }>;
}

export class Parser {
  private static parsers: { [hostname: string]: Parser } = {
    "zhuanlan.zhihu.com": ZhiHuZhuanLanParser,
    default: DefaultParser
  };

  static async parse(page: puppeteer.Page) {
    const hostname = this.parseHostName(page.url());

    const parser = this.getParser(hostname);

    return parser(page);
  }

  private static parseHostName(url: string) {
    return parse(url).hostname;
  }

  private static getParser(hostname: string | undefined) {
    if (!hostname || !(hostname in this.parsers)) {
      return this.parsers.default.parse;
    }

    return this.parsers[hostname].parse;
  }
}