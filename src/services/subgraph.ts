import { request, gql } from 'graphql-request';

const KOVAN_URL = 'https://api.thegraph.com/subgraphs/name/charged-particles/kovan-universe';

const query = (address: string) => gql`
  {
    universes {
      protonToken {
        tokens(first: 20, where: {owner_in: ["${address}"]}) {
          name
          description
          tokenId
          id
          creator
          owner
          image
          thumbnail
          animation_url
        }
      }
    }
  }
`;

export const getData = async (address: string) => {
  const res = await request(KOVAN_URL, query(address));
  return res?.universes?.[0]?.protonToken?.tokens;
};
