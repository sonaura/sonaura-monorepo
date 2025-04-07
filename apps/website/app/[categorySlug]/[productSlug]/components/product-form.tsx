'use client';

import type { Product } from '@sonaura/database/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@sonaura/ui/components/dialog';
import { PropsWithChildren, useState } from 'react';
import { ContactForm } from '@/components/contact-form';

export interface ProductFormProps {
  product: Product;
  title: string;
}

export const ProductForm = ({
  product,
  title,
  children,
}: PropsWithChildren<ProductFormProps>) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ContactForm
          product={product}
          onSubmitSuccessful={() => setIsDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
