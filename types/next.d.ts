/* to do */
export declare global {
  namespace nextConnect {
    interface NextApiRequest {
      session: any;
    }
    interface NextApiResponse {
      cookieEnd: () => void;
    }
  }
}
