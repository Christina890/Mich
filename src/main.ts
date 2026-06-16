import './style.css'

/* ---- Types ---- */
interface DonationConfig {
  selectedAmount: string
}

type PaymentMethod = 'M-Pesa' | 'PayPal' | 'Bank Transfer'

/* ---- State ---- */
const state: DonationConfig = {
  selectedAmount: 'KES 1,000',
}

/* ---- DOM refs ---- */
const amounts = document.querySelectorAll<HTMLButtonElement>('#amounts button')
const openBtn = document.getElementById('openDonateModal') as HTMLButtonElement | null
const closeBtn = document.getElementById('closeDonateModal') as HTMLButtonElement | null
const modal = document.getElementById('donateModal') as HTMLDivElement | null
const payMpesa = document.getElementById('payMpesa') as HTMLAnchorElement | null
const payPaypal = document.getElementById('payPaypal') as HTMLAnchorElement | null
const payBank = document.getElementById('payBank') as HTMLAnchorElement | null

/* ---- Amount selection ---- */
amounts.forEach((btn) => {
  btn.addEventListener('click', () => {
    amounts.forEach((b) => b.classList.remove('active'))
    btn.classList.add('active')
    state.selectedAmount = btn.dataset.amount ?? 'KES 1,000'
  })
})

/* ---- Modal ---- */
function openModal(): void {
  if (modal) modal.classList.add('open')
}

function closeModal(): void {
  if (modal) modal.classList.remove('open')
}

openBtn?.addEventListener('click', openModal)
closeBtn?.addEventListener('click', closeModal)

modal?.addEventListener('click', (e: MouseEvent) => {
  if (e.target === modal) closeModal()
})

/* ---- Payment ---- */
function handlePayment(method: PaymentMethod): void {
  const { selectedAmount } = state

  const messages: Record<PaymentMethod, string> = {
    'M-Pesa': `Thank you for choosing to donate ${selectedAmount} via M-Pesa.\n\nPaybill: 247247\nAccount: MICH-${Date.now()}`,
    PayPal: `Thank you for choosing to donate ${selectedAmount} via PayPal.\n\nYou will be redirected to our secure PayPal checkout.`,
    'Bank Transfer': `Thank you for choosing to donate ${selectedAmount} via Bank Transfer.\n\nEquity Bank\nAccount: 1234567890\nBranch: Nairobi`,
  }

  alert(messages[method])
}

payMpesa?.addEventListener('click', (e: MouseEvent) => {
  e.preventDefault()
  handlePayment('M-Pesa')
})

payPaypal?.addEventListener('click', (e: MouseEvent) => {
  e.preventDefault()
  handlePayment('PayPal')
})

payBank?.addEventListener('click', (e: MouseEvent) => {
  e.preventDefault()
  handlePayment('Bank Transfer')
})
