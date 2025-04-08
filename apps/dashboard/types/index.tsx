export type Variant = {
  id: string;
  name: string;
  values: string[];
};

export type Image = {
  bucket: string;
  file: string;
};

export type VariantImage = {
  image: Image;
  variants?: Array<{ name: string; value: string }>;
  price?: string;
};
