import task from './poem';

test('can encrypt', () => {
  expect(
    task.encrypt('THEOPERATIONTODEMOLISHTHEBUNKERISTOMORROWATELEVENRENDEZVOUSATSIXATFARMERJACQUES')
  ).toBe(
    'LTWSG REXSU XBIXM EXTRX ESXTE XHTXN AXRAX TRCOZ XALXE FXHRQ EOUOE XNNXH SXOWE IRXPA SDNXU XXSMX TEXLV XORXO AXETX OEXIO XTAXM JXKTX IVXED X'
  );
});

test('can decrypt', () => {
  expect(
    task.decrypt(
      'LTWSG REXSU XBIXM EXTRX ESXTE XHTXN AXRAX TRCOZ XALXE FXHRQ EOUOE XNNXH SXOWE IRXPA SDNXU XXSMX TEXLV XORXO AXETX OEXIO XTAXM JXKTX IVXED X'
    )
  ).toBe('THEOPERATIONTODEMOLISHTHEBUNKERISTOMORROWATELEVENRENDEZVOUSATSIXATFARMERJACQUES');
});

test('can reverse', () => {
  const encrypted = task.indata.map(task.encrypt);
  const decrypted = encrypted.map(task.decrypt);
  decrypted.forEach((input) => expect(task.indata).toContain(input));
});
