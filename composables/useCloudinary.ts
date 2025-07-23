// composables/useCloudinary.ts

interface CloudinaryTransformations {
  width?: number;
  height?: number;
  quality?: string;
  format?: string;
  crop?: string;
}

type ImageSize = "thumb" | "small" | "medium" | "large";

interface ImageSizeConfig {
  width: number;
  height: number;
}

export const useCloudinary = () => {
  const config = useRuntimeConfig();
  const cloudName = config.public.cloudinaryCloudName;

  const buildImageUrl = (
    publicId: string,
    transformations: CloudinaryTransformations = {}
  ): string => {
    if (!publicId || !cloudName) return "";

    const {
      width = 800,
      height = 800,
      quality = "auto",
      format = "auto",
      crop = "fill",
    } = transformations;

    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
    const transforms = `c_${crop},w_${width},h_${height},q_${quality},f_${format}`;

    return `${baseUrl}/${transforms}/${publicId}`;
  };

  // Tamanhos pré-definidos para produtos
  const getProductImage = (
    publicId: string,
    size: ImageSize = "medium"
  ): string => {
    const sizes: Record<ImageSize, ImageSizeConfig> = {
      thumb: { width: 150, height: 150 },
      small: { width: 400, height: 400 },
      medium: { width: 800, height: 800 },
      large: { width: 1200, height: 1200 },
    };

    return buildImageUrl(publicId, sizes[size]);
  };

  // Upload de imagens para o Cloudinary (versão simplificada)
  const uploadImages = async (
    files: File[],
    productId: string
  ): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();

      // Configurações básicas do upload
      formData.append("file", file);
      formData.append("upload_preset", "ml_default-2"); // Nome correto do seu preset
      formData.append("folder", `products/${productId}`);

      try {

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erro na resposta:", errorData);
          throw new Error(
            `HTTP ${response.status}: ${
              errorData.error?.message || "Erro desconhecido"
            }`
          );
        }

        const result = await response.json();

        if (result.public_id) {
          uploadedUrls.push(result.public_id);
        } else {
          throw new Error("Resposta inválida do Cloudinary");
        }
      } catch (error: any) {
        console.error(`Erro no upload da imagem ${file.name}:`, error);
        throw new Error(`Falha no upload de ${file.name}: ${error.message}`);
      }
    }

    return uploadedUrls;
  };

  // Função alternativa usando o Widget do Cloudinary (mais simples)
  const openUploadWidget = (callback: (urls: string[]) => void) => {
    // @ts-ignore
    if (typeof window !== "undefined" && window.cloudinary) {
      // @ts-ignore
      window.cloudinary.openUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: "ml_default",
          folder: "products",
          multiple: true,
          maxFiles: 10,
          resourceType: "image",
          maxFileSize: 10000000, // 10MB
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
          theme: "minimal",
        },
        (error: any, result: any) => {


          if (result && result.event === "close") {
            // Widget fechado, pegar todas as imagens uploadadas
            const uploadedImages =
              result.info?.files?.map(
                (file: any) => file.uploadInfo.public_id
              ) || [];
            callback(uploadedImages);
          }
        }
      );
    } else {
      console.error("Widget do Cloudinary não carregado");
    }
  };

  return {
    buildImageUrl,
    getProductImage,
    uploadImages,
    openUploadWidget,
  };
};
