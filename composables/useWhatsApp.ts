// composables/useWhatsApp.ts
export const useWhatsApp = () => {
  const WHATSAPP_NUMBER = "556892827730"; // +55 68 9282-7730

  const formatOrderMessage = (orderData: {
    customer: {
      name: string;
      email: string;
      phone: string;
      document: string;
    };
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    total: number;
    hasFirearms?: boolean; // Nova propriedade para identificar se há armas
    deliveryMethod?: string; // 'delivery' ou 'pickup'
    shippingAddress?: {
      street: string;
      number: string;
      complement?: string;
      neighborhood: string;
      city: string;
      state: string;
      postalCode: string;
    };
    firearmDocuments?:
      | {
          crNumber: string;
          expiryDate: string;
        }
      | undefined;
    paymentMethod: string;
    installments?: number;
  }) => {
    const formatPrice = (value: number) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);

    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString("pt-BR");
    };

    // Verificar se há armas de fogo para personalizar a mensagem
    const hasFirearms = orderData.hasFirearms || false;

    let message = hasFirearms
      ? `🔫 *PEDIDO - ARMAS DE FOGO*\n\n`
      : `🛒 *PEDIDO*\n\n`;

    message += `*DADOS DO CLIENTE:*\n`;
    message += `Nome: ${orderData.customer.name}\n`;
    message += `Email: ${orderData.customer.email}\n`;
    message += `Telefone: ${orderData.customer.phone}\n`;
    message += `CPF: ${orderData.customer.document}\n\n`;

    // Seção de documentação apenas para armas de fogo
    if (hasFirearms) {
      message += `*DOCUMENTACAO:*\n`;
      message += `- Documentos serao validados pela atendente\n`;
      message += `- Cliente deve apresentar CR/CRAF valido na retirada\n\n`;
    }

    message += `*PRODUTOS:*\n`;
    orderData.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `Qtd: ${item.quantity}x - ${formatPrice(item.price)}\n`;
      message += `Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`;
    });

    message += `*PAGAMENTO:*\n`;
    message += `Metodo: ${getPaymentMethodLabel(orderData.paymentMethod)}\n`;
    if (orderData.installments && orderData.installments > 1) {
      message += `Parcelas: ${orderData.installments}x\n`;
    }
    message += `*Total: ${formatPrice(orderData.total)}*\n\n`;

    // Informações de entrega/retirada
    message += `*ENTREGA:*\n`;
    if (hasFirearms || orderData.deliveryMethod === "pickup") {
      message += `Modalidade: Retirada na loja\n`;
      if (hasFirearms) {
        message += `- Retirada obrigatoria para armas de fogo\n`;
        message += `- Apresentar documentos originais\n`;
        message += `- Verificacao de documentacao necessaria\n`;
      }
    } else {
      message += `Modalidade: ${
        orderData.deliveryMethod === "delivery" ? "Entrega" : "Retirada na loja"
      }\n`;

      if (
        orderData.deliveryMethod === "delivery" &&
        orderData.shippingAddress
      ) {
        message += `*Endereco de entrega:*\n`;
        message += `${orderData.shippingAddress.street}, ${orderData.shippingAddress.number}\n`;
        if (orderData.shippingAddress.complement) {
          message += `${orderData.shippingAddress.complement}\n`;
        }
        message += `${orderData.shippingAddress.neighborhood}, ${orderData.shippingAddress.city} - ${orderData.shippingAddress.state}\n`;
        message += `CEP: ${orderData.shippingAddress.postalCode}\n`;
      }
    }
    message += `\n`;

    message += `*Local da loja:*\n`;
    message += `Av. Epaminondas Jacome Centro, 2199\n`;
    message += `Cadeia Velha, Rio Branco - AC\n`;
    message += `CEP: 69905-074\n\n`;

    message += `*IMPORTANTE:*\n`;
    if (hasFirearms) {
      message += `Por favor, confirme este pedido e informe quando posso retirar o produto.`;
    } else {
      message += `Por favor, confirme este pedido para prosseguirmos com a ${
        orderData.deliveryMethod === "delivery" ? "entrega" : "retirada"
      }.`;
    }

    return message;
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      pix: "PIX",
      debit: "Cartão de Débito",
      credit: "Cartão de Crédito",
    };
    return labels[method] || method;
  };

  const sendToWhatsApp = (message: string) => {
    try {
      // Limitar o tamanho da mensagem para evitar problemas de URL muito longa
      const maxLength = 2000;
      let finalMessage = message;

      if (message.length > maxLength) {
        finalMessage =
          message.substring(0, maxLength) +
          "...\n\nMensagem cortada devido ao tamanho. Detalhes completos serão fornecidos pela atendente.";
      }

      const encodedMessage = encodeURIComponent(finalMessage);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;

      // Tentar abrir em nova aba
      const newWindow = window.open(whatsappUrl, "_blank");

      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed === "undefined"
      ) {
        // Se pop-up foi bloqueado, tentar redirecionar na mesma janela
        console.warn(
          "⚠️ Pop-up bloqueado, tentando redirecionar na mesma janela..."
        );
        window.location.href = whatsappUrl;
      }
    } catch (error) {
      console.error("❌ Erro ao abrir WhatsApp:", error);

      // Fallback: criar URL simples
      const simpleUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
      window.open(simpleUrl, "_blank");
    }
  };

  const createFirearmOrder = (
    customerInfo: {
      name: string;
      email: string;
      phone: string;
      document: string;
    },
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>,
    total: number,
    hasFirearms: boolean, // Novo parâmetro para indicar se há armas
    paymentMethod: string,
    deliveryMethod?: string, // 'delivery' ou 'pickup'
    shippingAddress?: {
      street: string;
      number: string;
      complement?: string;
      neighborhood: string;
      city: string;
      state: string;
      postalCode: string;
    },
    firearmDocuments?:
      | {
          crNumber: string;
          expiryDate: string;
        }
      | undefined,
    installments?: number
  ) => {
    const orderData = {
      customer: customerInfo,
      items,
      total,
      hasFirearms, // Passar a informação se há armas
      deliveryMethod,
      shippingAddress,
      firearmDocuments,
      paymentMethod,
      installments,
    };

    const message = formatOrderMessage(orderData);

    sendToWhatsApp(message);
  };

  return {
    createFirearmOrder,
    sendToWhatsApp,
    formatOrderMessage,
    WHATSAPP_NUMBER,
  };
};
