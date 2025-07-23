// composables/useShipping.ts

export interface ShippingCalculation {
  method: string
  name: string
  price: number
  deliveryTime: string
  available: boolean
}

export interface StoreInfo {
  name: string
  address: string
  zipCode: string
  city: string
  state: string
  country: string
}

export interface CepInfo {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export const useShipping = () => {
  // Informações da loja Atapera
  const storeInfo: StoreInfo = {
    name: 'Atapera',
    address: 'Av. Epaminondas Jácome Centro, 2199 - Cadeia Velha',
    zipCode: '69905-074',
    city: 'Rio Branco',
    state: 'AC',
    country: 'BR'
  }

  // Mapeamento completo CEP -> Estado (primeiros 2 dígitos)
  const cepToStateMapping: Record<string, string> = {
    // Região Norte
    '68': 'AC', // Acre
    '69': 'AC', // Acre
    '69': 'RO', // Rondônia (69000-69399)
    '76': 'AM', // Amazonas
    '77': 'RR', // Roraima
    '68': 'AP', // Amapá (68900-68999)
    '77': 'TO', // Tocantins (77000-77999)
    '66': 'PA', // Pará
    '68': 'PA', // Pará (68000-68899)
    
    // Região Nordeste
    '65': 'MA', // Maranhão
    '64': 'PI', // Piauí
    '60': 'CE', // Ceará
    '61': 'CE',
    '62': 'CE',
    '63': 'CE',
    '59': 'RN', // Rio Grande do Norte
    '58': 'PB', // Paraíba
    '56': 'PE', // Pernambuco
    '55': 'PE',
    '54': 'PE',
    '53': 'PE',
    '52': 'PE',
    '51': 'PE',
    '50': 'PE',
    '57': 'AL', // Alagoas
    '49': 'SE', // Sergipe
    '48': 'BA', // Bahia
    '47': 'BA',
    '46': 'BA',
    '45': 'BA',
    '44': 'BA',
    '43': 'BA',
    '42': 'BA',
    '41': 'BA',
    '40': 'BA',
    
    // Região Sudeste
    '01': 'SP', // São Paulo
    '02': 'SP',
    '03': 'SP',
    '04': 'SP',
    '05': 'SP',
    '06': 'SP',
    '07': 'SP',
    '08': 'SP',
    '09': 'SP',
    '10': 'SP',
    '11': 'SP',
    '12': 'SP',
    '13': 'SP',
    '14': 'SP',
    '15': 'SP',
    '16': 'SP',
    '17': 'SP',
    '18': 'SP',
    '19': 'SP',
    '20': 'RJ', // Rio de Janeiro
    '21': 'RJ',
    '22': 'RJ',
    '23': 'RJ',
    '24': 'RJ',
    '25': 'RJ',
    '26': 'RJ',
    '27': 'RJ',
    '28': 'RJ',
    '29': 'ES', // Espírito Santo
    '30': 'MG', // Minas Gerais
    '31': 'MG',
    '32': 'MG',
    '33': 'MG',
    '34': 'MG',
    '35': 'MG',
    '36': 'MG',
    '37': 'MG',
    '38': 'MG',
    '39': 'MG',
    
    // Região Sul
    '80': 'PR', // Paraná
    '81': 'PR',
    '82': 'PR',
    '83': 'PR',
    '84': 'PR',
    '85': 'PR',
    '86': 'PR',
    '87': 'PR',
    '88': 'SC', // Santa Catarina
    '89': 'SC',
    '90': 'RS', // Rio Grande do Sul
    '91': 'RS',
    '92': 'RS',
    '93': 'RS',
    '94': 'RS',
    '95': 'RS',
    '96': 'RS',
    '97': 'RS',
    '98': 'RS',
    '99': 'RS',
    
    // Região Centro-Oeste
    '70': 'DF', // Distrito Federal
    '71': 'DF',
    '72': 'GO', // Goiás
    '73': 'GO',
    '74': 'GO',
    '75': 'GO',
    '76': 'GO',
    '78': 'MT', // Mato Grosso
    '79': 'MS', // Mato Grosso do Sul
  }

  // Buscar informações do CEP via API
  const fetchCepInfo = async (cep: string): Promise<CepInfo | null> => {
    try {
      const cleanCep = cep.replace(/\D/g, '')
      if (cleanCep.length !== 8) return null

      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data = await response.json()
      
      if (data.erro) return null
      
      return data as CepInfo
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
      return null
    }
  }

