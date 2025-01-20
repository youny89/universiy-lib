import { useToast } from "@/hooks/use-toast";
import { config } from "@/lib/config";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
  onFileChange: (filePath: string) => void;
}

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticateor = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error("authentication reqeust failed: ", error?.message);
  }
};

const ImageUpload: React.FC<Props> = ({ onFileChange }) => {
  const ikUploadRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const { toast } = useToast();
  const onError = (error: any) => {
    console.log(error);
    toast({
      title: "Image upload failed",
      description: `Your image could not be uploaded. please try again`,
      variant: "destructive",
    });
  };
  const onSuccess = (response: any) => {
    setFile(response);
    onFileChange(response.filePath);
    toast({
      title: "Image uploaded successfully",
      description: `${response.filePath} uploaded successfully`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticateor}
    >
      <IKUpload
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
        className="hidden"
        ref={ikUploadRef}
      />

      <button
        type="button"
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef?.current) {
            ikUploadRef?.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
        />
        <p className="text-base text-light-100">Upload a file</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
