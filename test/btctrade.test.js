const BTCTrade = require('../lib')

const TOKEN = process.env.BTCTRADE_TOKEN

if (!TOKEN) {
  throw new Error('now token not provided')
}

const btc = new BTCTrade(TOKEN)

jest.setTimeout(10000)

describe('Public', () => {
  test('getTicker()', async () => {
    const data = await btc.getTicker()
    expect(data).toBeDefined()
  })
  test('getOrders()', async () => {
    const data = await btc.getOrders()
    expect(data).toBeDefined()
  })
  test('getTrades()', async () => {
    const data = await btc.getTrades()
    expect(data).toBeDefined()
  })
})

describe('Bitcoin', () => {
  test('getWithdrawFee()', async () => {
    const data = await btc.getWithdrawFee()
    expect(data).toBeDefined()
  })
  test('getWithdrawList("confirmed")', async () => {
    const data = await btc.getWithdrawList('confirmed')
    expect(data).toBeDefined()
  })
  test('getDepositList("confirmed")', async () => {
    const data = await btc.getTrades('confirmed')
    expect(data).toBeDefined()
  })
})

describe('Market', () => {
  test('getBookOrders("btc")', async () => {
    const data = await btc.getBookOrders('BTC')
    expect(data).toBeDefined()
  })
  test('getSummary("btc")', async () => {
    const data = await btc.getSummary('BTC')
    expect(data).toBeDefined()
  })
  test('getUserOrders("executed_completely", "btc", "buy")', async () => {
    const data = await btc.getUserOrders('executed_completely', 'BTC', 'buy')
    expect(data).toBeDefined()
  })
  test('getEstimatedPrice(1, "btc", "buy")', async () => {
    const data = await btc.getEstimatedPrice(1, 'BTC', 'buy')
    expect(data).toBeDefined()
  })
})

describe('Wallets', () => {
  test('getBalance()', async () => {
    const data = await btc.getBalance('btc')
    expect(data).toBeDefined()
  })
})