  // Calcular frete com base no CEP
  const calculateShipping = async (
    destinationZipCode: string,
    weight: number = 1,
    hasFirearms: boolean = false
  ): Promise<ShippingCalculation[]> => {

    // Se tem armas de fogo, só permite retirada na loja
    if (hasFirearms) {
      return [
        {
          method: 'pickup',
          name: 'Retirada na Loja (Obrigatório)',
          price: 0,
          deliveryTime: 'Retire em nossa loja',
          available: true
        }
      ]
    }

    // Buscar informações do CEP
    const cepInfo = await fetchCepInfo(destinationZipCode)
    if (!cepInfo) {
      return []
    }

    const destinationState = cepInfo.uf
    const destinationCity = cepInfo.localidade
    
    let shippingOptions: ShippingCalculation[] = []

    // Dentro do Acre (mesmo estado da loja)
    if (destinationState === 'AC') {
      // Entrega gratuita em Rio Branco
      if (destinationCity.toLowerCase().includes('rio branco')) {
        shippingOptions = [
          {
            method: 'local_delivery',
            name: 'Entrega Gratuita',
            price: 0,
            deliveryTime: '1 a 2 dias úteis',
            available: true
          },
          {
            method: 'pickup',
            name: 'Retirada na Loja',
            price: 0,
            deliveryTime: 'Retire em nossa loja',
            available: true
          }
        ]
      } else {
        // Outras cidades do Acre - frete barato
        shippingOptions = [
          {
            method: 'local_delivery',
            name: 'Entrega no Interior do AC',
            price: 15,
            deliveryTime: '2 a 4 dias úteis',
            available: true
          },
          {
            method: 'pickup',
            name: 'Retirada na Loja',
            price: 0,
            deliveryTime: 'Retire em nossa loja',
            available: true
          }
        ]
      }
    } else {
      // Outras regiões do Brasil
      const regionPricing = calculateRegionalPricing(destinationState, weight)
      
      shippingOptions = [
        {
          method: 'pac',
          name: 'PAC - Correios',
          price: regionPricing.pac,
          deliveryTime: '8 a 12 dias úteis',
          available: true
        },
        {
          method: 'sedex',
          name: 'SEDEX - Correios',
          price: regionPricing.sedex,
          deliveryTime: '3 a 6 dias úteis',
          available: true
        },
        {
          method: 'pickup',
          name: 'Retirada na Loja',
          price: 0,
          deliveryTime: 'Retire em nossa loja',
          available: true
        }
      ]
    }

    return shippingOptions
  }

  // Calcular preços regionais por estado
  const calculateRegionalPricing = (state: string, weight: number) => {
    const basePrice = 20 // Preço base
    const weightFactor = Math.max(1, weight * 1.5) // Fator peso
    
    // Fatores por estado (baseado na distância e logística do Acre)
    const stateFactors: Record<string, number> = {
      // Região Norte (mais próximo)
      'AC': 0.5,  // Acre (mesmo estado)
      'RO': 0.8,  // Rondônia
      'AM': 1.0,  // Amazonas
      'RR': 1.2,  // Roraima
      'AP': 1.3,  // Amapá
      'PA': 1.1,  // Pará
      'TO': 1.4,  // Tocantins
      
      // Região Centro-Oeste
      'MT': 1.3,  // Mato Grosso
      'MS': 1.6,  // Mato Grosso do Sul
      'GO': 1.8,  // Goiás
      'DF': 1.7,  // Distrito Federal
      
      // Região Nordeste
      'MA': 1.5,  // Maranhão
      'PI': 1.6,  // Piauí
      'CE': 1.8,  // Ceará
      'RN': 1.9,  // Rio Grande do Norte
      'PB': 1.9,  // Paraíba
      'PE': 2.0,  // Pernambuco
      'AL': 2.1,  // Alagoas
      'SE': 2.1,  // Sergipe
      'BA': 2.0,  // Bahia
      
      // Região Sudeste (mais distante, mas boa logística)
      'SP': 2.2,  // São Paulo
      'RJ': 2.3,  // Rio de Janeiro
      'MG': 2.1,  // Minas Gerais
      'ES': 2.2,  // Espírito Santo
      
      // Região Sul (mais distante)
      'PR': 2.4,  // Paraná
      'SC': 2.5,  // Santa Catarina
      'RS': 2.6,  // Rio Grande do Sul
    }

    const factor = stateFactors[state] || 2.0
    
    return {
      pac: Math.round(basePrice * factor * weightFactor),
      sedex: Math.round(basePrice * factor * weightFactor * 1.6)
    }
  }

  // Validar CEP brasileiro
  const validateZipCode = (zipCode: string): boolean => {
    const cleanZip = zipCode.replace(/\D/g, '')
    return cleanZip.length === 8 && /^\d{8}$/.test(cleanZip)
  }

  // Formatar CEP
  const formatZipCode = (zipCode: string): string => {
    const clean = zipCode.replace(/\D/g, '')
    if (clean.length === 8) {
      return `${clean.substring(0, 5)}-${clean.substring(5)}`
    }
    return zipCode
  }

  return {
    storeInfo,
    calculateShipping,
    validateZipCode,
    formatZipCode,
    fetchCepInfo
  }
}