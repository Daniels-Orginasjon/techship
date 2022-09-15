import { NextApiRequest } from 'next';

export const webLog = (req: NextApiRequest, ...message: any[]) => {
  console.log(`>> [session] [${req.method}] [${req.url}]`, ...message);
};

export class Logger {
  extend: ({ prefix, path }: { prefix?: string; path?: string }) => Logger;
  webLog: (req: NextApiRequest, ...message: any[]) => void;
  log(...message: any[]) {
    console.log(...message);
  }
  setPreset(preset: string) {
    this.prefix = preset;
  }
  prefix: string;
  path: string;
  constructor(props: { path?: string; prefix?: string }) {
    // strings
    this.prefix = props.prefix || '';
    this.path = props.path || '';
    this.webLog = (req: NextApiRequest, ...message: any[]) => {
      console.log(`>> [${this.path}] [${req.method}] [${req.url}]`, ...message);
    };
    this.log = (...message: any[]) => {
      console.log(`>> ${this.prefix}`, ...message);
    };
    this.extend = ({ prefix, path }: { prefix?: string; path?: string }) => {
      let n = new Logger({});
      if (prefix) {
        n.prefix = `${this.prefix} ${prefix}`;
      }
      if (path) {
        n.path = `${this.path} ${path}`;
      }
      return n;
    };
  }

  static log(...message: any[]) {
    console.log(...message);
  }
}
