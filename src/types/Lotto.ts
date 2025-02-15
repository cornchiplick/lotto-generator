// type
export type LottoNumber = number[];

// interface
export interface LottoResultTable {
  lottoNumbers: LottoNumber[];
  winningNumbers: LottoNumber;
  bonusNumber: number;
}

export interface ResultTable {
  first: number;
  second: number;
  third: number;
  fourth: number;
  fifth: number;
  fail: number;
}

export interface RecordData {
  purchaseAmount: number;
  ticketCount: number;
  winningNumbers: number[];
  bonusNumber: number;
  results: ResultTable;
}

export interface RecordHistory {
  id: number;
  purchaseAmount: number;
  ticketCount: number;
  winningNumbers: number[];
  bonusNumber: number;
  results: ResultTable;
}
