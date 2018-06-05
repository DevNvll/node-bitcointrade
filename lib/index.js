const fetch = require('node-fetch')

const API_URL = 'https://api.bitcointrade.com.br/v1/'

class BTCTrade {
  constructor(token) {
    if (!token) {
      console.error('No token found! ' + 'Supply it as argument.')
    }
    this.token = token
    this.request = (endpoint, options) =>
      fetch(API_URL + endpoint, {
        method: (options && options.method) || 'GET',
        body: options && JSON.stringify(options.body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'ApiToken ' + this.token
        }
      }).then(res => res.json())
  }

  //PUBLIC
  async getTicker() {
    const { data, message } = await this.request('public/BTC/ticker')
    if (message !== null) throw new Error(message)
    return data
  }

  async getOrders() {
    const { data, message } = await this.request('public/BTC/orders')
    if (message !== null) throw new Error(message)
    return data
  }

  async getTrades(start_time, end_time, page_size, current_page) {
    const { data, message } = await this.request(
      `public/BTC/trades?start_time=${start_time}&end_time=${end_time}&page_size=${page_size}&current_page=${current_page}`
    )
    if (message !== null) throw new Error(message)
    return data
  }

  // BITCOIN
  async getWithdrawFee() {
    const { data, message } = await this.request('bitcoin/withdraw/fee')
    if (message !== null) throw new Error(message)
    return data
  }

  async getWithdrawList(status, start_time, end_time, page_size, current_page) {
    const { data, message } = await this.request(
      `bitcoin/withdraw?status=${status}&start_time=${start_time}&end_time=${end_time}&page_size=${page_size}&current_page=${current_page}`
    )
    if (message !== null) throw new Error(message)
    return data
  }

  async createWithdraw(destination, fee, fee_type, amount) {
    const { data, message } = await this.request(`bitcoin/withdraw`, {
      method: 'POST',
      body: {
        destination,
        fee,
        fee_type,
        amount
      }
    })
    if (message !== null) throw new Error(message)
    return data
  }

  async getDepositList(status, start_time, end_time, page_size, current_page) {
    const { data, message } = await this.request(
      `bitcoin/deposits?status=${status}&start_time=${start_time}&end_time=${end_time}&page_size=${page_size}&current_page=${current_page}`
    )
    if (message !== null) throw new Error(message)
    return data
  }

  //MARKET
  async getBookOrders(currency) {
    const { data, message } = await this.request(`market?currency=${currency}`)
    if (message !== null) throw new Error(message)
    return data
  }

  async getSummary(currency) {
    const { data, message } = await this.request(`market?currency=${currency}`)
    if (message !== null) throw new Error(message)
    return data
  }

  async createOrder(currency, type, subtype, amount, unity_price) {
    const { data, message } = await this.request(`market/create_order`, {
      method: 'POST',
      body: {
        currency,
        type,
        subtype,
        unity_price
      }
    })
    if (message !== null) throw new Error(message)
    return data
  }

  async getUserOrders(
    status,
    currency,
    type,
    start_time,
    end_time,
    page_size,
    current_page
  ) {
    const { data, message } = await this.request(
      `market/user_orders/list?status=${status}&currency=${currency}&type=${type}&start_time=${start_time}&end_time=${end_time}&page_size=${page_size}&current_page=${current_page}`
    )
    if (message !== null) throw new Error(message)
    return data
  }

  async cancelOrder(id) {
    const { data, message } = await this.request(`market/user_orders`, {
      method: 'DELETE',
      body: {
        id
      }
    })
    if (message !== null) throw new Error(message)
    return data
  }

  async getEstimatedPrice(amount, currency, type) {
    const { data, message } = await this.request(
      `market/estimated_price?currency=${currency}&amount=${amount}&type=${type}`
    )
    if (message !== null) throw new Error(message)
    return data
  }

  //WALLET
  async getBalance() {
    const { data, message } = await this.request('wallets/balance')
    if (message !== null) throw new Error(message)
    return data
  }
}

module.exports = BTCTrade
