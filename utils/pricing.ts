// utils/pricing.ts
export interface PricingInfo {
  avistaPrice: number
  parceladoPrice: number
  discount: number
  discountPercentage: number
  installmentValue: number
  maxInstallments: number
}

export const calculatePricing = (product: any): PricingInfo => {
  // Cenário 1: Ambos preços específicos estão definidos
  if (product.avista_price && product.parcelado_price) {
    const discount = product.parcelado_price - product.avista_price
    const discountPercentage = (discount / product.parcelado_price) * 100
    
    return {
      avistaPrice: product.avista_price,
      parceladoPrice: product.parcelado_price,
      discount,
      discountPercentage,
      installmentValue: product.parcelado_price / 12,
      maxInstallments: 12
    }
  }
  
  // Cenário 2: Apenas preço parcelado definido - usa preço base como à vista
  if (!product.avista_price && product.parcelado_price) {
    const basePrice = product.sale_price || product.price
    const avistaPrice = basePrice
    const parceladoPrice = product.parcelado_price
    const discount = parceladoPrice - avistaPrice
    const discountPercentage = discount > 0 ? (discount / parceladoPrice) * 100 : 0
    
    return {
      avistaPrice,
      parceladoPrice,
      discount,
      discountPercentage,
      installmentValue: parceladoPrice / 12,
      maxInstallments: 12
    }
  }
  
  // Cenário 3: Apenas preço à vista definido - calcula parcelado baseado nele
  if (product.avista_price && !product.parcelado_price) {
    const avistaPrice = product.avista_price
    const parceladoPrice = avistaPrice / 0.95 // Inverte o desconto de 5%
    const discount = parceladoPrice - avistaPrice
    const discountPercentage = (discount / parceladoPrice) * 100
    
    return {
      avistaPrice,
      parceladoPrice,
      discount,
      discountPercentage,
      installmentValue: parceladoPrice / 12,
      maxInstallments: 12
    }
  }
  
  // Cenário 4: Nenhum preço específico - usa o preço base com lógica padrão
  const basePrice = product.sale_price || product.price
  const avistaPrice = basePrice * 0.95 // 5% de desconto à vista
  const parceladoPrice = basePrice
  const discount = parceladoPrice - avistaPrice
  const discountPercentage = (discount / parceladoPrice) * 100
  
  return {
    avistaPrice,
    parceladoPrice,
    discount,
    discountPercentage,
    installmentValue: parceladoPrice / 12,
    maxInstallments: 12
  }
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const formatDiscount = (percentage: number): string => {
  return `${percentage.toFixed(0)}% OFF`
}

export const formatInstallment = (value: number, installments: number): string => {
  return `${installments}x de ${formatCurrency(value)} sem juros`
}