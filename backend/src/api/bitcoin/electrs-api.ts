import config from '../../config';
import { AbstractBitcoinApi } from './bitcoin-api-abstract-factory';
import { Transaction, Block, MempoolInfo, MempoolEntry, MempoolEntries, Address } from '../../interfaces';
import axios from 'axios';

class ElectrsApi implements AbstractBitcoinApi {

  constructor() {
  }

  $getMempoolInfo(): Promise<MempoolInfo> {
    return axios.get<any>(config.ELECTRS.REST_API_URL + '/mempool', { timeout: 10000 })
      .then((response) => {
        return {
          size: response.data.count,
          bytes: response.data.vsize,
        };
      });
  }

  $getRawMempool(): Promise<Transaction['txid'][]> {
    return axios.get<Transaction['txid'][]>(config.ELECTRS.REST_API_URL + '/mempool/txids')
      .then((response) => response.data);
  }

  $getRawTransaction(txId: string): Promise<Transaction> {
    return axios.get<Transaction>(config.ELECTRS.REST_API_URL + '/tx/' + txId)
      .then((response) => response.data);
  }

  $getBlockHeightTip(): Promise<number> {
    return axios.get<number>(config.ELECTRS.REST_API_URL + '/blocks/tip/height')
      .then((response) => response.data);
  }

  $getTxIdsForBlock(hash: string): Promise<string[]> {
    return axios.get<string[]>(config.ELECTRS.REST_API_URL + '/block/' + hash + '/txids')
      .then((response) => response.data);
  }

  $getBlockHash(height: number): Promise<string> {
    return axios.get<string>(config.ELECTRS.REST_API_URL + '/block-height/' + height)
      .then((response) => response.data);
  }

  $getBlock(hash: string): Promise<Block> {
    return axios.get<Block>(config.ELECTRS.REST_API_URL + '/block/' + hash)
      .then((response) => response.data);
  }

  $getRawMempoolVerbose(): Promise<MempoolEntries> {
    throw new Error('Method not implemented.');
  }

  $getMempoolEntry(): Promise<MempoolEntry> {
    throw new Error('Method not implemented.');
  }

  $getRawTransactionBitcond(txId: string): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }

  $getAddress(address: string): Promise<Address> {
    throw new Error('Method not implemented.');
  }
}

export default ElectrsApi;
