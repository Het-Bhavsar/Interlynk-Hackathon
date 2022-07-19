interface JWTTokenData {
  iat: number; // issued at
  aud: string; // audience (dapp client_id)
  iss: string; // issuer of the token (in this case Web3Auth)
  email?: string; // email address of the user (optional)
  name?: string; // name of the user (optional)
  profileImage?: string; // profile image of the user (optional)
  verifier: string; // web3auth's verifier used while user login
  verifierId: string; // unique user id given by oauth login provider
  aggregateVerifier: string; // name of the verifier if you are using a single id verifier (aggregateVerifier) (optional)
  exp: number; // expiration time
  wallets: Wallet[]; // list of wallets for which this token is issued
}

interface Wallet {
  public_key: string;
  type: 'web3auth_key';
  curve: 'secp256k1' | 'ed25519';
}

export default JWTTokenData;
